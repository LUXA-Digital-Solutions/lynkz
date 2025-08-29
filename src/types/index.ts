export interface Link {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  title?: string;
  description?: string;
  clickCount: number;
  isActive: boolean;
  expiresAt?: string;
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinkClick {
  id: string;
  linkId: string;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  clickedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
}

export interface LinkFormData {
  originalUrl: string;
  customAlias?: string;
  title?: string;
  description?: string;
  expiresAt?: Date;
  password?: string;
}

export interface AnalyticsData {
  totalLinks: number;
  totalClicks: number;
  clickRate: number;
  topLinks: Link[];
  recentClicks: LinkClick[];
  clicksByDate: { date: string; clicks: number }[];
  clicksByCountry: { country: string; clicks: number }[];
  clicksByDevice: { device: string; clicks: number }[];
  clicksByReferrer: { referrer: string; clicks: number }[];
}
