import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AuthService } from "@/services/auth.service";

export default async function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await AuthService.getCurrentUser();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar user={user} />
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
        </div>
    );
}
