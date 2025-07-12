"use client";

import { CreateServerModel } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModel } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";

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
            <CreateServerModel/>
            <InviteModal/>
            <EditServerModel/>
            <MembersModal/>
        </>
    )
}