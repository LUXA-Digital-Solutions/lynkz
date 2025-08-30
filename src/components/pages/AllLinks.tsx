import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Copy,
  MoreHorizontal,
  ExternalLink,
  Pencil,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockLinks } from "@/mocks/data";
import { useState } from "react";

export function AllLinks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "clicks">("date");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "archived"
  >("all");

  // Filter and sort links
  const filteredLinks = mockLinks
    .filter((link) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          link.shortCode.toLowerCase().includes(query) ||
          link.originalUrl.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter((link) => {
      // Apply status filter
      if (filterStatus === "all") return true;
      return filterStatus === "active" ? link.isActive : !link.isActive;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return b.clickCount - a.clickCount;
    });

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    // TODO: Show toast notification
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Links</h1>
        <Button>Create New Link</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Links Overview</CardTitle>
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 h-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
              <select
                className="rounded-md border border-input bg-background px-3 h-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date">Sort by Date</option>
                <option value="clicks">Sort by Clicks</option>
              </select>
              <Input
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short URL</TableHead>
                  <TableHead className="max-w-[300px]">Original URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">
                      {`lynkz.com/${link.shortCode}`}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6"
                        onClick={() =>
                          handleCopy(`lynkz.com/${link.shortCode}`)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {link.originalUrl}
                    </TableCell>
                    <TableCell>{link.clickCount}</TableCell>
                    <TableCell>
                      {new Date(link.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.isActive ? "default" : "secondary"}>
                        {link.isActive ? "Active" : "Archived"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(link.originalUrl, "_blank")
                            }
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleCopy(`lynkz.com/${link.shortCode}`)
                            }
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
