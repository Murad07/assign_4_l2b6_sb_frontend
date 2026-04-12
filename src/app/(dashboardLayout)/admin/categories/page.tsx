import { CategoryService } from "@/services/category.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryDialog from "@/components/modules/admin/category/CategoryDialog";
import CategoryDataTable from "@/components/modules/admin/category/CategoryDataTable";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    let categories: any[] = [];
    try {
        const res = await CategoryService.getAllCategories();
        categories = res.data || [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl text-primary">
                        Category Management
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Define and organize tutoring domains and subjects.
                    </p>
                </div>
                <CategoryDialog />
            </div>

            <Card className="rounded-[2.5rem] border-primary/5 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
                <CardHeader className="bg-primary/5 border-b border-primary/5 py-8">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black tracking-tighter">
                            Active Taxonomies
                            <span className="ml-3 text-xs font-black uppercase bg-primary text-white px-3 py-1 rounded-full">
                                {categories.length} Total
                            </span>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <CategoryDataTable categories={categories} />
                </CardContent>
            </Card>
        </div>
    );
}
