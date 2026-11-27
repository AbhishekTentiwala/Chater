import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/sever/server-sidebar";

const SreverIdLayout = async ({children,
    params,
}:{children:React.ReactNode
    params:Promise<{serverid:string}>
}) => {
    const { serverid } = await params;
    const profile =await currentProfile();


    if(!profile){
        return redirect("/sign-in")
    }

    const server =await db.server.findUnique({
        where:{
            id:serverid,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })

    if(!server){
        return redirect("/")
    }


    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverid={serverid}/>
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
            
        </div>
     );
}
 
export default SreverIdLayout;