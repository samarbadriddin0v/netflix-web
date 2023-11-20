import {NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongoose";
import Account from "@/database/account";
import {compare} from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    // @ts-ignore
    const {pin, uid, accountId} = await req.json();

    const currentAccount = await  Account.findOne({_id: accountId, uid})

    if(!currentAccount) {
      return NextResponse.json({success: false, message: "Account not found"})
    }

    const isMatch = await compare(pin, currentAccount.pin)

    if(isMatch) {
      return NextResponse.json({success: true, data: currentAccount})
    }else {
      return NextResponse.json({success: false, message: "Incorrect pin"})
    }

  }catch (e) {
    return NextResponse.json({success: false, message: "Something went wrong"})
  }
}