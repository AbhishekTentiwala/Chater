"use client";

import { CreateServerModel } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModel } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModel } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "../modals/leave-server-madal";

export const ModalProvider=()=>{
    const [isMounted,setmounted]=useState(false);
    useEffect(()=>{
        setmounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return(
        <>
        
            <LeaveServerModal/>
            <CreateServerModel/>
            <InviteModal/>
            <EditServerModel/>
            <MembersModal/>
            <CreateChannelModel/>
        </>
    )
}