import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Search,
  GraduationCap,
} from "lucide-react";

// Mock data for sectors and courses
const mockSectors = [
  {
    id: "1",
    name: "Technology",
    description: "Software development, AI, and digital innovation",
    courseCount: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Healthcare",
    description: "Medical technology and healthcare management",
    courseCount: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Finance",
    description: "Financial technology and investment strategies",
    courseCount: 6,
    status: "draft",
  },
  {
    id: "4",
    name: "Education",
    description: "EdTech and learning innovation",
    courseCount: 4,
    status: "active",
  },
];

const mockCourses = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    sector: "Technology",
    duration: "8 weeks",
    level: "Intermediate",
    status: "published",
  },
  {
    id: "2",
    title: "Healthcare Data Analytics",
    sector: "Healthcare",
    duration: "6 weeks",
    level: "Advanced",
    status: "published",
  },
  {
    id: "3",
    title: "Financial Modeling Basics",
    sector: "Finance",
    duration: "4 weeks",
    level: "Beginner",
    status: "draft",
  },
  {
    id: "4",
    title: "Web Development Fundamentals",
    sector: "Technology",
    duration: "10 weeks",
    level: "Beginner",
    status: "published",
  },
];

export default function AdminContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground">
              Manage sectors, courses, and learning materials
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="sectors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sectors" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Sectors
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
          </TabsList>

          {/* Sectors Tab */}
          <TabsContent value="sectors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockSectors
                .filter((s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((sector) => (
                  <Card key={sector.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{sector.name}</CardTitle>
                            <Badge
                              variant={
                                sector.status === "active" ? "default" : "secondary"
                              }
                              className="mt-1"
                            >
                              {sector.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {sector.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{sector.courseCount} courses</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4">
              {mockCourses
                .filter((c) =>
                  c.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((course) => (
                  <Card key={course.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                          <BookOpen className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{course.sector}</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span>{course.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            course.status === "published" ? "default" : "secondary"
                          }
                        >
                          {course.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
