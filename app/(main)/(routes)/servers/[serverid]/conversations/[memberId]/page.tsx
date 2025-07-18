import Chatheader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdpageprops{
    params:{
        memberId:string;
        serverid:string
    }
}

const MemberIdpage =async ({params}:MemberIdpageprops) => {
    const profile=await currentProfile()
    if(!profile){
        return redirect('/sign-in')
    }
    
    const currentMember=await db.member.findFirst({
        where:{
            serverId:params.serverid,
            profileId:profile.id,
        },
        include:{
            profile:true
        }
    })

    if(!currentMember){
        return redirect("/")
    }

    const conversation =await getOrCreateConversation(currentMember.id,params.memberId)

    if(!conversation){
        return redirect(`/servers/${params.serverid}`)
    }
    const {memberOne ,memberTwo}=conversation;

    const otherMember=memberOne.profileId===profile.id?memberTwo:memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <Chatheader 
            imageUrl={otherMember.profile.imageUrl}
            name={otherMember.profile.name}
            serverid={params.serverid}
            type="conversation"/>
        </div>
     );
}
 
export default MemberIdpage;