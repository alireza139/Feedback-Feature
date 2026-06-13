import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export default async function handler(req,res){

  if(req.method !== "POST"){
    return res.status(405).json({message:"Method not allowed"});
  }

  const { username,password } = req.body;

  const admin = await prisma.admin.findUnique({
    where:{ username }
  });

  if(!admin){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const valid = await bcrypt.compare(password,admin.password);

  if(!valid){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const cookie = serialize("admin_session","true",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    path:"/",
    maxAge:60*60*24
  });

  res.setHeader("Set-Cookie",cookie);

  res.status(200).json({message:"Logged in"});
}