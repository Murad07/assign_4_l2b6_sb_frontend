import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function ModeratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    if (!user || user.role !== "Moderator") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
