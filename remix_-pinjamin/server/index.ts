import express, { Request, Response, Router } from "express";
import { db } from "./db";
import { GoogleGenAI } from "@google/genai";
import { Item, User } from "../src/types";

export const apiRouter = Router();

// Lazy initialization of Gemini client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// User Profile APIS
apiRouter.get("/user", (req: Request, res: Response) => {
  res.json({ user: db.getUser() });
});

apiRouter.post("/user/login", (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (email) {
    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      db.setUser(existingUser);
      return res.json({ success: true, user: existingUser });
    } else {
      // Create on-the-fly dynamically so any valid UNSOED email works instantly for testing
      const nameParts = email.split('@')[0].split(/[._-]/);
      const capitalizedName = nameParts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: capitalizedName || "Mahasiswa UNSOED Uji",
        email: email,
        campus: "Universitas Jenderal Soedirman",
        nim: "H1D02" + Math.floor(100 + Math.random() * 900),
        faculty: "Fakultas Teknik",
        department: "Teknik Informatika",
        phone: "08" + Math.floor(100000000 + Math.random() * 900000000),
        role: "keduanya" as const,
        pfp: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50) + 1}`,
        isActiveLenderPro: true
      };
      db.registerNewUser(newUser);
      db.setUser(newUser);
      return res.json({ success: true, user: newUser });
    }
  }

  // Fallback if no email is supplied
  const fallbackUser = db.getUsers()[0];
  db.setUser(fallbackUser);
  res.json({ success: true, user: fallbackUser });
});

apiRouter.post("/user/logout", (req: Request, res: Response) => {
  db.setUser(null);
  res.json({ success: true });
});

apiRouter.post("/user/register", (req: Request, res: Response) => {
  const userData = req.body;
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: userData.name || "Siswa UNSOED",
    email: userData.email || "email@unsoed.ac.id",
    campus: userData.campus || "Universitas Jenderal Soedirman",
    nim: userData.nim || "H1D021002",
    faculty: userData.faculty || "Fakultas Teknik",
    department: userData.department || "Teknik Informatika",
    phone: userData.phone || "08XXXXXXXX",
    role: userData.role || 'keduanya',
    pfp: userData.pfp || `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50) + 1}`,
    isActiveLenderPro: true
  };
  db.registerNewUser(newUser);
  db.setUser(newUser);
  res.json({ success: true, user: newUser });
});

// Items & Marketplace APIS
apiRouter.get("/items", (req: Request, res: Response) => {
  res.json({ items: db.getItems() });
});

apiRouter.get("/items/:id", (req: Request, res: Response) => {
  const item = db.getItems().find(i => i.id === req.params.id);
  if (item) {
    res.json({ item });
  } else {
    res.status(404).json({ error: "Item tidak ditemukan" });
  }
});

apiRouter.post("/items", (req: Request, res: Response) => {
  const { name, category, price, condition, image, description } = req.body;
  const curUser = db.getUser();
  const newItem: Item = {
    id: `item-${Date.now()}`,
    name,
    category,
    condition,
    price: Number(price) || 10000,
    status: 'Tersedia',
    location: curUser?.campus || "Universitas Indonesia",
    distance: 0.1,
    ownerId: curUser?.id || "demo-owner",
    ownerName: curUser?.name || "Rizky Pratama",
    ownerPfp: curUser?.pfp || '',
    ownerRating: 5.0,
    image: image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKbzfIHj...",
    description: description || `Barang sewaan istimewa milik ${curUser?.name}. Kondisi ${condition} terawat secara personal oleh pemilik. Sangat cocok disewa harian mahasiswa untuk pengerjaan tugas praktek.`,
    views: 0,
    rentCount: 0
  };

  db.addItem(newItem);
  res.json({ success: true, item: newItem });
});

// Borrow Bookings / Rentals APIS
apiRouter.post("/borrow", (req: Request, res: Response) => {
  const { itemId, days, startDate, endDate } = req.body;
  const rental = db.borrowItem(itemId, Number(days) || 1, startDate, endDate);
  if (rental) {
    res.json({ success: true, rental });
  } else {
    res.status(404).json({ error: "Gagal meminjam barang" });
  }
});

apiRouter.get("/rentals", (req: Request, res: Response) => {
  res.json({ rentals: db.getRentals() });
});

// Owner Approvals / Request APIS
apiRouter.get("/requests", (req: Request, res: Response) => {
  res.json({ requests: db.getRequests() });
});

apiRouter.post("/requests/:id", (req: Request, res: Response) => {
  const { action } = req.body; // 'Diterima' | 'Ditolak'
  const success = db.handleRequest(req.params.id, action);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Rent request tidak ditemukan" });
  }
});

// Reviews API
apiRouter.post("/rentals/:id/review", (req: Request, res: Response) => {
  const { comment, rating } = req.body;
  const success = db.addReview(req.params.id, comment, Number(rating));
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Rental tidak ditemukan" });
  }
});

apiRouter.get("/lander-items", (req: Request, res: Response) => {
  res.json({ landerItems: db.getLanderItems() });
});

apiRouter.get("/activities", (req: Request, res: Response) => {
  res.json({ activities: db.getActivities() });
});

// AI Assistant Chatbot (using Gemini SDK)
apiRouter.post("/assistant/chat", async (req: Request, res: Response) => {
  const { message, contextItems } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  try {
    const api = getAiClient();
    const itemsContext = contextItems
      ? `Berikut ini beberapa barang yang tersedia saat ini untuk disewa:\n${JSON.stringify(contextItems, null, 2)}`
      : "";

    const userInstructions = `
      Anda adalah AI PinjamIn, asisten robot cerdas, bersahabat, dan profesional dari PinjamIn Indonesia.
      Tugas utama Anda adalah membantu mahasiswa/i Indonesia mencari barang sewaan yang tepat untuk menunjang perkuliahan mereka,
      memberikan kalkulasi harga sewa yang adil (pricing advisor), meningkatkan/mengoptimalkan deskripsi barang sewaan agar lebih menarik, 
      atau menjawab pertanyaan seputar ekonomi sirkular kampus secara positif.

      Gaya komunikasi:
      - Sangat ramah, bersahabat, menggunakan sebutan "Sobat PinjamIn" atau gaya bahasa mahasiswa yang hangat dan sopan.
      - Berikan respons singkat, padat, ramah, dan solutif.
      - Gunakan format markdown yang rapi, bold teks penting, list jika perlu.
      - Selalu jawab menggunakan Bahasa Indonesia.

      ${itemsContext}
    `;

    const response = await api.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: userInstructions,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Halo Sobat PinjamIn, maaf saya tidak sempat memproses pesan Anda dengan benar. Coba tanyakan lagi ya!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({ 
      reply: "Maaf Sobat PinjamIn, saat ini AI sedang memproses peminjaman sewa yang padat. Silakan hubungi kami beberapa saat lagi! (Pastikan kunci API Gemini sudah dikonfigurasi perkasa di panel Secrets ya)."
    });
  }
});
