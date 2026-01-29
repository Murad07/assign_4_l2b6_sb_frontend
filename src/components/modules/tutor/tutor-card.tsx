import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star } from "lucide-react";

interface TutorCardProps {
    tutor: {
        id: string;
        name: string;
        bio: string;
        hourlyRate: number;
        skills: string[];
        rating?: number;
        location?: string;
    };
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.name}`} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="font-bold text-lg">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{tutor.bio}</p>
                </div>
                <div className="text-right">
                    <div className="font-bold text-lg">${tutor.hourlyRate}/hr</div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {tutor.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{tutor.rating || "New"}</span>
                    <span>({Math.floor(Math.random() * 50)} reviews)</span>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/tutors/${tutor.id}`} className="w-full">
                    <Button className="w-full">View Profile</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
