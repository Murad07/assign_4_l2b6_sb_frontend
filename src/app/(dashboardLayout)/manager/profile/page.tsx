import { AuthService } from "@/services/auth.service";
import StaffProfileForm from "@/components/modules/staff/StaffProfileForm";
import { Shield } from "lucide-react";

export default async function ManagerProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Management Account</h1>
                <p className="text-muted-foreground">Adjust your professional identity and contact information.</p>
            </div>

            <StaffProfileForm user={user} revalidatePath="/manager/profile" />

            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex gap-4 items-start">
                <Shield className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                    <h4 className="text-sm font-bold text-amber-700">Security Notice</h4>
                    <p className="text-xs text-amber-600 leading-relaxed mt-1">
                        You are logged in as a privileged Manager. Your actions are logged for audit purposes. Please ensure Multi-Factor Authentication is enabled for high-level operations.
                    </p>
                </div>
            </div>
        </div>
    );
}
