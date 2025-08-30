import type { Link, LinkClick, User } from "@/types";

// Mock user
export const mockUser: User = {
  id: "user_1",
  email: "demo@example.com",
  displayName: "Demo User",
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=demo",
};

// Mock links
export const mockLinks: Link[] = [
  {
    id: "link_1",
    userId: mockUser.id,
    originalUrl: "https://example.com/very-long-url-1",
    shortCode: "abc123",
    title: "Example Link 1",
    description: "First example link",
    clickCount: 150,
    isActive: true,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "link_2",
    userId: mockUser.id,
    originalUrl: "https://example.com/very-long-url-2",
    shortCode: "def456",
    title: "Example Link 2",
    clickCount: 75,
    isActive: true,
    createdAt: "2025-08-20T15:30:00Z",
    updatedAt: "2025-08-20T15:30:00Z",
  },
  {
    id: "link_3",
    userId: mockUser.id,
    originalUrl: "https://example.com/very-long-url-3",
    shortCode: "ghi789",
    customAlias: "custom-link",
    title: "Example Link 3",
    description: "Third example link",
    clickCount: 200,
    isActive: false,
    createdAt: "2025-08-25T09:15:00Z",
    updatedAt: "2025-08-25T09:15:00Z",
  },
];

// Mock clicks
export const mockClicks: LinkClick[] = [
  {
    id: "click_1",
    linkId: "link_1",
    userAgent: "Mozilla/5.0",
    country: "United States",
    city: "New York",
    deviceType: "Desktop",
    browser: "Chrome",
    referrer: "https://google.com",
    clickedAt: "2025-08-30T09:00:00Z",
  },
  {
    id: "click_2",
    linkId: "link_1",
    userAgent: "Mozilla/5.0",
    country: "United Kingdom",
    city: "London",
    deviceType: "Mobile",
    browser: "Safari",
    referrer: "https://twitter.com",
    clickedAt: "2025-08-30T08:30:00Z",
  },
  {
    id: "click_3",
    linkId: "link_2",
    userAgent: "Mozilla/5.0",
    country: "Canada",
    city: "Toronto",
    deviceType: "Tablet",
    browser: "Firefox",
    referrer: "https://facebook.com",
    clickedAt: "2025-08-30T08:00:00Z",
  },
];
