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

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // reduce transaction array to get the monthly spent amount by month and also get the month name
    const monthlySpent = Transactions.reduce((acc, curr) => {
      if (curr.transactionType === 'debit') {  // Filter by 'debit'
        const monthIndex = curr.createdAt.getMonth();
        const monthName = monthNames[monthIndex];
        
        if (!acc[monthName]) {
          acc[monthName] = 0;
        }
        
        acc[monthName] += curr.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Calculate Monthly Income (Credits)
    const monthlyIncome = Transactions.reduce((acc, curr) => {
      const monthIndex = curr.createdAt.getMonth();
        const monthName = monthNames[monthIndex];
      if (curr.transactionType === 'credit') {  // Filter by 'credit'
        

        if (!acc[monthName]) {
          acc[monthName] = 0;
        }
        
        acc[monthName] += curr.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Return the transactions, monthly spent, and monthly income
    return NextResponse.json({ Transactions, monthlySpent, monthlyIncome }, { status: 200 });
    
    
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
};


