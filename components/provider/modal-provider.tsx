"use client";

import { CreateServerModel } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";

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
        </>
    )
}