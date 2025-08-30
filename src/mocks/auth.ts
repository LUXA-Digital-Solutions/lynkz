import { mockUser } from "./data";
import type { User } from "@/types";

// Mock auth events
const authSubscribers = new Set<
  (state: { user: User | null; isLoading: boolean }) => void
>();

export const mockAuth = {
  // Current user state
  currentUser: mockUser as User | null,
  isLoading: true,

  // Auth state change subscription
  onAuthStateChanged(
    callback: (state: { user: User | null; isLoading: boolean }) => void
  ) {
    authSubscribers.add(callback);
    // Initial call with current state
    callback({ user: this.currentUser, isLoading: this.isLoading });

    // Return unsubscribe function
    return () => {
      authSubscribers.delete(callback);
    };
  },

  // Login simulation
  async login(redirectUrl?: string) {
    this.isLoading = true;
    authSubscribers.forEach((callback) =>
      callback({ user: this.currentUser, isLoading: true })
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.currentUser = mockUser;
    this.isLoading = false;
    authSubscribers.forEach((callback) =>
      callback({ user: this.currentUser, isLoading: false })
    );
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },

  // Logout simulation
  async logout(redirectPath?: string) {
    this.isLoading = true;
    authSubscribers.forEach((callback) =>
      callback({ user: this.currentUser, isLoading: true })
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    this.currentUser = null;
    this.isLoading = false;
    authSubscribers.forEach((callback) =>
      callback({ user: null, isLoading: false })
    );

    if (redirectPath) {
      window.location.pathname = redirectPath;
    }
  },
};
