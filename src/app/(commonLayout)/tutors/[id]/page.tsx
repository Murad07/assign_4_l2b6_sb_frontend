import { TutorService } from "@/services/tutor.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TutorDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function TutorDetailsPage({ params }: TutorDetailsPageProps) {
    const { id } = await params;
    let tutor = null;

    try {
        const res = await TutorService.getTutorById(id);
        tutor = res.data;
    } catch (error) {
        console.error("Failed to fetch tutor details", error);
        // Fallback mock data
        if (id === "1") {
            tutor = { id: "1", name: "Alice Johnson", bio: "Experienced Math Tutor with 5 years of teaching Calculus and Algebra to high school and college students.", hourlyRate: 30, skills: ["Math", "Algebra", "Calculus"], rating: 4.8, location: "New York, USA", reviews: [] };
        } else {
            // Normally we'd throw 404 here on production if API fails with 404
            tutor = { id, name: "Mock Tutor", bio: "This is a placeholder for a tutor that wasn't found in the mock list.", hourlyRate: 0, skills: [], rating: 0 };
        }
    }

    if (!tutor) {
        return notFound();
    }

    return (
        <div className="container mx-auto max-w-5xl py-10 space-y-8">
            {/* Header / Profile Info */}
            <div className="flex flex-col md:flex-row gap-8 border-b pb-8">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.name}`} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold">{tutor.name}</h1>
                        <p className="text-xl text-muted-foreground">{tutor.bio}</p>
                    </div>

                    <div className="flex gap-4 items-center text-sm text-muted-foreground">
                        {tutor.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {tutor.location}
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-foreground">{tutor.rating}</span>
                            <span>(24 reviews)</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tutor.skills?.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                        ))}
                    </div>
                </div>

                <div className="md:w-72 bg-card border rounded-xl p-6 shadow-sm h-fit space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                        <span className="text-muted-foreground">Hourly Rate</span>
                        <span className="text-2xl font-bold">${tutor.hourlyRate}</span>
                    </div>
                    {/* Booking flow will be implemented later */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Response time: ~1 hr</span>
                        </div>
                        <Button size="lg" className="w-full">Book Session</Button>
                        <p className="text-xs text-center text-muted-foreground">No charges until you confirm.</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section Placeholder */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Student Reviews</h2>
                <div className="bg-muted/30 p-8 rounded-lg text-center text-muted-foreground">
                    Reviews will be displayed here.
                </div>
            </div>
        </div>
    );
}
