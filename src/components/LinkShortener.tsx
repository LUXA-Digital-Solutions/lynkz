import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Link2,
  Copy,
  QrCode,
  ChevronDown,
  Settings,
  Calendar,
  Lock,
  Zap,
} from "lucide-react";
import QRCode from "react-qr-code";
import blink from "@/blink/client";
import type { LinkFormData } from "@/types";

const linkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  customAlias: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

interface LinkShortenerProps {
  onLinkCreated?: (link: any) => void;
}

export function LinkShortener({ onLinkCreated }: LinkShortenerProps) {
  const [loading, setLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const watchedUrl = watch("originalUrl");

  const generateShortCode = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const onSubmit = async (data: LinkFormData) => {
    setLoading(true);
    try {
      const user = await blink.auth.me();

      const shortCode = data.customAlias || generateShortCode();
      const linkId = `link_${Date.now()}`;

      const newLink = {
        id: linkId,
        userId: user.id,
        originalUrl: data.originalUrl,
        shortCode,
        customAlias: data.customAlias,
        title: data.title,
        description: data.description,
        clickCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await blink.db.links.create(newLink);

      const fullShortUrl = `${window.location.origin}/${shortCode}`;
      setShortenedLink(fullShortUrl);

      toast({
        title: "Link shortened successfully!",
        description: "Your short link is ready to use.",
      });

      onLinkCreated?.(newLink);
      reset();
    } catch (error: any) {
      console.error("Error creating short link:", error);
      toast({
        title: "Error creating link",
        description: error.message || "Something went wrong. Please try again.",
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          Shorten Your Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Long URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very-long-url"
              {...register("originalUrl")}
              className={errors.originalUrl ? "border-destructive" : ""}
            />
            {errors.originalUrl && (
              <p className="text-sm text-destructive">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 p-0">
                <Settings className="h-4 w-4" />
                Advanced Options
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customAlias">Custom Alias (Optional)</Label>
                  <Input
                    id="customAlias"
                    placeholder="my-custom-link"
                    {...register("customAlias")}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for auto-generated code
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    placeholder="My Awesome Link"
                    {...register("title")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="A brief description of this link"
                  {...register("description")}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? (
              <>
                <Zap className="h-4 w-4 animate-pulse" />
                Shortening...
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Shorten Link
              </>
            )}
          </Button>
        </form>

        {shortenedLink && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Your shortened link:
                    </p>
                    <p className="font-mono text-sm break-all">
                      {shortenedLink}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(shortenedLink)}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setQrCodeVisible(!qrCodeVisible)}
                  className="gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  {qrCodeVisible ? "Hide" : "Show"} QR Code
                </Button>
              </div>

              {qrCodeVisible && (
                <div className="flex justify-center p-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <QRCode value={shortenedLink} size={180} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
