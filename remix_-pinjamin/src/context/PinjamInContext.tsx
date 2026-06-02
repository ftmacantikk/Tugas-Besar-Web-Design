import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  User, Item, Rental, RentRequest, RecentActivity, LanderItem,
  INITIAL_ITEMS, INITIAL_RENTALS, INITIAL_ACTIVITIES, INITIAL_REQUESTS, INITIAL_LANDER_ITEMS,
  ItemCategory, ItemCondition
} from '../types';

export type ScreenType = 'landing' | 'register' | 'browse' | 'borrower-dashboard' | 'lender-dashboard' | 'item-detail';

interface PinjamInContextType {
  user: User | null;
  activeScreen: ScreenType;
  items: Item[];
  rentals: Rental[];
  requests: RentRequest[];
  landerItems: LanderItem[];
  wishlist: string[]; // item ids
  activities: RecentActivity[];
  selectedItem: Item | null;
  
  // Navigation
  navigateTo: (screen: ScreenType, arg?: any) => void;
  
  // Actions
  loginDemoUser: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (userData: Partial<User>) => void;
  toggleWishlist: (itemId: string) => void;
  addLanderItem: (name: string, category: ItemCategory, price: number, condition: ItemCondition, image: string, description?: string) => void;
  borrowItem: (itemId: string, days: number, startDate: string, endDate: string) => void;
  handleRentRequest: (requestId: string, action: 'Diterima' | 'Ditolak') => void;
  addReview: (rentalId: string, comment: string, rating: number) => void;
  askAssistant: (message: string) => Promise<string>;
  refreshAllData: () => void;
}

const PinjamInContext = createContext<PinjamInContextType | undefined>(undefined);

const SEED_USER: User = {
  id: "student-101",
  name: "Aldi Trio Prabowo",
  email: "aldirio@mhs.unsoed.ac.id",
  campus: "Universitas Jenderal Soedirman",
  nim: "H1D021045",
  faculty: "Fakultas Teknik",
  department: "Teknik Informatika",
  pfp: "https://avatar.iran.liara.run/public/40",
  phone: "082134567890",
  role: "keduanya",
  isActiveLenderPro: true
};

export const PinjamInProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenType>('landing');
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [rentals, setRentals] = useState<Rental[]>(INITIAL_RENTALS);
  const [requests, setRequests] = useState<RentRequest[]>(INITIAL_REQUESTS);
  const [landerItems, setLanderItems] = useState<LanderItem[]>(INITIAL_LANDER_ITEMS);
  const [wishlist, setWishlist] = useState<string[]>(["item-1", "item-3"]); // initial demo wishlist items
  const [activities, setActivities] = useState<RecentActivity[]>(INITIAL_ACTIVITIES);
  const [selectedItem, setSelectedItem] = useState<Item | null>(INITIAL_ITEMS[3]); // default Camera details

  // Fetch live state from backend
  const refreshAllData = async () => {
    try {
      const resItems = await fetch('/api/items');
      if (resItems.ok) {
        const data = await resItems.json();
        setItems(data.items);
      }
      const resUser = await fetch('/api/user');
      if (resUser.ok) {
        const data = await resUser.json();
        setUser(data.user);
      }
      const resRentals = await fetch('/api/rentals');
      if (resRentals.ok) {
        const data = await resRentals.json();
        setRentals(data.rentals);
      }
      const resRequests = await fetch('/api/requests');
      if (resRequests.ok) {
        const data = await resRequests.json();
        setRequests(data.requests);
      }
      const resLander = await fetch('/api/lander-items');
      if (resLander.ok) {
        const data = await resLander.json();
        setLanderItems(data.landerItems);
      }
      const resActs = await fetch('/api/activities');
      if (resActs.ok) {
        const data = await resActs.json();
        setActivities(data.activities);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi backend:", err);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const navigateTo = (screen: ScreenType, arg?: any) => {
    setActiveScreen(screen);
    if (screen === 'item-detail' && arg) {
      setSelectedItem(arg);
    }
  };

  const loginDemoUser = async (email?: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/user/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const d = await res.json();
        setUser(d.user);
        await refreshAllData();
        setActiveScreen('browse');
        return true;
      }
      return false;
    } catch (e) {
      setUser({
        ...SEED_USER,
        email: email || SEED_USER.email,
        name: email ? email.split('@')[0].toUpperCase() : SEED_USER.name
      });
      setActiveScreen('browse');
      return true;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/user/logout', { method: 'POST' });
    } catch (e) {}
    setUser(null);
    setActiveScreen('landing');
  };

  const registerUser = async (userData: Partial<User>) => {
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const d = await res.json();
        setUser(d.user);
        await refreshAllData();
        setActiveScreen('browse');
      }
    } catch (e) {
      console.error(e);
      setActiveScreen('browse');
    }
  };

  const toggleWishlist = (itemId: string) => {
    setWishlist(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const addLanderItem = async (
    name: string, 
    category: ItemCategory, 
    price: number, 
    condition: ItemCondition, 
    image: string,
    description?: string
  ) => {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, price, condition, image, description })
      });
      if (res.ok) {
        await refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const borrowItem = async (itemId: string, days: number, startDate: string, endDate: string) => {
    try {
      const res = await fetch('/api/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, days, startDate, endDate })
      });
      if (res.ok) {
        await refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRentRequest = async (requestId: string, action: 'Diterima' | 'Ditolak') => {
    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        await refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addReview = async (rentalId: string, comment: string, rating: number) => {
    try {
      const res = await fetch(`/api/rentals/${rentalId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, rating })
      });
      if (res.ok) {
        await refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const askAssistant = async (message: string): Promise<string> => {
    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          contextItems: items.slice(0, 5).map(it => ({
            name: it.name,
            category: it.category,
            price: it.price,
            condition: it.condition,
            location: it.location
          }))
        })
      });
      if (res.ok) {
        const d = await res.json();
        return d.reply;
      }
      return "Mohon maaf Sobat PinjamIn, server asisten sedang sibuk melakukan verifikasi KRS. Silahkan coba lagi nanti!";
    } catch (err) {
      console.error(err);
      return "Sobat PinjamIn, koneksi ke asisten AI terputus. Silakan coba kembali beberapa saat lagi.";
    }
  };

  return (
    <PinjamInContext.Provider value={{
      user, activeScreen, items, rentals, requests, landerItems, wishlist, activities, selectedItem,
      navigateTo, loginDemoUser, logout, registerUser, toggleWishlist, addLanderItem, borrowItem, handleRentRequest, addReview, askAssistant, refreshAllData
    }}>
      {children}
    </PinjamInContext.Provider>
  );
};

export const usePinjamIn = () => {
  const context = useContext(PinjamInContext);
  if (!context) {
    throw new Error('usePinjamIn must be used within a PinjamInProvider');
  }
  return context;
};
