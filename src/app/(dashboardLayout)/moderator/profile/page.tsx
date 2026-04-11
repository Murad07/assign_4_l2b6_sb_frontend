import { AuthService } from "@/services/auth.service";
import StaffProfileForm from "@/components/modules/staff/StaffProfileForm";
import { ShieldAlert } from "lucide-react";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";

export default async function ModeratorProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) return null;

    return (
        <ProfileLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <StaffProfileForm user={user} revalidatePath="/moderator/profile" />
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-blue-600" />
                            <h4 className="text-sm font-black text-blue-700 uppercase tracking-tighter">Moderation Standing</h4>
                        </div>
                        <p className="text-xs text-blue-600 leading-relaxed font-medium">
                            Your account has active staff privileges. Profile updates are synchronized with the central audit log. Maintain professional standards in all platform interactions.
                        </p>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
