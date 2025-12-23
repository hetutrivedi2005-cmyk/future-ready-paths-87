import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Clock, CheckCircle, PlayCircle } from "lucide-react";
import { format } from "date-fns";

interface LearningProgressWithUser {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  username?: string;
}

interface ProgressStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
}

export default function AdminProgress() {
  const [progress, setProgress] = useState<LearningProgressWithUser[]>([]);
  const [stats, setStats] = useState<ProgressStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  async function fetchProgress() {
    try {
      // Fetch learning progress
      const { data: progressData, error: progressError } = await supabase
        .from("learning_progress")
        .select("*")
        .order("created_at", { ascending: false });

      if (progressError) throw progressError;

      // Fetch profiles to get usernames
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, username");

      if (profilesError) throw profilesError;

      // Merge progress with usernames
      const progressWithUsers = progressData?.map((p) => ({
        ...p,
        username: profiles?.find((prof) => prof.user_id === p.user_id)?.username || "Unknown",
      })) || [];

      setProgress(progressWithUsers);

      // Calculate stats
      const completed = progressData?.filter((p) => p.status === "completed").length || 0;
      const inProgress = progressData?.filter((p) => p.status === "in_progress").length || 0;
      const notStarted = progressData?.filter((p) => p.status === "not_started").length || 0;

      setStats({
        total: progressData?.length || 0,
        completed,
        inProgress,
        notStarted,
      });
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary">
            <PlayCircle className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            Not Started
          </Badge>
        );
    }
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Progress</h1>
          <p className="text-muted-foreground">
            Track and manage user learning progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <PlayCircle className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-sm font-medium">{completionRate}%</p>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Progress Records</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">Loading progress...</p>
              </div>
            ) : progress.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No progress records found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progress.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.username}
                      </TableCell>
                      <TableCell>{record.course_id}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.started_at
                          ? format(new Date(record.started_at), "MMM d, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.completed_at
                          ? format(new Date(record.completed_at), "MMM d, yyyy")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
