import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { getMyTutorProfile } from "@/actions/tutor";
import TutorProfileForm from "@/components/modules/tutor/profile/TutorProfileForm";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";
import AvailabilityManager from "@/components/modules/tutor/availability/AvailabilityManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryService } from "@/services/category.service";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";

export const dynamic = "force-dynamic";

export default async function TutorProfilePage() {
    const user = await AuthService.getCurrentUser();
    const tutorProfile = await getMyTutorProfile();
    const categories = await CategoryService.getAllCategories();

    if (!user) {
        redirect("/login");
    }

    return (
        <ProfileLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Tabs defaultValue="tutor" className="w-full">
                        <TabsList className="bg-muted/50 p-1 rounded-2xl mb-8">
                            <TabsTrigger value="tutor" className="rounded-xl px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold">Tutor Details</TabsTrigger>
                            <TabsTrigger value="availability" className="rounded-xl px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold">Availability</TabsTrigger>
                            <TabsTrigger value="basic" className="rounded-xl px-8 data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold">Personal Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tutor" className="mt-0">
                            <TutorProfileForm tutor={tutorProfile} categories={categories.data} />
                        </TabsContent>
                        <TabsContent value="availability" className="mt-0">
                            <AvailabilityManager initialAvailability={tutorProfile?.availability || []} />
                        </TabsContent>
                        <TabsContent value="basic" className="mt-0">
                            <StudentProfileForm user={user} />
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                        <h3 className="font-black text-lg mb-2">Teaching Status</h3>
                        {tutorProfile?.isApproved ? (
                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                Active & Visible
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                                <div className="w-2 h-2 rounded-full bg-amber-600" />
                                Pending Verification
                            </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                            Your availability and profile details determine your visibility in the tutor search.
                        </p>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
