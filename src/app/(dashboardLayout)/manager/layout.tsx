import { AuthService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    if (!user || user.role !== "Manager") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
