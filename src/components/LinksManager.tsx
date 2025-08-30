import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  QrCode,
  TrendingUp,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
} from "lucide-react";
import { mockApi } from "@/mocks/api";
import type { Link } from "@/types";

interface LinksManagerProps {
  className?: string;
}

type SortField = "createdAt" | "clickCount" | "title";
type SortDirection = "asc" | "desc";

export function LinksManager({ className }: LinksManagerProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const { toast } = useToast();

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const user = await mockApi.auth.me();
      const userLinks = await mockApi.links.list({ userId: user.id });
      setLinks(userLinks);
    } catch (error) {
      console.error("Error loading links:", error);
      toast({
        title: "Error loading links",
        description: "Failed to load your links. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      await mockApi.links.delete(linkId);
      setLinks(links.filter((link) => link.id !== linkId));
      toast({
        title: "Link deleted",
        description: "The link has been permanently deleted.",
      });
    } catch (error) {
      console.error("Error deleting link:", error);
      toast({
        title: "Error deleting link",
        description: "Failed to delete the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleLinkStatus = async (link: Link) => {
    try {
      const updatedLink = {
        ...link,
        isActive: !Number(link.isActive),
        updatedAt: new Date().toISOString(),
      };

      await mockApi.links.update(link.id, {
        isActive: updatedLink.isActive,
        updatedAt: updatedLink.updatedAt,
      });

      setLinks(links.map((l) => (l.id === link.id ? updatedLink : l)));

      toast({
        title: `Link ${updatedLink.isActive ? "activated" : "deactivated"}`,
        description: `The link is now ${
          updatedLink.isActive ? "active" : "inactive"
        }.`,
      });
    } catch (error) {
      console.error("Error updating link status:", error);
      toast({
        title: "Error updating link",
        description: "Failed to update the link status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    loadLinks();
  };

  const filteredLinks = links.filter((link: Link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title?.toLowerCase().includes(query) ||
      link.originalUrl.toLowerCase().includes(query) ||
      link.shortCode.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query)
    );
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <SortAsc className="h-4 w-4 ml-1" />
    ) : (
      <SortDesc className="h-4 w-4 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
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
            <h1 className="text-2xl font-bold">Links</h1>
            <p className="text-muted-foreground">
              Manage and monitor your shortened links
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Link
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search links by title, URL, or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Links Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Links ({filteredLinks.length})</span>
              {filteredLinks.length > 0 && (
                <Badge variant="secondary">
                  {filteredLinks.reduce(
                    (sum, link) => sum + Number(link.clickCount),
                    0
                  )}{" "}
                  total clicks
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredLinks.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center">
                          Link
                          <SortIcon field="title" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Original URL
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none text-center"
                        onClick={() => handleSort("clickCount")}
                      >
                        <div className="flex items-center justify-center">
                          Clicks
                          <SortIcon field="clickCount" />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none hidden sm:table-cell"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center">
                          Created
                          <SortIcon field="createdAt" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLinks.map((link) => {
                      const shortUrl = `${window.location.origin}/${link.shortCode}`;
                      const isActive = Number(link.isActive) > 0;

                      return (
                        <TableRow key={link.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {link.title || link.shortCode}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(shortUrl)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground font-mono">
                                {shortUrl}
                              </p>
                              {link.description && (
                                <p className="text-xs text-muted-foreground">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="max-w-xs">
                              <p
                                className="text-sm truncate"
                                title={link.originalUrl}
                              >
                                {link.originalUrl}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <TrendingUp className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">
                                {link.clickCount}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={isActive ? "secondary" : "outline"}
                              className={
                                isActive ? "text-green-700 bg-green-50" : ""
                              }
                            >
                              {isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {new Date(link.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => copyToClipboard(shortUrl)}
                                  className="gap-2"
                                >
                                  <Copy className="h-4 w-4" />
                                  Copy Link
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    window.open(link.originalUrl, "_blank")
                                  }
                                  className="gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  Visit Original
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <QrCode className="h-4 w-4" />
                                  QR Code
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => toggleLinkStatus(link)}
                                  className="gap-2"
                                >
                                  <span className="h-4 w-4 flex items-center justify-center">
                                    {isActive ? "⏸" : "▶"}
                                  </span>
                                  {isActive ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteLink(link.id)}
                                  className="gap-2 text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {searchQuery ? "No links found" : "No links yet"}
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "Try adjusting your search terms"
                        : "Create your first shortened link to get started"}
                    </p>
                  </div>
                  {!searchQuery && (
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Link
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
