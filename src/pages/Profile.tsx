import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Loader2, 
  Save,
  X,
  Plus
} from "lucide-react";

const educationLevels = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certification",
  "Self-taught",
  "Other",
];

const sectors = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Marketing",
  "Design",
  "Data Science",
  "Cybersecurity",
  "Other",
];

interface ProfileData {
  username: string;
  avatar_url: string;
  education_level: string;
  field_of_study: string;
  current_occupation: string;
  years_of_experience: number | null;
  target_sector: string;
  skills: string[];
  career_goals: string;
}

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    avatar_url: "",
    education_level: "",
    field_of_study: "",
    current_occupation: "",
    years_of_experience: null,
    target_sector: "",
    skills: [],
    career_goals: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          username: data.username || "",
          avatar_url: data.avatar_url || "",
          education_level: data.education_level || "",
          field_of_study: data.field_of_study || "",
          current_occupation: data.current_occupation || "",
          years_of_experience: data.years_of_experience,
          target_sector: data.target_sector || "",
          skills: data.skills || [],
          career_goals: data.career_goals || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: profile.username,
          avatar_url: profile.avatar_url,
          education_level: profile.education_level,
          field_of_study: profile.field_of_study,
          current_occupation: profile.current_occupation,
          years_of_experience: profile.years_of_experience,
          target_sector: profile.target_sector,
          skills: profile.skills,
          career_goals: profile.career_goals,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  function addSkill() {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  }

  function removeSkill(skillToRemove: string) {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  }

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground mt-1">
              Complete your profile to get personalized reskilling recommendations
            </p>
          </div>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Your personal details and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, username: e.target.value }))
                    }
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={profile.avatar_url}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, avatar_url: e.target.value }))
                  }
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education Background
              </CardTitle>
              <CardDescription>
                Help us understand your educational background for better recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <Select
                    value={profile.education_level}
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, education_level: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={profile.field_of_study}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, field_of_study: e.target.value }))
                    }
                    placeholder="e.g., Computer Science, Business"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Career Information
              </CardTitle>
              <CardDescription>
                Tell us about your current career situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Current Occupation</Label>
                  <Input
                    id="occupation"
                    value={profile.current_occupation}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        current_occupation: e.target.value,
                      }))
                    }
                    placeholder="e.g., Software Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={profile.years_of_experience ?? ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        years_of_experience: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      }))
                    }
                    placeholder="e.g., 5"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label>Current Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Career Goals
              </CardTitle>
              <CardDescription>
                What do you want to achieve through reskilling?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target Sector</Label>
                <Select
                  value={profile.target_sector}
                  onValueChange={(value) =>
                    setProfile((prev) => ({ ...prev, target_sector: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Career Goals</Label>
                <Textarea
                  id="goals"
                  value={profile.career_goals}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, career_goals: e.target.value }))
                  }
                  placeholder="Describe your career goals and what you hope to achieve..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
