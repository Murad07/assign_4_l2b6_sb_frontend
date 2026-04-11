"use client";

import { motion } from "framer-motion";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, Phone, ShieldCheck, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileLayoutProps {
    user: User;
    children: React.ReactNode;
}

export default function ProfileLayout({ user, children }: ProfileLayoutProps) {
    return (
        <div className="w-full space-y-8 animate-in fade-in duration-700">
            {/* Cinematic Header */}
            <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="px-4 sm:px-8 -mt-20 sm:-mt-24 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                    {/* Avatar with Ring */}
                    <div className="relative group">
                        <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full p-1 bg-background ring-4 ring-primary/20">
                            <Avatar className="h-full w-full">
                                <AvatarImage src={user.image || ""} className="object-cover" />
                                <AvatarFallback className="text-4xl bg-primary/5 text-primary font-black">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-2 pb-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{user.name}</h1>
                            <Badge className="bg-primary/10 text-primary border-none uppercase text-[10px] font-black px-3 py-1">
                                {user.role}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm font-medium">
                            <div className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4 text-primary/60" />
                                {user.email}
                            </div>
                            {user.phone && (
                                <div className="flex items-center gap-1.5">
                                    <Phone className="h-4 w-4 text-primary/60" />
                                    {user.phone}
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 text-green-600 font-bold">
                                <ShieldCheck className="h-4 w-4" />
                                Verified Profile
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 opacity-50" />

                {/* Content Area */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
