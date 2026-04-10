import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Tutor } from "@/types";

interface TutorCardProps {
    tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
    const userName = tutor.user?.name || "Unknown";

    return (
        <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 group border-primary/5 hover:border-primary/20 bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="flex flex-row items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-14 w-14 ring-2 ring-background shadow-lg">
                            <AvatarImage src={tutor.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-500 fill-current" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{userName}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Briefcase className="w-3 h-3" />
                            <span>{tutor.experience || 2}+ years exp.</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="font-black text-xl text-primary">${tutor.hourlyRate}</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">per hour</div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-6 pt-4">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                    "{tutor.bio || "Passionate educator dedicated to helping students achieve their full potential."}"
                </p>

                <div className="flex flex-wrap gap-2">
                    {tutor.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] px-2">
                            {skill}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-foreground">
                            {tutor.rating ? Number(tutor.rating).toFixed(1) : "4.8"}
                        </span>
                        <span>({tutor.totalReviews || 12} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <MapPin className="w-3 h-3" />
                        <span>Remote</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Link href={`/tutors/${tutor.id}`} className="w-full">
                    <Button className="w-full rounded-xl font-bold h-11 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        View Full Profile
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
