import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from "react-qr-code";
import { Download, Link2 } from "lucide-react";
import { useState } from "react";

interface QRCodeModalProps {
  url: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeModal({ url, open, onOpenChange }: QRCodeModalProps) {
  const [size, setSize] = useState<string>("medium");

  const qrSize =
    {
      small: 128,
      medium: 256,
      large: 512,
    }[size] || 256; // Default to medium size if size is invalid

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!url) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Download or share this QR code for easy access to your link.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            id="qr-code"
            className="flex justify-center p-4 bg-white rounded-lg"
          >
            <QRCode
              value={url}
              size={qrSize}
              level="H"
              className="dark:bg-white dark:p-2 rounded"
            />
          </div>

          <div className="text-sm text-muted-foreground break-all">
            <Link2 className="inline h-4 w-4 mr-1" />
            {url}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
          <Button onClick={downloadQRCode} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
