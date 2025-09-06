import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockUser } from "@/mocks/data";
import {
  BarChart3,
  Calendar,
  Edit,
  Link2,
  Mail,
  MapPin,
  Settings,
  Share2,
  User,
} from "lucide-react";

export function Profile() {
  const stats = [
    { label: "Total Links", value: "124", icon: Link2 },
    { label: "Total Clicks", value: "12.8k", icon: BarChart3 },
    { label: "Member Since", value: "2023", icon: Calendar },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="container max-w-4xl mx-auto py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="relative mb-8"
      >
        <div className="h-48 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 mb-16" />
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={mockUser.avatar || ""} />
              <AvatarFallback className="text-4xl bg-primary/5">
                {mockUser.displayName?.charAt(0) || mockUser.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="mb-4 flex items-end gap-4">
            <div>
              <h1 className="text-2xl font-bold">{mockUser.displayName}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </p>
            </div>
            <div className="flex gap-2 mb-1">
              <Button size="sm" variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        variants={itemVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - About */}
        <motion.div
          className="md:col-span-2 space-y-6"
          variants={itemVariants}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <p className="text-muted-foreground mb-4">
                Digital marketer and content creator passionate about helping businesses grow their online presence through effective link management and analytics.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {mockUser.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  @{mockUser.username}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined September 2023
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "Created new link", time: "2 hours ago", target: "blog.example.com/latest-post" },
                  { action: "Updated profile", time: "1 day ago", target: "Profile settings" },
                  { action: "Achieved milestone", time: "3 days ago", target: "1,000 total clicks" },
                ].map((activity, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.target}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Quick Actions & Tags */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Link2 className="h-4 w-4" />
                  Create New Link
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Tags & Categories</h2>
              <div className="flex flex-wrap gap-2">
                {["Marketing", "Social Media", "Blog", "E-commerce", "Personal"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
