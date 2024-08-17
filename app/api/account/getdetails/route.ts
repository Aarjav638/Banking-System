import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { encryptAccountNumberDeterministic } from '@/helpers/Account/accountGenerate';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
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


  try {
    
    const Account = await prisma.account.findMany({
      where: { userId: userId },
      orderBy:{
        type: 'desc'
      }
    });

    

    if (!Account) {
      return NextResponse.json({ error: 'account not found' }, { status: 404 });
    }

    

    // Return the account details
    return NextResponse.json(Account, { status: 200 });
    
    
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
};


