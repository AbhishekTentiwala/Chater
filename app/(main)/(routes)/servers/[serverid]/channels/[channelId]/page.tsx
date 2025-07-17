import Chatheader from "@/components/chat/chat-header"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface ChannelidPageprops{
    params:{
        serverid:string
        channelId:string
    }
}

const ChannelidPage = async({params}:ChannelidPageprops) => {
    const profile=await currentProfile()
    if(!profile){
        return redirect('/sign-in')
    }
    const channel=await db.channel.findUnique({
        where:{
            id: params.channelId
        }
    })
    const member=await db.member.findFirst({
        where:{
            serverId: params.serverid,
            profileId:profile.id
        }
    })

    if(!channel||!member){
        redirect('/')
    }
    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <Chatheader
            name={channel.name}
            serverid={channel.serverId}
            type="channel"/>
        </div>
     );

}
 
export default ChannelidPage;