import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    // 🛡️ ROLE GUARD: Only Students allowed here
    // Note: If you want Admins to see student view, you can change this.
    if (!user || user.role !== "Student") {
        if (user?.role === "Admin") redirect("/admin");
        if (user?.role === "Tutor") redirect("/tutor/dashboard");
        redirect("/login");
    }

    return <>{children}</>;
}
