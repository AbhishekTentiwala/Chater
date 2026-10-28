import Chatheader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
// Make sure this import path matches your project structure
import { MediaRoom } from "@/components/media-room"; 

interface MemberIdpageprops {
  params: Promise<{
    memberId: string;
    serverid: string;
  }>;
  // Added searchParams Promise for Next.js 15
  searchParams: Promise<{
    video?: boolean;
  }>;
}

const MemberIdpage = async ({ params, searchParams }: MemberIdpageprops) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/sign-in');
  }
  
  // Await both params and searchParams for Next.js 15 compatibility
  const { memberId, serverid } = await params;
  const resolvedSearchParams = await searchParams;

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverid,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, memberId);

  if (!conversation) {
    return redirect(`/servers/${serverid}`);
  }
  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <Chatheader 
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverid={serverid}
        type="conversation"
      />
      
      {/* Render MediaRoom if the video search parameter is true */}
      {resolvedSearchParams?.video && (
        <MediaRoom chatId={conversation.id} audio video />
      )}
      
      {/* Render Chat components if the video search parameter is missing/false */}
      {!resolvedSearchParams?.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{ conversationId: conversation.id }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{ conversationId: conversation.id }}
          />
        </>
      )}
    </div>
  );
}
 
export default MemberIdpage;