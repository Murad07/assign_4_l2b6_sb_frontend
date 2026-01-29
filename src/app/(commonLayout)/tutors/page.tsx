import { TutorCard } from "@/components/modules/tutor/tutor-card";
import { TutorService } from "@/services/tutor.service";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function TutorsPage() {
    let tutors = [];
    try {
        const res = await TutorService.getAllTutors();
        tutors = res.data || [];
    } catch (error) {
        console.error("Failed to fetch tutors", error);
        // Fallback/Sample data for development visualization if API is not ready
        tutors = [
            { id: "1", name: "Alice Johnson", bio: "Experienced Math Tutor", hourlyRate: 30, skills: ["Math", "Algebra", "Calculus"], rating: 4.8 },
            { id: "2", name: "Bob Smith", bio: "Native Spanish Speaker", hourlyRate: 25, skills: ["Spanish", "Language"], rating: 4.5 },
            { id: "3", name: "Charlie Brown", bio: "React & Nodejs Expert", hourlyRate: 50, skills: ["React", "Node.js", "TypeScript"], rating: 5.0 },
            { id: "4", name: "Diana Prince", bio: "History and Social Studies", hourlyRate: 20, skills: ["History", "Geography"], rating: 4.7 },
        ];
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Find Your Perfect Tutor</h1>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name or subject..."
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.length > 0 ? (
                    tutors.map((tutor: any) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No tutors found.
                    </div>
                )}
            </div>
        </div>
    );
}
