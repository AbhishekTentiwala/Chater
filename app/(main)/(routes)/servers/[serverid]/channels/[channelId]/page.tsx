import Chatheader from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { ChannelType } from "@prisma/client"
import { MediaRoom } from "@/components/media-room"

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
    if(!channel){
       return redirect('/')
    }
    const member=await db.member.findFirst({
        where:{
            serverId: channel.serverId,
            profileId:profile.id
        }
    })

    if(!channel||!member){
       return redirect('/')
    }
    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <Chatheader
        name={channel.name}
        serverid={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.Text ? (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
            paramKey="channelId"
            paramValue={channel.id}
            chatId={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      ) : null}

      {channel.type === ChannelType.Audio ? (
        <MediaRoom chatId={channel.id} video={false} audio />
      ) : null}

      {channel.type === ChannelType.Video ? (
        <MediaRoom chatId={channel.id} video audio />
      ) : null}
    </div>
     );

}
 
export default ChannelidPage;