import { AdminService } from "@/services/admin.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PendingTutorActions from "@/components/modules/admin/tutor/PendingTutorActions";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function TutorApprovalsPage() {
    const res = await AdminService.getPendingTutors();
    // Ensure we handle potentially missing data safely
    const pendingTutors = Array.isArray(res.data) ? res.data : [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Tutor Approvals</h1>
                <Badge variant="outline">{pendingTutors.length} Pending</Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tutor</TableHead>
                                <TableHead>Subjects</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Applied On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingTutors.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No pending tutor applications.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendingTutors.map((tutor: any) => (
                                    <TableRow key={tutor.id}>
                                        <TableCell className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={tutor.user?.image || ""} alt={tutor.user?.name} />
                                                <AvatarFallback>{tutor.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{tutor.user?.name}</span>
                                                    <Link href={`/tutors/${tutor.id}`} className="text-muted-foreground hover:text-primary" target="_blank">
                                                        <ExternalLink className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{tutor.user?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {tutor.expertise && tutor.expertise.map((exp: string, idx: number) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {exp}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>{tutor.experience}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(tutor.createdAt || "").toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <PendingTutorActions tutorId={tutor.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
