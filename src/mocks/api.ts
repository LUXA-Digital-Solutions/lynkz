import { mockUser } from "./data";
import { store } from "./store";
import type { Link, LinkClick, User } from "@/types";

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Auth methods
  auth: {
    async me(): Promise<User> {
      await delay(100); // Simulate network delay
      return mockUser;
    },
  },

  // Links methods
  links: {
    async list(filters: { userId?: string } = {}): Promise<Link[]> {
      await delay(100);
      return store
        .getLinks()
        .filter(
          (link: Link) => !filters.userId || link.userId === filters.userId
        );
    },

    async create(data: Partial<Link>): Promise<Link> {
      await delay(100);
      const newLink: Link = {
        id: `link_${Date.now()}`,
        userId: mockUser.id,
        originalUrl: data.originalUrl!,
        shortCode: data.shortCode!,
        title: data.title,
        description: data.description,
        clickCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      store.addLink(newLink);
      return newLink;
    },

    async update(id: string, data: Partial<Link>): Promise<Link> {
      await delay(100);
      const link = store.getLinks().find((l: Link) => l.id === id);
      if (!link) throw new Error("Link not found");

      store.updateLink(id, {
        ...data,
        updatedAt: new Date().toISOString(),
      });

      return link;
    },

    async delete(id: string): Promise<void> {
      await delay(100);
      store.deleteLink(id);
    },
  },

  // Clicks methods
  clicks: {
    async list(
      filters: { linkId?: string | string[] } = {}
    ): Promise<LinkClick[]> {
      await delay(100);
      return store.getClicks().filter((click: LinkClick) => {
        if (!filters.linkId) return true;
        if (Array.isArray(filters.linkId)) {
          return filters.linkId.includes(click.linkId);
        }
        return click.linkId === filters.linkId;
      });
    },

    async create(linkId: string): Promise<LinkClick> {
      await delay(100);
      const newClick: LinkClick = {
        id: `click_${Date.now()}`,
        linkId,
        userAgent: navigator.userAgent,
        country: "Unknown",
        city: "Unknown",
        deviceType: "Unknown",
        browser: "Unknown",
        clickedAt: new Date().toISOString(),
      };
      store.addClick(newClick);

      return newClick;
    },
  },
};
