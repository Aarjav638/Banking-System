import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { encryptAccountNumberDeterministic } from '@/helpers/Account/accountGenerate';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Authorization token missing or malformed' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'sdbafvhBAHJVbzfvjkzdvjkbNsnvN';
  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  const userId = (decodedToken as any)._id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { senderAccountNumber, recipientAccountNumber, amount, mode } = body;

  try {
    if (!senderAccountNumber || !recipientAccountNumber || !amount || !mode) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    if (senderAccountNumber === recipientAccountNumber) {
      return NextResponse.json({ error: 'Sender and Recipient account cannot be the same' }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount should be greater than 0' }, { status: 400 });
    }

    // Encrypt account numbers before searching or updating the database
    const encryptedSenderAccountNumber = encryptAccountNumberDeterministic(senderAccountNumber);
    const encryptedRecipientAccountNumber = encryptAccountNumberDeterministic(recipientAccountNumber);

    const senderAccount = await prisma.account.findUnique({
      where: { accountNumber: encryptedSenderAccountNumber },
    });

    const recipientAccount = await prisma.account.findUnique({
      where: { accountNumber: encryptedRecipientAccountNumber },
    });

    if (!senderAccount) {
      return NextResponse.json({ error: 'Sender account not found' }, { status: 404 });
    }

    if (!recipientAccount) {
      return NextResponse.json({ error: 'Recipient account not found' }, { status: 404 });
    }

    if (senderAccount.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Perform the transaction
    const transaction = await prisma.$transaction([
      prisma.account.update({
        where: { accountNumber: encryptedSenderAccountNumber },
        data: {
          balance: senderAccount.balance - amount,
          transactions: {
            create: {
              amount,
              transactionType: 'debit',
              mode,
            },
          },
        },
      }),
      prisma.account.update({
        where: { accountNumber: encryptedRecipientAccountNumber },
        data: {
          balance: recipientAccount.balance + amount,
          transactions: {
            create: {
              amount,
              transactionType: 'credit',
              mode,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({ message: "Transfer Successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
};


