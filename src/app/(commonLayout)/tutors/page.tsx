import { TutorCard } from "@/components/modules/tutor/tutor-card";
import { TutorFilter } from "@/components/modules/tutor/tutor-filter";
import { PaginationControls } from "@/components/modules/tutor/pagination-controls";
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
    let pagination = { page: 1, totalPages: 1 };

    try {
        const [tutorsRes, categoriesRes] = await Promise.all([
            TutorService.getAllTutors(searchParams),
            CategoryService.getAllCategories(),
        ]);
        tutors = tutorsRes.data || [];
        categories = categoriesRes.data || [];
        if (tutorsRes.pagination) {
            pagination = tutorsRes.pagination;
        }
    } catch (error) {
        console.error("Failed to fetch data", error);
    }

    return (
        <div className="space-y-8 container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2">Find Your Perfect Tutor</h1>
                    <p className="text-muted-foreground">Search by subject, skills, or specific tutors.</p>
                </div>
                <TutorFilter categories={categories} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[50vh] content-start">
                {tutors.length > 0 ? (
                    tutors.map((tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-24 bg-muted/20 border-2 border-dashed rounded-3xl">
                        <h3 className="text-xl font-bold text-muted-foreground">No tutors found</h3>
                        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            {tutors.length > 0 && (
                <PaginationControls currentPage={pagination.page} totalPages={pagination.totalPages} />
            )}
        </div>
    );
}
