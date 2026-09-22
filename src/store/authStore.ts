export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

class AuthStore {
  private user: UserProfile | null = {
    id: 'user-001',
    name: 'Dr. Monish Warann',
    email: 'monish@aitimemachine.io',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Lead Digital Archaeologist'
  };
  private isAuthModalOpen = false;
  private listeners: (() => void)[] = [];

  public getUser(): UserProfile | null {
    return this.user;
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }

  public login(name: string, email: string) {
    this.user = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'Research Analyst'
    };
    this.isAuthModalOpen = false;
    this.notify();
  }

  public logout() {
    this.user = null;
    this.notify();
  }

  public openAuthModal() {
    this.isAuthModalOpen = true;
    this.notify();
  }

  public closeAuthModal() {
    this.isAuthModalOpen = false;
    this.notify();
  }

  public getIsModalOpen(): boolean {
    return this.isAuthModalOpen;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const authStore = new AuthStore();
