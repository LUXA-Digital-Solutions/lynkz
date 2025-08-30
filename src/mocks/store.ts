import type { Link, LinkClick } from "@/types";

// In-memory store for mock data
export class Store {
  private links: Link[] = [];
  private clicks: LinkClick[] = [];

  // Link operations
  getLinks(): Link[] {
    return [...this.links];
  }

  addLink(link: Link): void {
    this.links.push(link);
  }

  updateLink(id: string, data: Partial<Link>): void {
    const index = this.links.findIndex((l) => l.id === id);
    if (index > -1) {
      this.links[index] = { ...this.links[index], ...data };
    }
  }

  deleteLink(id: string): void {
    const index = this.links.findIndex((l) => l.id === id);
    if (index > -1) {
      this.links.splice(index, 1);
    }
  }

  // Click operations
  getClicks(): LinkClick[] {
    return [...this.clicks];
  }

  addClick(click: LinkClick): void {
    this.clicks.push(click);
    // Update link click count
    const link = this.links.find((l) => l.id === click.linkId);
    if (link) {
      link.clickCount++;
    }
  }
}

// Singleton store instance
export const store = new Store();
