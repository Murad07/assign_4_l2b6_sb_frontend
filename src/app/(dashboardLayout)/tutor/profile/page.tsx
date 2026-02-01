import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { getMyTutorProfile } from "@/actions/tutor";
import TutorProfileForm from "@/components/modules/tutor/profile/TutorProfileForm";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";
import AvailabilityManager from "@/components/modules/tutor/availability/AvailabilityManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryService } from "@/services/category.service";

export default async function TutorProfilePage() {
    const user = await AuthService.getCurrentUser();
    const tutorProfile = await getMyTutorProfile();
    const categories = await CategoryService.getAllCategories();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Manage Profile</h1>

            <Tabs defaultValue="tutor" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
                    <TabsTrigger value="tutor">Tutor Profile</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                </TabsList>
                <TabsContent value="tutor">
                    <TutorProfileForm tutor={tutorProfile} categories={categories.data} />
                </TabsContent>
                <TabsContent value="availability">
                    <AvailabilityManager initialAvailability={tutorProfile?.availability || []} />
                </TabsContent>
                <TabsContent value="basic">
                    <StudentProfileForm user={user} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
