import  prisma  from '@/lib/prisma';
import { NextRequest,NextResponse } from 'next/server';
import { hashPassword } from '@/helpers/authHelper';
export const POST = async (req:NextRequest) => {
  const body = await req.json();

  const { email, password,phone,name } = body;


  if (!email || !password || !phone || !name) {
    return NextResponse.json({ message: "All fields are required" },{status:400});
  }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 characters long" },{status:400});
      }

      if (!emailRegex.test(email)) {
        return NextResponse.json({ message: "Invalid email format" },{status:400});
      }

      if (phone.length < 10) {
        return NextResponse.json({ message: "Phone number must be at least 10 characters long" },{status:400});
      }

      //existing user

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" },{status:400});
      }

      //hash password
  
      const hashedPassword = await hashPassword(password);
  
      //create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phone,
          name
        },
      });
  
      const { password: _password, ...userWithoutPassword } = user; //remove user password from response
  
      return NextResponse.json({ message: "User created successfully", userWithoutPassword},{status:201});

  };