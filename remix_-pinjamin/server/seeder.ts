import { supabaseClient as supabase } from './supabase';
import { db } from './db';

const SEED_USERS = [
  {
    id: "aldirio-101",
    name: "Aldi Prabowo",
    email: "aldirio@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    faculty: "Fakultas Teknik",
    department: "Teknik Informatika",
    nim: "H1D021002",
    phone: "081395874122",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/5",
    isActiveLenderPro: true
  },
  {
    id: "arief-102",
    name: "Arief Rachman Soedirman",
    email: "arief.rachman@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    faculty: "Fakultas Teknik",
    department: "Teknik Informatika",
    nim: "H1D021003",
    phone: "081395874123",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/12",
    isActiveLenderPro: true
  },
  {
    id: "owner-adi",
    name: "Aris Adi Saputra",
    email: "adi@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/15",
    isActiveLenderPro: true
  },
  {
    id: "owner-rina",
    name: "Rina Soedirman",
    email: "rina@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/44",
    isActiveLenderPro: true
  },
  {
    id: "owner-budi",
    name: "Budi Purwokerto",
    email: "budi@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/23",
    isActiveLenderPro: true
  },
  {
    id: "owner-arif",
    name: "Arif Purbalingga",
    email: "arif@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/12",
    isActiveLenderPro: true
  },
  {
    id: "owner-budi-s",
    name: "Budi Santoso",
    email: "budis@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/25",
    isActiveLenderPro: true
  },
  {
    id: "owner-sari",
    name: "Sari Handayani",
    email: "sari@mhs.unsoed.ac.id",
    campus: "Universitas Jenderal Soedirman",
    role: "keduanya",
    pfp: "https://avatar.iran.liara.run/public/47",
    isActiveLenderPro: true
  }
];

export async function seedDatabase() {
  console.log('Memulai pengecekan dan seeding database Supabase...');

  try {
    // 1. Seed Users
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (usersError) {
      console.error('Error saat cek tabel users:', usersError.message);
    } else if (!usersData || usersData.length === 0) {
      console.log('Tabel users kosong. Melakukan seeding data users...');
      const { error: seedUsersError } = await supabase
        .from('users')
        .insert(SEED_USERS);
      
      if (seedUsersError) {
        console.error('Gagal melakukan seeding users:', seedUsersError.message);
      } else {
        console.log('Sukses melakukan seeding data users.');
      }
    } else {
      console.log('Tabel users sudah terisi, melewati seeding.');
    }

    // 2. Seed Items
    const { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('id')
      .limit(1);

    if (itemsError) {
      console.error('Error saat cek tabel items:', itemsError.message);
    } else if (!itemsData || itemsData.length === 0) {
      console.log('Tabel items kosong. Melakukan seeding data items...');
      const seedItems = db.getItems();
      
      // Petakan agar tipe data sesuai dengan kolom database
      const formattedItems = seedItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        condition: item.condition,
        price: item.price,
        status: item.status,
        location: item.location,
        distance: item.distance,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        ownerPfp: item.ownerPfp,
        ownerRating: item.ownerRating,
        image: item.image,
        description: item.description,
        views: item.views || 0,
        rentCount: item.rentCount || 0
      }));

      const { error: seedItemsError } = await supabase
        .from('items')
        .insert(formattedItems);

      if (seedItemsError) {
        console.error('Gagal melakukan seeding items:', seedItemsError.message);
      } else {
        console.log('Sukses melakukan seeding data items.');
      }
    } else {
      console.log('Tabel items sudah terisi, melewati seeding.');
    }

  } catch (err: any) {
    console.error('Terjadi kesalahan tidak terduga saat seeding:', err.message || err);
  }
}
