import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageprops{
    params:{
        serverid:string
    }
}

const ServerIdPage = async({params}:ServerIdPageprops) => {
    const profile =await currentProfile()
    if(!profile){
        return redirect("/sign-in")
    }
    const server=await db.server.findUnique({
        where:{
            id:params.serverid,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        },
        include:{
            channels:{
                where:{
                    name:"general"
                },
                orderBy:{
                    createdAt:"asc"
                }
            }
        }
    })

    const initialchannel=server?.channels[0];
    if(initialchannel?.name!=="general"){
        return null
    }
    return ( redirect(`/servers/${params.serverid}/channels/${initialchannel?.id}`))
}
 
export default ServerIdPage;