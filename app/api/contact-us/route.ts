import  prisma  from '@/lib/prisma';
import { NextRequest,NextResponse } from 'next/server';
export const POST = async (req:NextRequest) => {
  try {
    const body = await req.json();

  const { name,email, phone,message } = body;


  if (!email || !name || !phone || !message) {
    return NextResponse.json({ message: "All fields are required" },{status:400});
  }
  

        //create contact us
        const contactUs = await prisma.contactUs.create({
            data:{
            name,
            email,
            phone,
            message
            }
        });
    
        return NextResponse.json({ message: "Success!, Your Query has been Recieved" },{status:200});
  } catch (error) {
    
    return NextResponse.json({ message: "Something went wrong" },{status:500});

  }

    
  };