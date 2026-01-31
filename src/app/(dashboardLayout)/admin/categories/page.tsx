import { CategoryService } from "@/services/category.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryDialog from "@/components/modules/admin/category/CategoryDialog";
import CategoryItemActions from "@/components/modules/admin/category/CategoryItemActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Using Avatar for icon display if it's an image URL

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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
                <CategoryDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Categories ({categories.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Icon</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category: any) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            {/* If icon is an image URL */}
                                            <Avatar className="h-9 w-9 bg-muted">
                                                <AvatarImage src={category.icon} alt={category.name} />
                                                <AvatarFallback>{category.name?.[0]?.toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{category.description}</TableCell>
                                        <TableCell className="text-right">
                                            <CategoryItemActions category={category} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
