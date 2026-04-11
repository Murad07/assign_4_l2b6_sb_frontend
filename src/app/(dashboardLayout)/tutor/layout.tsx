import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function TutorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    // 🛡️ ROLE GUARD: Only Tutors allowed here
    if (!user || user.role !== "Tutor") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
