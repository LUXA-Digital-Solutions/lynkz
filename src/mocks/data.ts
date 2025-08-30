// Mock user data
export const mockUser = {
  id: "user_1",
  email: "test@example.com",
  displayName: "Test User",
  avatar: "https://ui-avatars.com/api/?name=Test+User",
};

// Mock links data
export const mockLinks = [
  {
    id: "link_1",
    userId: "user_1",
    originalUrl: "https://www.example.com/very/long/url/1",
    shortCode: "abc123",
    title: "Example Link 1",
    description: "My first shortened link",
    clickCount: 145,
    isActive: true,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "link_2",
    userId: "user_1",
    originalUrl: "https://www.example.com/another/long/url/2",
    shortCode: "xyz789",
    title: "Example Link 2",
    description: "My second shortened link",
    clickCount: 89,
    isActive: true,
    createdAt: "2025-08-20T15:30:00Z",
    updatedAt: "2025-08-20T15:30:00Z",
  },
  {
    id: "link_3",
    userId: "user_1",
    originalUrl: "https://www.example.com/test/url/3",
    shortCode: "def456",
    title: "Example Link 3",
    clickCount: 267,
    isActive: false,
    createdAt: "2025-08-25T09:15:00Z",
    updatedAt: "2025-08-25T09:15:00Z",
  },
];

// Mock click data
export const mockClicks = [
  {
    id: "click_1",
    linkId: "link_1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ipAddress: "192.168.1.1",
    referrer: "https://google.com",
    country: "United States",
    city: "New York",
    deviceType: "Desktop",
    browser: "Chrome",
    clickedAt: "2025-08-30T10:15:00Z",
  },
  {
    id: "click_2",
    linkId: "link_1",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)",
    ipAddress: "192.168.1.2",
    referrer: "https://twitter.com",
    country: "United Kingdom",
    city: "London",
    deviceType: "Mobile",
    browser: "Safari",
    clickedAt: "2025-08-30T09:45:00Z",
  },
  {
    id: "click_3",
    linkId: "link_2",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 14_0)",
    ipAddress: "192.168.1.3",
    referrer: "https://facebook.com",
    country: "Canada",
    city: "Toronto",
    deviceType: "Tablet",
    browser: "Safari",
    clickedAt: "2025-08-30T09:30:00Z",
  },
  // Add more mock clicks as needed
];
