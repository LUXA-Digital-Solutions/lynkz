import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUser } from "@/mocks/data";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function Settings() {
  const [profileImage, setProfileImage] = useState<string | null>(
    mockUser.avatar
  );

  console.log(setProfileImage);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "link-clicks",
      title: "Link Clicks",
      description: "Get notified when someone clicks your links",
      enabled: true,
    },
    {
      id: "new-features",
      title: "New Features",
      description: "Get notified about new features and updates",
      enabled: true,
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Receive our monthly newsletter with tips and updates",
      enabled: false,
    },
  ]);

  const handleNotificationToggle = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback>
                    {mockUser.displayName?.charAt(0) ||
                      mockUser.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={() => {
                    // In a real app, this would open a file picker
                    alert(
                      "This feature would open a file picker to change your avatar"
                    );
                  }}
                >
                  Change Avatar
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={mockUser.displayName || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={mockUser.email}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" />
              </div>
              <Button
                onClick={() => {
                  alert(
                    "This feature would update your password in a real app"
                  );
                }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    alert("Your account would be deleted in a real app");
                  }
                }}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={() =>
                      handleNotificationToggle(notification.id)
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Display</CardTitle>
              <CardDescription>
                Customize how Lynkz looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card
                    className="p-4 cursor-pointer border-2 border-primary"
                    onClick={() =>
                      alert(
                        "Theme would be set to Default Purple in a real app"
                      )
                    }
                  >
                    <div className="space-y-2">
                      <div className="rounded-md bg-primary h-10" />
                      <p className="text-sm font-medium">Default Purple</p>
                    </div>
                  </Card>
                  <Card
                    className="p-4 cursor-pointer"
                    onClick={() =>
                      alert("Theme would be set to Ocean Blue in a real app")
                    }
                  >
                    <div className="space-y-2">
                      <div className="rounded-md bg-blue-500 h-10" />
                      <p className="text-sm font-medium">Ocean Blue</p>
                    </div>
                  </Card>
                  <Card
                    className="p-4 cursor-pointer"
                    onClick={() =>
                      alert("Theme would be set to Forest Green in a real app")
                    }
                  >
                    <div className="space-y-2">
                      <div className="rounded-md bg-green-500 h-10" />
                      <p className="text-sm font-medium">Forest Green</p>
                    </div>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Reduced Motion</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduce animations and transitions
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">High Contrast</h4>
                    <p className="text-sm text-muted-foreground">
                      Increase color contrast
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
