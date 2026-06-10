import express, { Request, Response, Router } from "express";
import { db } from "./db";
import { GoogleGenAI } from "@google/genai";
import { Item, User } from "../src/types";
import { supabaseClient as supabase } from "./supabase";

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

apiRouter.post("/user/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (email) {
    try {
      // Cari user di Supabase
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error("Error mencari user di Supabase:", error.message);
      }

      if (existingUser) {
        db.setUser(existingUser);
        return res.json({ success: true, user: existingUser });
      } else {
        // Buat user baru secara dinamis agar mahasiswa UNSOED langsung bisa testing
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

        const { error: insertError } = await supabase.from('users').insert(newUser);
        if (insertError) {
          console.error("Gagal mendaftarkan user baru di Supabase:", insertError.message);
        }

        db.setUser(newUser);
        return res.json({ success: true, user: newUser });
      }
    } catch (err) {
      console.error("Error otentikasi login:", err);
    }
  }

  // Fallback ke user pertama di database lokal jika email kosong
  const fallbackUser = db.getUsers()[0];
  db.setUser(fallbackUser);
  res.json({ success: true, user: fallbackUser });
});

apiRouter.post("/user/logout", (req: Request, res: Response) => {
  db.setUser(null);
  res.json({ success: true });
});

apiRouter.post("/user/register", async (req: Request, res: Response) => {
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

  const { error } = await supabase.from('users').insert(newUser);
  if (error) {
    console.error("Gagal registrasi user baru di Supabase:", error.message);
  }

  db.setUser(newUser);
  res.json({ success: true, user: newUser });
});

