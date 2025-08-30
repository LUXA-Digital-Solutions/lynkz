import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  MousePointer,
  Globe,
  Smartphone,
  Download,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import { mockApi } from "@/mocks/api";
import type { Link, LinkClick, AnalyticsData } from "@/types";

interface AnalyticsProps {
  className?: string;
}

export function Analytics({ className }: AnalyticsProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [clicks, setClicks] = useState<LinkClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalLinks: 0,
    totalClicks: 0,
    clickRate: 0,
    topLinks: [],
    recentClicks: [],
    clicksByDate: [],
    clicksByCountry: [],
    clicksByDevice: [],
    clicksByReferrer: [],
  });

  console.log(analyticsData);

  const [stats, setStats] = useState({
    totalClicks: 0,
    uniqueClicks: 0,
    totalLinks: 0,
    avgClicksPerLink: 0,
  });

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const processClicksByDate = (clicks: LinkClick[]) => {
    const days = 7;
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const clicksOnDate = clicks.filter((click) =>
        click.clickedAt.startsWith(dateStr)
      ).length;

      result.push({ date: dateStr, clicks: clicksOnDate });
    }

    return result;
  };

  const processClicksByCountry = (clicks: LinkClick[]) => {
    const countryMap = new Map<string, number>();

    clicks.forEach((click) => {
      const country = click.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });

    return Array.from(countryMap.entries())
      .map(([country, clicks]) => ({ country, clicks }))
      .sort((a, b) => b.clicks - a.clicks);
  };

  const processClicksByDevice = (clicks: LinkClick[]) => {
    const deviceMap = new Map<string, number>();

    clicks.forEach((click) => {
      const device = click.deviceType || "Unknown";
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });

    return Array.from(deviceMap.entries()).map(([device, clicks]) => ({
      device,
      clicks,
    }));
  };

  const processClicksByReferrer = (clicks: LinkClick[]) => {
    const referrerMap = new Map<string, number>();

    clicks.forEach((click) => {
      const referrer = click.referrer || "Direct";
      referrerMap.set(referrer, (referrerMap.get(referrer) || 0) + 1);
    });

    return Array.from(referrerMap.entries())
      .map(([referrer, clicks]) => ({ referrer, clicks }))
      .sort((a, b) => b.clicks - a.clicks);
  };

  const loadAnalyticsData = async () => {
    try {
      const user = await mockApi.auth.me();

      // Get links data
      const links = await mockApi.links.list({ userId: user.id });

      // Get clicks data
      const clicks = await mockApi.clicks.list({
        linkId: links.map((link: Link) => link.id),
      });

      // Process the data into analytics format
      const analytics: AnalyticsData = {
        totalLinks: links.length,
        totalClicks: clicks.length,
        clickRate: links.length ? clicks.length / links.length : 0,
        topLinks: [...links]
          .sort((a, b) => b.clickCount - a.clickCount)
          .slice(0, 5),
        recentClicks: clicks.slice(0, 10),
        clicksByDate: processClicksByDate(clicks),
        clicksByCountry: processClicksByCountry(clicks),
        clicksByDevice: processClicksByDevice(clicks),
        clicksByReferrer: processClicksByReferrer(clicks),
      };

      setAnalyticsData(analytics);
      setLinks(analytics.topLinks);
      setClicks(analytics.recentClicks);

      // Update stats
      setStats({
        totalClicks: analytics.totalClicks,
        uniqueClicks: new Set(
          analytics.recentClicks.map((click) => click.ipAddress)
        ).size,
        totalLinks: analytics.totalLinks,
        avgClicksPerLink:
          Math.round((analytics.totalClicks / analytics.totalLinks) * 10) /
            10 || 0,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Process click data for charts
  const getClicksByDate = () => {
    const days = 7;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const clicksOnDate = clicks.filter((click) =>
        click.clickedAt.startsWith(dateStr)
      ).length;

      data.push({
        date: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        clicks: clicksOnDate,
      });
    }

    return data;
  };

  const getTopLinks = () => {
    return links
      .sort((a, b) => Number(b.clickCount) - Number(a.clickCount))
      .slice(0, 5)
      .map((link) => ({
        name: link.title || link.shortCode,
        clicks: Number(link.clickCount),
        url: link.originalUrl,
      }));
  };

  const getClicksByDevice = () => {
    const deviceCounts: Record<string, number> = {};

    clicks.forEach((click) => {
      const device = click.deviceType || "Unknown";
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    return Object.entries(deviceCounts).map(([device, clicks]) => ({
      device,
      clicks,
      fill: getDeviceColor(device),
    }));
  };

  const getDeviceColor = (device: string) => {
    const colors: Record<string, string> = {
      Desktop: "hsl(var(--chart-1))",
      Mobile: "hsl(var(--chart-2))",
      Tablet: "hsl(var(--chart-3))",
      Unknown: "hsl(var(--muted))",
    };
    return colors[device] || "hsl(var(--chart-4))";
  };

  const clicksByDate = getClicksByDate();
  const topLinks = getTopLinks();
  const clicksByDevice = getClicksByDevice();

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
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track performance and insights for your links
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                alert("Analytics data would be exported in a real app");
              }}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Total Clicks
                </span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stats.totalClicks}</p>
                <p className="text-xs text-muted-foreground">
                  +12% from last week
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">
                  Unique Visitors
                </span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stats.uniqueClicks}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.totalClicks > 0
                    ? Math.round((stats.uniqueClicks / stats.totalClicks) * 100)
                    : 0}
                  % unique rate
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Avg. Clicks
                </span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stats.avgClicksPerLink}</p>
                <p className="text-xs text-muted-foreground">per link</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Active Links
                </span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{stats.totalLinks}</p>
                <p className="text-xs text-muted-foreground">total created</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="referrers">Referrers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Click Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={clicksByDate}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area
                        dataKey="clicks"
                        fill="hsl(var(--primary))"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Links</CardTitle>
                </CardHeader>
                <CardContent>
                  {topLinks.length > 0 ? (
                    <div className="space-y-3">
                      {topLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{link.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {link.url}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {link.clicks} clicks
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        No click data available yet
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { country: "United States", clicks: 2345 },
                      { country: "United Kingdom", clicks: 1234 },
                      { country: "Germany", clicks: 876 },
                      { country: "France", clicks: 654 },
                      { country: "India", clicks: 432 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{item.country}</span>
                        </div>
                        <Badge variant="outline">
                          {item.clicks.toLocaleString()} clicks
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "North America", percentage: 45 },
                      { region: "Europe", percentage: 30 },
                      { region: "Asia", percentage: 15 },
                      { region: "Others", percentage: 10 },
                    ].map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{region.region}</span>
                          <span>{region.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${region.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Clicks by Device
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  {clicksByDevice.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={clicksByDevice}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="clicks"
                          >
                            {clicksByDevice.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {clicksByDevice.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.fill }}
                              />
                              <span className="font-medium">{item.device}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {item.clicks} clicks
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        No device data available yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Google", clicks: 1234, percentage: "45%" },
                    { source: "Direct", clicks: 856, percentage: "31%" },
                    { source: "Twitter", clicks: 432, percentage: "16%" },
                    { source: "Facebook", clicks: 221, percentage: "8%" },
                  ].map((referrer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{referrer.source}</p>
                          <p className="text-sm text-muted-foreground">
                            {referrer.percentage} of total traffic
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {referrer.clicks.toLocaleString()} clicks
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
