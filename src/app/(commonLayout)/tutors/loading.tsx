import { TutorCardSkeleton } from "@/components/modules/tutor/tutor-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function TutorsLoading() {
    return (
        <div className="container mx-auto px-4 py-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-full md:w-48" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <TutorCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
