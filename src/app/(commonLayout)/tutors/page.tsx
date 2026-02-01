import { TutorCard } from "@/components/modules/tutor/tutor-card";
import { TutorFilter } from "@/components/modules/tutor/tutor-filter";
import { CategoryService } from "@/services/category.service";
import { TutorService } from "@/services/tutor.service";
import { Category, Tutor } from "@/types";

interface SearchParams {
    [key: string]: string | string[] | undefined;
}

interface TutorsPageProps {
    searchParams: Promise<SearchParams>;
}

export default async function TutorsPage(props: TutorsPageProps) {
    const searchParams = await props.searchParams;

    let tutors: Tutor[] = [];
    let categories: Category[] = [];

    try {
        const [tutorsRes, categoriesRes] = await Promise.all([
            TutorService.getAllTutors(searchParams),
            CategoryService.getAllCategories(),
        ]);
        tutors = tutorsRes.data || [];
        categories = categoriesRes.data || [];
    } catch (error) {
        console.error("Failed to fetch data", error);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Find Your Perfect Tutor</h1>
                <TutorFilter categories={categories} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.length > 0 ? (
                    tutors.map((tutor) => (
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
