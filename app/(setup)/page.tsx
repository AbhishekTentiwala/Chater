import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModel } from "@/components/modals/initial-model";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import { CreateServerModel } from "@/components/modals/create-server-modal";

const SetupPage = async() => {
    const profile = await initialProfile();
    const server= await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })
    if(server){
        
        
        return redirect(`/servers/${server.id}`)
    }
    return ( 
        <div>
            <InitialModel></InitialModel>
            <UserButton></UserButton>
            
        </div>
     );
}
 
export default SetupPage;