import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockApi } from "@/mocks/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Link } from "@/types";

interface EditLinkModalProps {
  link: Link | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLinkUpdated: () => void;
}

export function EditLinkModal({
  link,
  open,
  onOpenChange,
  onLinkUpdated,
}: EditLinkModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState(link?.title || "");
  const [description, setDescription] = useState(link?.description || "");
  const [customAlias, setCustomAlias] = useState(link?.customAlias || "");

  // Reset form when modal opens with new link
  useEffect(() => {
    if (link) {
      setTitle(link.title || "");
      setDescription(link.description || "");
      setCustomAlias(link.customAlias || "");
    }
  }, [link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    try {
      setLoading(true);

      await mockApi.links.update(link.id, {
        title: title || undefined,
        description: description || undefined,
        customAlias: customAlias || undefined,
      });

      toast({
        title: "Success",
        description: "Link updated successfully.",
      });

      onLinkUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!link) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Make changes to your shortened link here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Link"
              />
              <p className="text-xs text-muted-foreground">
                A memorable name for your link
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customAlias">Custom Alias</Label>
              <Input
                id="customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-link"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use generated code
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of this link"
              />
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Original URL: {link.originalUrl}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
