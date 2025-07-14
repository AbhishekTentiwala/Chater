"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOutIcon, PlusCircle, Settings, Trash2, UserPlus2, Users } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";

interface ServerHeaderPrpos{
    server:ServerWithMembersWithProfiles;
    role?: MemberRole
}

export const ServerHeader=({server,role}:ServerHeaderPrpos)=>{

    const {onOpen}=useModal()
    

    const isAdmin =role===MemberRole.Admin;
    const isModerator= isAdmin||role===MemberRole.Moderater 
    return(
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                {server.name}
                <ChevronDown className="h-5 w-5 ml-auto "/>

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator&&(<DropdownMenuItem
                onClick={()=>onOpen("invite",{server:server})} className="text-yellow-600 dark:text-red-300 px-3 py-2 text-sm cursor-pointer">
                    Invite People
                    <UserPlus2 className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
                {isAdmin&&(<DropdownMenuItem
                onClick={()=>onOpen("editServer",{server:server})} className=" px-3 py-2 text-sm cursor-pointer">
                    Server Settings
                    <Settings className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
                {isAdmin&&(<DropdownMenuItem
                onClick={()=>onOpen("members",{server:server})} className=" px-3 py-2 text-sm cursor-pointer">
                    Manage Members
                    <Users className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
                {isModerator&&(<DropdownMenuItem
                onClick={()=>onOpen("createChannel",{server:server})} className=" px-3 py-2 text-sm cursor-pointer">
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
                {isModerator&&(<DropdownMenuSeparator/>)}
                {isAdmin&&(<DropdownMenuItem className="text-red-500 px-3 py-2 text-sm cursor-pointer">
                    Delete Server
                    <Trash2 className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
                {!isAdmin&&(<DropdownMenuItem className="text-red-500 px-3 py-2 text-sm cursor-pointer">
                    Leave Server
                    <LogOutIcon className="h-4 w-4 ml-auto"/>

                </DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}