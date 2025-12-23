import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/admin/StatsCard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  TrendingUp,
  Clock,
  Target,
  GraduationCap,
  Activity,
} from "lucide-react";

const userGrowthData = [
  { month: "Jan", users: 120, active: 85 },
  { month: "Feb", users: 180, active: 142 },
  { month: "Mar", users: 250, active: 198 },
  { month: "Apr", users: 340, active: 285 },
  { month: "May", users: 420, active: 356 },
  { month: "Jun", users: 510, active: 438 },
];

const courseCompletionData = [
  { name: "Technology", completed: 156, enrolled: 220 },
  { name: "Healthcare", completed: 89, enrolled: 145 },
  { name: "Finance", completed: 67, enrolled: 98 },
  { name: "Education", completed: 45, enrolled: 72 },
];

const engagementData = [
  { name: "Completed", value: 357, color: "hsl(var(--accent))" },
  { name: "In Progress", value: 243, color: "hsl(var(--primary))" },
  { name: "Not Started", value: 112, color: "hsl(var(--muted))" },
];

const weeklyActivityData = [
  { day: "Mon", sessions: 156 },
  { day: "Tue", sessions: 189 },
  { day: "Wed", sessions: 234 },
  { day: "Thu", sessions: 198 },
  { day: "Fri", sessions: 167 },
  { day: "Sat", sessions: 89 },
  { day: "Sun", sessions: 67 },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
          <p className="text-muted-foreground">
            Platform usage statistics and insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="510"
            icon={Users}
            trend={{ value: 21, isPositive: true }}
          />
          <StatsCard
            title="Active Users"
            value="438"
            icon={Activity}
            trend={{ value: 18, isPositive: true }}
          />
          <StatsCard
            title="Avg. Session Time"
            value="24 min"
            icon={Clock}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Course Completion"
            value="67%"
            icon={Target}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                User Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="Total Users"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    name="Active Users"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Completion Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                Course Completion by Sector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseCompletionData}>
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
                  <Legend />
                  <Bar
                    dataKey="enrolled"
                    name="Enrolled"
                    fill="hsl(var(--primary) / 0.3)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Engagement Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="sessions"
                    name="Sessions"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
