import { AuthService } from "@/services/auth.service";
import StaffProfileForm from "@/components/modules/staff/StaffProfileForm";
import { ShieldAlert } from "lucide-react";

export default async function ModeratorProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Moderator Account</h1>
                <p className="text-muted-foreground">Manage your credentials and staff profile details.</p>
            </div>

            <StaffProfileForm user={user} revalidatePath="/moderator/profile" />

            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex gap-4 items-start">
                <ShieldAlert className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                    <h4 className="text-sm font-bold text-blue-700">Moderation Standing</h4>
                    <p className="text-xs text-blue-600 leading-relaxed mt-1">
                        Your account has active staff privileges. Profile updates are synchronized with the central audit log. Maintain professional standards in all platform interactions.
                    </p>
                </div>
            </div>
        </div>
    );
}
