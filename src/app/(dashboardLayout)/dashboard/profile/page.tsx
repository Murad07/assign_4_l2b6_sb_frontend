import { AuthService } from "@/services/auth.service";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) {
        return <div>Error loading profile</div>;
    }

    return (
        <ProfileLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <StudentProfileForm user={user} />
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                        <h3 className="font-black text-lg mb-2">Account Statistics</h3>
                        <p className="text-sm text-muted-foreground mb-4">View your learning engagement at a glance.</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-background/50 p-3 rounded-2xl">
                                <span className="text-sm font-bold">Member Since</span>
                                <span className="text-xs font-mono">{new Date(user.createdAt as string).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