// Items & Marketplace APIS
apiRouter.get("/items", async (req: Request, res: Response) => {
  try {
    const { data: items, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ items });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/items/:id", async (req: Request, res: Response) => {
  try {
    const { data: item, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (item) {
      res.json({ item });
    } else {
      res.status(404).json({ error: "Item tidak ditemukan" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post("/items", async (req: Request, res: Response) => {
  const { name, category, price, condition, image, description } = req.body;
  const curUser = db.getUser();
  const newItem = {
    id: `item-${Date.now()}`,
    name,
    category,
    condition,
    price: Number(price) || 10000,
    status: 'Tersedia',
    location: curUser?.campus || "Universitas Jenderal Soedirman",
    distance: 0.1,
    ownerId: curUser?.id || "aldirio-101",
    ownerName: curUser?.name || "Aldi Prabowo",
    ownerPfp: curUser?.pfp || '',
    ownerRating: 5.0,
    image: image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKbzfIHjDpLs6xZULntGzV5_tteCNCy-9uIcQnYda2f3JCK_1JhVkHf6fkXdPzQbxcxZa-nbyxduNeLumL1AX5u65ny1chHmp_4fhKOr6gn5zkJbq1pk7-1-oisJ6OyTBwHfVOyg-GKIK4IykaDnIMOL_keqnf041wnESWMmFe4p5WAlnW8hVWC3-VVnYJxAh44thdZMOOlO6XG0eafLCX92VovYsYWjQ-TlTDzG2LriCDxW-tMnWTrjpsB17Pgek9DRbeAbNOiw",
    description: description || `Barang sewaan istimewa milik ${curUser?.name || "Aldi Prabowo"}. Kondisi ${condition} terawat secara personal oleh pemilik. Sangat cocok disewa harian mahasiswa untuk pengerjaan tugas praktek.`,
    views: 0,
    rentCount: 0
  };

  const { error: itemError } = await supabase.from('items').insert(newItem);
  if (itemError) {
    return res.status(500).json({ error: itemError.message });
  }

  // Catat ke log aktivitas
  const newActivity = {
    id: `act-${Date.now()}`,
    userName: (curUser?.name || "Aldi").split(' ')[0],
    action: 'sewakan',
    itemName: name,
    timeAgo: 'Baru saja',
    userPfp: curUser?.pfp || ''
  };
  await supabase.from('activities').insert(newActivity);

  res.json({ success: true, item: newItem });
});

// Borrow Bookings / Rentals APIS
apiRouter.post("/borrow", async (req: Request, res: Response) => {
  const { itemId, days, startDate, endDate } = req.body;
  const curUser = db.getUser();

  try {
    const { data: item, error: fetchError } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId)
      .maybeSingle();

    if (fetchError || !item) {
      return res.status(404).json({ error: "Barang tidak ditemukan" });
    }

    // Ubah status barang di database
    const { error: updateError } = await supabase
      .from('items')
      .update({ status: 'Sedang Dipinjam' })
      .eq('id', itemId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    const newRental = {
      id: `rental-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      price: item.price * (Number(days) || 1),
      startDate,
      endDate,
      status: 'Berlangsung'
    };

    const { error: rentalError } = await supabase.from('rentals').insert(newRental);
    if (rentalError) {
      return res.status(500).json({ error: rentalError.message });
    }

    // Catat ke log aktivitas
    const newActivity = {
      id: `act-${Date.now()}`,
      userName: (curUser?.name || 'Tamu').split(' ')[0],
      action: 'pinjam',
      itemName: item.name,
      timeAgo: 'Baru saja',
      userPfp: curUser?.pfp || ''
    };
    await supabase.from('activities').insert(newActivity);

    res.json({ success: true, rental: newRental });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/rentals", async (req: Request, res: Response) => {
  try {
    const { data: rentals, error } = await supabase
      .from('rentals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ rentals });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Owner Approvals / Request APIS
apiRouter.get("/requests", async (req: Request, res: Response) => {
  try {
    const { data: requests, error } = await supabase
      .from('rent_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ requests });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post("/requests/:id", async (req: Request, res: Response) => {
  const { action } = req.body; // 'Diterima' | 'Ditolak'

  try {
    const { data: request, error: fetchError } = await supabase
      .from('rent_requests')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();

    if (fetchError || !request) {
      return res.status(404).json({ error: "Rent request tidak ditemukan" });
    }

    const { error: updateReqError } = await supabase
      .from('rent_requests')
      .update({ status: action })
      .eq('id', req.params.id);

    if (updateReqError) {
      return res.status(500).json({ error: updateReqError.message });
    }

    if (action === 'Diterima') {
      // Ambil rent count barang saat ini
      const { data: item } = await supabase
        .from('items')
        .select('rentCount')
        .eq('id', request.itemId)
        .maybeSingle();
      
      const currentRentCount = item?.rentCount || 0;

      // Update status & rent count barang
      await supabase
        .from('items')
        .update({ status: 'Sedang Dipinjam', rentCount: currentRentCount + 1 })
        .eq('id', request.itemId);

      // Catat ke log aktivitas
      const newActivity = {
        id: `act-${Date.now()}`,
        userName: request.requesterName.split(' ')[0],
        action: 'pinjam',
        itemName: request.itemName,
        timeAgo: 'Sedang berlangsung',
        userPfp: request.requesterPfp
      };
      await supabase.from('activities').insert(newActivity);
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Reviews API
apiRouter.post("/rentals/:id/review", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('rentals')
      .update({ hasReviewed: true })
      .eq('id', req.params.id);

    if (error) {
      return res.status(404).json({ error: "Rental tidak ditemukan" });
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/lander-items", async (req: Request, res: Response) => {
  try {
    const { data: items, error } = await supabase
      .from('items')
      .select('id, name, views, rentCount, price, status, image')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const landerItems = items.map(item => ({
      id: item.id,
      name: item.name,
      views: item.views,
      rentCount: item.rentCount,
      pricePerDay: item.price,
      status: item.status,
      image: item.image
    }));

    res.json({ landerItems });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/activities", async (req: Request, res: Response) => {
  try {
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ activities });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
