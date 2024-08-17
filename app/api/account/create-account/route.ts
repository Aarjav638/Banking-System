import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { generateAccountNumber, encryptAccountNumberDeterministic } from '@/helpers/Account/accountGenerate';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    // Extract the token from the Authorization header
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
    const { name, phone, pan, uid, father_name, address, dob,type,amount } = body;

    const accountNumber = generateAccountNumber();

    if (!name || !phone ||  !uid || !father_name || !address || !dob|| !type|| !amount) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (phone.length !== 10) {
      return NextResponse.json({ error: 'Phone number should be 10 digits' }, { status: 400 });
    }

    if (pan && (pan.length !== 0 && pan.length !== 10)) {
      return NextResponse.json({ error: 'PAN number should be 10 digits' }, { status: 400 });
    }

    if (type !== 'savings' && type !== 'current') {
      return NextResponse.json({ error: 'Invalid account type' }, { status: 400 });
    }
    if(type==='current' && pan.length === 0){
      return NextResponse.json({ error: 'PAN number is required for current account' }, { status: 400 });
    }

    const existingAccount = await prisma.account.findFirst({
      where: {
        uid: uid,
        type: type,
      },
    });

    if (existingAccount) {
      return NextResponse.json({ error: 'Account with the same Type or UID already exists' }, { status: 400 });
    }
    

    const formattedDob = new Date(dob).toISOString();


    const account = await prisma.account.create({
      data: {
        accountNumber: encryptAccountNumberDeterministic(accountNumber),
        name,
        phone,
        pan: pan.length === 0 ? null : pan,
        isMinor: pan.length === 0 ? true : false,
        type,
        uid,
        fatherName: father_name,
        address,
        dob: formattedDob,
        balance: amount,
        user: { connect: { id: userId } }, 
      },
    });

    return NextResponse.json({ message: 'Account created successfully', accountNumber,account }, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
