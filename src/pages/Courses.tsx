import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Video,
  Award,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface VideoLecture {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  thumbnail: string;
  videoId: string;
  views: string;
  rating: number;
  category: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  students: string;
  rating: number;
  lectures: number;
  category: string;
  image: string;
  featured?: boolean;
}

const videoLectures: VideoLecture[] = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    instructor: "Dr. Angela Yu",
    duration: "2:15:30",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    videoId: "rfscVS0vtbw",
    views: "12M",
    rating: 4.9,
    category: "Technology",
  },
  {
    id: "2",
    title: "Machine Learning Full Course",
    instructor: "Andrew Ng",
    duration: "3:45:00",
    thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
    videoId: "GwIo3gDZCVQ",
    views: "8.5M",
    rating: 4.8,
    category: "Technology",
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    instructor: "Neil Patel",
    duration: "1:45:20",
    thumbnail: "https://img.youtube.com/vi/hiHMGCaQPxA/maxresdefault.jpg",
    videoId: "hiHMGCaQPxA",
    views: "2.1M",
    rating: 4.7,
    category: "Marketing",
  },
  {
    id: "4",
    title: "Data Science with R Programming",
    instructor: "Kirill Eremenko",
    duration: "4:20:00",
    thumbnail: "https://img.youtube.com/vi/_V8eKsto3Ug/maxresdefault.jpg",
    videoId: "_V8eKsto3Ug",
    views: "3.2M",
    rating: 4.6,
    category: "Technology",
  },
  {
    id: "5",
    title: "JavaScript Complete Tutorial",
    instructor: "Mosh Hamedani",
    duration: "3:30:45",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
    videoId: "W6NZfCO5SIk",
    views: "15M",
    rating: 4.9,
    category: "Technology",
  },
  {
    id: "6",
    title: "Project Management Fundamentals",
    instructor: "Mike Clayton",
    duration: "2:00:00",
    thumbnail: "https://img.youtube.com/vi/uWPIsaYpY7U/maxresdefault.jpg",
    videoId: "uWPIsaYpY7U",
    views: "1.8M",
    rating: 4.5,
    category: "Business",
  },
];

const courses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Master HTML, CSS, JavaScript, React, Node.js, and databases to become a complete web developer.",
    instructor: "Colt Steele",
    duration: "60 hours",
    level: "Beginner to Advanced",
    students: "125K",
    rating: 4.8,
    lectures: 450,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    featured: true,
  },
  {
    id: "2",
    title: "Data Analysis with Python",
    description: "Learn data analysis using Python, Pandas, NumPy, and visualization libraries.",
    instructor: "Jose Portilla",
    duration: "45 hours",
    level: "Intermediate",
    students: "89K",
    rating: 4.7,
    lectures: 280,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
  },
  {
    id: "3",
    title: "Cloud Computing with AWS",
    description: "Comprehensive AWS training covering EC2, S3, Lambda, and more for cloud certification.",
    instructor: "Stephane Maarek",
    duration: "35 hours",
    level: "Intermediate",
    students: "67K",
    rating: 4.9,
    lectures: 220,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    featured: true,
  },
  {
    id: "4",
    title: "Digital Marketing Complete Course",
    description: "Master SEO, social media marketing, content marketing, and paid advertising strategies.",
    instructor: "Brad Traversy",
    duration: "40 hours",
    level: "Beginner",
    students: "54K",
    rating: 4.6,
    lectures: 190,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
  },
  {
    id: "5",
    title: "Healthcare Management",
    description: "Learn healthcare administration, hospital management, and healthcare policies.",
    instructor: "Dr. Sarah Johnson",
    duration: "30 hours",
    level: "Intermediate",
    students: "23K",
    rating: 4.5,
    lectures: 150,
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
  },
  {
    id: "6",
    title: "Financial Analysis & Modeling",
    description: "Excel-based financial modeling, valuation techniques, and investment analysis.",
    instructor: "Chris Haroun",
    duration: "25 hours",
    level: "Advanced",
    students: "45K",
    rating: 4.7,
    lectures: 165,
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
];

const categories = ["All", "Technology", "Marketing", "Business", "Healthcare", "Finance"];

export default function Courses() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="h-3 w-3 mr-1" /> Learning Center
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Courses & Video Lectures
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Access world-class courses and free video lectures from industry experts. 
              Build skills that matter for your career transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                <Video className="inline-block h-7 w-7 mr-2 text-primary" />
                Free Video Lectures
              </h2>
              <p className="text-muted-foreground">
                High-quality educational content from top instructors
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoLectures.map((video) => (
              <div
                key={video.id}
                className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </a>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-background/90">
                    {video.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{video.instructor}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {video.views} views
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {video.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              <Award className="inline-block h-7 w-7 mr-2 text-primary" />
              Professional Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses with certifications to advance your career
            </p>
          </div>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .filter((course) => category === "All" || course.category === category)
                    .map((course) => (
                      <div
                        key={course.id}
                        className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {course.featured && (
                            <Badge className="absolute top-3 left-3 bg-primary">
                              Featured
                            </Badge>
                          )}
                          <Badge className="absolute top-3 right-3 bg-background/90">
                            {course.level}
                          </Badge>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            By <span className="text-foreground">{course.instructor}</span>
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {course.lectures} lectures
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                {course.rating}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {course.students}
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="gap-1">
                              Enroll <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-muted-foreground mb-6">
                Take our skill assessment to get personalized course recommendations 
                based on your career goals and current skill level.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/skill-assessment">
                    Take Skill Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/learning">View Learning Model</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
