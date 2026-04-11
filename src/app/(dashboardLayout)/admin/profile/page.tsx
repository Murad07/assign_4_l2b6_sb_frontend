import { AuthService } from "@/services/auth.service";
import StaffProfileForm from "@/components/modules/staff/StaffProfileForm";
import { ShieldCheck } from "lucide-react";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";

export default async function AdminProfilePage() {
    const user = await AuthService.getCurrentUser();

    if (!user) return null;

    return (
        <ProfileLayout user={user}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <StaffProfileForm user={user} revalidatePath="/admin/profile" />
                </div>
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <h4 className="text-sm font-black text-primary uppercase tracking-tighter">Administrator Authority</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            You have full platform-wide access. Profile changes here will update your master administrative identity. Ensure your contact details are accurate for system notifications.
                        </p>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
