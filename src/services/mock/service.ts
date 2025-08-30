import type { Link, LinkClick, User } from "@/types";
import {
  mockUser,
  mockLinks as initialLinks,
  mockClicks as initialClicks,
} from "./data";

class MockDatabase {
  private links: Link[] = [...initialLinks];
  private clicks: LinkClick[] = [...initialClicks];
  private user: User = { ...mockUser };

  // Auth methods
  async me(): Promise<User> {
    return Promise.resolve(this.user);
  }

  // Links methods
  async listLinks(options?: LinkQueryOptions): Promise<Link[]> {
    let results = [...this.links];

    if (options?.where && Object.keys(options.where).length > 0) {
      results = results.filter((link) => {
        return Object.entries(options.where as Record<string, any>).every(
          ([key, value]) => {
            if (
              value &&
              typeof value === "object" &&
              "in" in value &&
              Array.isArray(value.in)
            ) {
              const fieldValue = link[key as keyof Link];
              return value.in.includes(fieldValue);
            }
            const fieldValue = link[key as keyof Link];
            return fieldValue === value;
          }
        );
      });
    }

    if (options?.orderBy && Object.keys(options.orderBy).length > 0) {
      const entries = Object.entries(options.orderBy);
      if (entries.length > 0) {
        const [field, direction] = entries[0];
        results.sort((a, b) => {
          const aVal = a[field as keyof Link];
          const bVal = b[field as keyof Link];
          if (aVal === undefined || bVal === undefined) return 0;
          const aStr = String(aVal);
          const bStr = String(bVal);
          return direction === "asc"
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
      }
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    return Promise.resolve(results);
  }

  async createLink(
    link: Omit<Link, "id" | "createdAt" | "updatedAt">
  ): Promise<Link> {
    const newLink: Link = {
      ...link,
      id: `link_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.links.push(newLink);
    return Promise.resolve(newLink);
  }

  async updateLink(id: string, data: Partial<Link>): Promise<Link> {
    const index = this.links.findIndex((link) => link.id === id);
    if (index === -1) throw new Error("Link not found");

    this.links[index] = {
      ...this.links[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(this.links[index]);
  }

  async deleteLink(id: string): Promise<void> {
    const index = this.links.findIndex((link) => link.id === id);
    if (index === -1) throw new Error("Link not found");
    this.links.splice(index, 1);
    return Promise.resolve();
  }

  // Clicks methods
  async listClicks(options?: LinkQueryOptions): Promise<LinkClick[]> {
    let results = [...this.clicks];

    if (options?.where && Object.keys(options.where).length > 0) {
      results = results.filter((click) => {
        return Object.entries(options.where as Record<string, any>).every(
          ([key, value]) => {
            if (
              value &&
              typeof value === "object" &&
              "in" in value &&
              Array.isArray(value.in)
            ) {
              const fieldValue = click[key as keyof LinkClick];
              return value.in.includes(fieldValue);
            }
            const fieldValue = click[key as keyof LinkClick];
            return fieldValue === value;
          }
        );
      });
    }

    if (options?.orderBy && Object.keys(options.orderBy).length > 0) {
      const entries = Object.entries(options.orderBy);
      if (entries.length > 0) {
        const [field, direction] = entries[0];
        results.sort((a, b) => {
          const aVal = a[field as keyof LinkClick];
          const bVal = b[field as keyof LinkClick];
          if (aVal === undefined || bVal === undefined) return 0;
          const aStr = String(aVal);
          const bStr = String(bVal);
          return direction === "asc"
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
      }
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    return Promise.resolve(results);
  }

  async createClick(
    click: Omit<LinkClick, "id" | "clickedAt">
  ): Promise<LinkClick> {
    const newClick: LinkClick = {
      ...click,
      id: `click_${Date.now()}`,
      clickedAt: new Date().toISOString(),
    };
    this.clicks.push(newClick);

    // Update link click count
    const link = this.links.find((l) => l.id === click.linkId);
    if (link) {
      link.clickCount++;
    }

    return Promise.resolve(newClick);
  }
}

// Create and export mock service instance
type WhereFilter =
  | {
      in?: any[];
    }
  | string
  | number
  | boolean
  | null;

type LinkQueryOptions = {
  where?: Record<string, WhereFilter>;
  orderBy?: Record<string, "asc" | "desc">;
  limit?: number;
};

const mockService = {
  auth: {
    me: () => new MockDatabase().me(),
  },
  db: {
    links: {
      list: (options?: LinkQueryOptions) =>
        new MockDatabase().listLinks(options),
      create: (data: Parameters<MockDatabase["createLink"]>[0]) =>
        new MockDatabase().createLink(data),
      update: (id: string, data: Partial<Link>) =>
        new MockDatabase().updateLink(id, data),
      delete: (id: string) => new MockDatabase().deleteLink(id),
    },
    linkClicks: {
      list: (options?: LinkQueryOptions) =>
        new MockDatabase().listClicks(options),
      create: (data: Parameters<MockDatabase["createClick"]>[0]) =>
        new MockDatabase().createClick(data),
    },
  },
};

export default mockService;
