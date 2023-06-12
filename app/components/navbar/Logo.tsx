'use client';

import Image from "next/image";
import image from "@/public/images/logo.png"
import { useRouter } from "next/navigation";

export const Logo = () => {
    const router = useRouter()


    return (
        <Image onClick={() => router.push('/')} src={image} alt="Logo" className="hidden md:block cursor-pointer" height={"100"} width={"100"}  />
    )
}