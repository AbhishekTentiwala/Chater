"use client";

import {FileIcon, X} from "lucide-react"
import Image from "next/image";
import { UploadDropzone ,UploadButton} from "@/lib/uploadthing";

// import "@uploadthing/react/styles.css" 

// import "tailwindcss";

// import "uploadthing/tw/v4";
// import "../node_modules/@uploadthing/react/dist"; /** <-- depends on your project structure */



interface FileUploadProps{
    onChange:(url?:string)=>void;
    value:string;
    endpoint:"messageFile"|"serverImage"
}



export const FileUpload=({onChange,value,endpoint}:FileUploadProps)=>{
    const fileType=value?.split(".").pop();
    if(value && endpoint==="messageFile"){
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-pink-200 stroke-pink-400"/>
                <a href={value} target="_blank"
                rel="noopener noreferrer"
                className="ml-2 w-80 flex flex-wrap text-sm text-pink-500 dark:text-pink-400 hover:underline">
                    {value}
                </a>
                <button onClick={()=>onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 sgadow-sm" type="button"><X className="h-4 w-4"/></button>
            </div>
        )
    }
    if (value && fileType!=="pdf"){
        return(
        <>
        <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                
                <button onClick={()=>onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 sgadow-sm" type="button"><X className="h-4 w-4"/></button>
            </div>
            <div className="w-80 h-60 flex flex-wrap">{value}</div>
            
        </>
            
            
        )
    }
    

    return(
        <><UploadDropzone
        endpoint ={endpoint}
        onClientUploadComplete={(res)=>{
            onChange(res?.[0].url);
        }}
        onUploadError={(error:Error)=>{
            console.log(error)
        }}

        />
        
        </>
        
        
    )
}