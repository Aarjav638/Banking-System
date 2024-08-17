import  prisma  from '@/lib/prisma';
import { NextRequest,NextResponse } from 'next/server';
import { hashPassword } from '@/helpers/authHelper';
export const POST = async (req:NextRequest) => {
  const body = await req.json();

  const { email,password,phone,id} = body;


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (password&&password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 characters long" },{status:400});
      }

      if (email&&!emailRegex.test(email)) {
        return NextResponse.json({ message: "Invalid email format" },{status:400});
      }

      if (phone&&phone.length < 10) {
        return NextResponse.json({ message: "Phone number must be at least 10 characters long" },{status:400});
      }

      //existing user

      const existingUser = await prisma.user.findUnique({
        where: {
          id:id,
        },
      });
  
      if (!existingUser) {
        return NextResponse.json({ message: "User not found" },{status:404});
      }

      //hash password
  
      const hashedPassword = await hashPassword(password);
  
      //uppdate user
      const updateduser = await prisma.user.update(
        {
            where: { id: existingUser.id },
            data: {
                password: hashedPassword||existingUser.password,
                phone:phone||existingUser.phone,
                email:email||existingUser.email
            },
            
        }
      );
      const { password: _password, ...userWithoutPassword } = updateduser; //remove user password from response
  
      return NextResponse.json({ message: "User updated successfully", userWithoutPassword},{status:200});

  };