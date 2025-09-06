import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockApi } from "@/mocks/api";
import { Loader2 } from "lucide-react";

export function NewLink() {
  const [linkType, setLinkType] = useState<"single" | "bulk">("single");
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateShortCode = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const shortCode = customAlias || generateShortCode();

      await mockApi.links.create({
        originalUrl: longUrl,
        shortCode,
        customAlias: customAlias || undefined,
      });

      toast({
        title: "Success!",
        description: "Your link has been created successfully.",
      });

      // Clear form and redirect to links page
      setLongUrl("");
      setCustomAlias("");
      window.location.hash = "links";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrls.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const urls = bulkUrls.split("\n").filter((url) => url.trim());

      for (const url of urls) {
        await mockApi.links.create({
          originalUrl: url.trim(),
          shortCode: generateShortCode(),
        });
      }

      toast({
        title: "Success!",
        description: `Created ${urls.length} links successfully.`,
      });

      // Clear form and redirect to links page
      setBulkUrls("");
      window.location.hash = "links";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Link</h1>

      <Tabs
        value={linkType}
        onValueChange={(v) => setLinkType(v as "single" | "bulk")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single Link</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Create Single Link</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="longUrl">Long URL</Label>
                  <Input
                    id="longUrl"
                    type="url"
                    placeholder="https://example.com/your/long/url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customAlias">Custom Alias (Optional)</Label>
                  <Input
                    id="customAlias"
                    type="text"
                    placeholder="my-custom-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Link"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <form onSubmit={handleBulkSubmit}>
              <CardHeader>
                <CardTitle>Bulk Upload Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkUrls">Long URLs (One per line)</Label>
                  <textarea
                    id="bulkUrls"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="https://example1.com/long/url&#10;https://example2.com/long/url&#10;https://example3.com/long/url"
                    value={bulkUrls}
                    onChange={(e) => setBulkUrls(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Links"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
