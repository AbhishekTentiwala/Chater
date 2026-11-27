import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid"
import { db } from "@/lib/db";

export async function PATCH(req:Request,
    {params}:{params: Promise<{serverid:string}>}
){
    try {
        const { serverid } = await params;
        const profile=await currentProfile()
        if(!profile){
            return new NextResponse("Unauthorised",{status:401})
        }


        if(!serverid){
            return new NextResponse("Server Id Missing",{status:400})
        }

        const server=await db.server.update({
            where:{
                id:serverid,
                profileId:profile.id
            },
            data:{
                inviteCode:uuidv4(),
            },

        });
        return NextResponse.json(server);


    } catch (error) {
        console.log();
        return new NextResponse("Internal Error",{status:500})
    }
}