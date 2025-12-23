import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, GraduationCap, BookOpen, TrendingUp, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  completedCourses: number;
  inProgressCourses: number;
}

const mockChartData = [
  { name: "Jan", users: 12, progress: 45 },
  { name: "Feb", users: 19, progress: 52 },
  { name: "Mar", users: 27, progress: 61 },
  { name: "Apr", users: 35, progress: 78 },
  { name: "May", users: 42, progress: 85 },
  { name: "Jun", users: 48, progress: 92 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    completedCourses: 0,
    inProgressCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total users
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch learning progress stats
        const { data: progressData } = await supabase
          .from("learning_progress")
          .select("status");

        const completed = progressData?.filter((p) => p.status === "completed").length || 0;
        const inProgress = progressData?.filter((p) => p.status === "in_progress").length || 0;

        // Get unique active users (users with any progress)
        const { data: activeUsersData } = await supabase
          .from("learning_progress")
          .select("user_id");
        
        const uniqueActiveUsers = new Set(activeUsersData?.map((p) => p.user_id)).size;

        setStats({
          totalUsers: userCount || 0,
          activeUsers: uniqueActiveUsers,
          completedCourses: completed,
          inProgressCourses: inProgress,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Here's what's happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={loading ? "..." : stats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Learners"
            value={loading ? "..." : stats.activeUsers}
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Completed Courses"
            value={loading ? "..." : stats.completedCourses}
            icon={GraduationCap}
            trend={{ value: 24, isPositive: true }}
          />
          <StatsCard
            title="In Progress"
            value={loading ? "..." : stats.inProgressCourses}
            icon={BookOpen}
            description="Courses currently being taken"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
