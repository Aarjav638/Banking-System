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
  const { accountnumber } = body;

  try {
    if (!accountnumber) {
      return NextResponse.json({ error: 'Account NUmber is required' }, { status: 400 });
    }
    
    

    // Encrypt account numbers before searching or updating the database
    const encryptedAccountNumber = encryptAccountNumberDeterministic(accountnumber);

    const Transactions = await prisma.transactions.findMany({
      where: { accountId: encryptedAccountNumber },
      orderBy: { createdAt: 'desc' },
    });

    

    if (Transactions.length === 0) {
      return NextResponse.json({ message: `Transactions not found for the entered account Account Number ` }, { status: 404});
    }

    

    // Return the account details
    return NextResponse.json(Transactions, { status: 200 });
    
    
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
};


