import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    // 🛡️ ROLE GUARD: Only Admins allowed here
    if (!user || user.role !== "Admin") {
        redirect("/dashboard"); // Redirect to their default area
    }

    return <>{children}</>;
}
