import { AuthService } from "@/services/auth.service";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";

export default async function StudentProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) {
        return <div>Error loading profile</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <StudentProfileForm user={user} />
        </div>
    );
}
