import  prisma  from '@/lib/prisma';
import { NextRequest,NextResponse } from 'next/server';
import { comparePassword } from '@/helpers/authHelper';
import  JWT  from 'jsonwebtoken';
export const POST = async (req:NextRequest) => {
  const body = await req.json();

  const { email, password } = body;


  if (!email || !password ) {
    return NextResponse.json({ message: "All fields are required" },{status:400});
  }
  

      //finding user

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" },{status:400});
      }

      //compare password

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json({ message: "Invalid credentials" },{status:400});
      }

      //create token

      const jwtSecret = process.env.JWT_SECRET || ""; 
      const token = await JWT.sign(
        { _id: user.id },
        jwtSecret,
        {
          expiresIn: "7d",
        }
      );


      const { password: _password, ...userWithoutPassword } = user;//remove user password from response

      return NextResponse.json({ message: "User Login successfully", userWithoutPassword, token },{status:200});

  };