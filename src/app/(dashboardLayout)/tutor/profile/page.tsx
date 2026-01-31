import { AuthService } from "@/services/auth.service";
import { getMyTutorProfile } from "@/actions/tutor";
import TutorProfileForm from "@/components/modules/tutor/profile/TutorProfileForm";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function TutorProfilePage() {
    const user = await AuthService.getCurrentUser();
    const tutorProfile = await getMyTutorProfile();

    if (!user) {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Manage Profile</h1>

            <Tabs defaultValue="tutor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="tutor">Tutor Profile</TabsTrigger>
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                </TabsList>
                <TabsContent value="tutor">
                    <TutorProfileForm tutor={tutorProfile} />
                </TabsContent>
                <TabsContent value="basic">
                    <StudentProfileForm user={user} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
