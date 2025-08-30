import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LinkShortener } from "./LinkShortener";
import {
  Link2,
  MousePointer,
  TrendingUp,
  Eye,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockApi } from "@/mocks/api";
import type { Link, LinkClick } from "@/types";

interface DashboardProps {
  currentPage?: string;
}

export function Dashboard({ currentPage = "dashboard" }: DashboardProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [recentClicks, setRecentClicks] = useState<LinkClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
    clicksToday: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const user = await mockApi.auth.me();

      // Load user's links
      const userLinks = await mockApi.links.list({ userId: user.id });
      // Take only the 5 most recent links
      setLinks(userLinks.slice(0, 5));

      // Load recent clicks
      const clicks = await mockApi.clicks.list();
      // Take only the 10 most recent clicks
      setRecentClicks(clicks.slice(0, 10));

      // Calculate stats
      const allUserLinks = await mockApi.links.list({ userId: user.id });

      const totalClicks = allUserLinks.reduce(
        (sum: number, link: Link) => sum + Number(link.clickCount),
        0
      );
      const activeLinks = allUserLinks.filter(
        (link: Link) => Number(link.isActive) > 0
      ).length;

      // Calculate clicks today (simplified)
      const today = new Date().toISOString().split("T")[0];
      const todayClicks = clicks.filter((click: LinkClick) =>
        click.clickedAt.startsWith(today)
      ).length;

      setStats({
        totalLinks: allUserLinks.length,
        totalClicks,
        activeLinks,
        clicksToday: todayClicks,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkCreated = () => {
    loadDashboardData();
  };

  // Sample chart data
  const chartData = [
    { name: "Mon", clicks: 12 },
    { name: "Tue", clicks: 19 },
    { name: "Wed", clicks: 8 },
    { name: "Thu", clicks: 15 },
    { name: "Fri", clicks: 24 },
    { name: "Sat", clicks: 18 },
    { name: "Sun", clicks: 9 },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Links
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.totalLinks}</p>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MousePointer className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.totalClicks}</p>
              <p className="text-xs text-muted-foreground">
                +{stats.clicksToday} today
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">
                Active Links
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.activeLinks}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.activeLinks / stats.totalLinks) * 100) || 0}%
                of total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">
                Avg. CTR
              </span>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                {stats.totalLinks > 0
                  ? (stats.totalClicks / stats.totalLinks).toFixed(1)
                  : 0}
              </p>
              <p className="text-xs text-muted-foreground">clicks per link</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Link Shortener */}
        <div>
          <LinkShortener onLinkCreated={handleLinkCreated} />
        </div>

        {/* Recent Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Click Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="clicks"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Links */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Links</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {links.length > 0 ? (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">
                          {link.title || link.shortCode}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {link.clickCount} clicks
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {link.originalUrl}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Link2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  No links yet. Create your first short link above!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentClicks.length > 0 ? (
              <div className="space-y-3">
                {recentClicks.slice(0, 5).map((click) => (
                  <div
                    key={click.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {click.country || "Unknown"}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {click.deviceType || "Unknown"} •{" "}
                        {click.browser || "Unknown"}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(click.clickedAt).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MousePointer className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  No clicks yet. Share your links to see activity here!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
