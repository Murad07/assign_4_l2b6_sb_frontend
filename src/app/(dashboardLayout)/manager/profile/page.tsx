import { AuthService } from "@/services/auth.service";
import StaffProfileForm from "@/components/modules/staff/StaffProfileForm";
import { Shield } from "lucide-react";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";

export default async function ManagerProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) return null;

    return (
        <ProfileLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <StaffProfileForm user={user} revalidatePath="/manager/profile" />
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-amber-600" />
                            <h4 className="text-sm font-black text-amber-700 uppercase tracking-tighter">Security Notice</h4>
                        </div>
                        <p className="text-xs text-amber-600 leading-relaxed font-medium">
                            You are logged in as a privileged Manager. Your actions are logged for audit purposes. Please ensure Multi-Factor Authentication is enabled for high-level operations.
                        </p>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
