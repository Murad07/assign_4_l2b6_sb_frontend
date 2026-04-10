import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TutorCardSkeleton() {
    return (
        <Card className="flex flex-col h-full bg-card/50">
            <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="text-right">
                    <Skeleton className="h-6 w-16" />
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}
