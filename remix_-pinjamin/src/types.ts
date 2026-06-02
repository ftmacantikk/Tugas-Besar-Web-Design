export interface User {
  id: string;
  name: string;
  email: string;
  campus: string;
  nim?: string;
  faculty?: string;
  department?: string;
  pfp?: string;
  phone?: string;
  role?: 'peminjam' | 'pinjamkan' | 'keduanya';
  isActiveLenderPro?: boolean;
}

export type ItemStatus = 'Tersedia' | 'Sedang Dipinjam' | 'Maintenance' | 'Dibatalkan' | 'Dipinjam' | 'Selesai';
export type ItemCondition = 'Baru' | 'Sangat Baik' | 'Bekas';
export type ItemCategory = 'Elektronik' | 'Alat Tulis' | 'Pakaian' | 'Hobi & Sport' | 'Fotografi' | 'Outdoor' | 'Lab';

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  condition: ItemCondition;
  price: number; // rate per day in Rupiah
  status: ItemStatus;
  location: string; // e.g., "FEB Grendeng, UNSOED", "FT Purbalingga (Blater)"
  distance: number; // in km
  ownerId: string;
  ownerName: string;
  ownerPfp: string;
  ownerRating: number;
  image: string;
  description?: string;
  views?: number;
  rentCount?: number;
}

export interface Rental {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  price: number;
  startDate: string;
  endDate: string;
  status: 'Berlangsung' | 'Selesai' | 'Dibatalkan';
  hasReviewed?: boolean;
}

export interface RentRequest {
  id: string;
  requesterName: string;
  requesterPfp: string;
  itemName: string;
  itemId: string;
  itemImage: string;
  price: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
}

export interface RecentActivity {
  id: string;
  userName: string;
  action: 'pinjam' | 'kembalikan' | 'sewakan';
  itemName: string;
  timeAgo: string;
  userPfp: string;
}

export interface Review {
  id: string;
  studentName: string;
  initials: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

// Initial Core Static Database
export const INITIAL_ITEMS: Item[] = [
  {
    id: "item-1",
    name: "iPad Air Gen 5 M1",
    category: "Elektronik",
    condition: "Sangat Baik",
    price: 45000,
    status: "Tersedia",
    location: "FEB Grendeng, UNSOED",
    distance: 0.5,
    ownerId: "owner-adi",
    ownerName: "Aris Adi Saputra",
    ownerPfp: "https://avatar.iran.liara.run/public/15",
    ownerRating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKbzfIHjDpLs6xZULntGzV5_tteCNCy-9uIcQnYda2f3JCK_1JhVkHf6fkXdPzQbxcxZa-nbyxduNeLumL1AX5u65ny1chHmp_4fhKOr6gn5zkJbq1pk7-1-oisJ6OyTBwHfVOyg-GKIK4IykaDnIMOL_keqnf041wnESWMmFe4p5WAlnW8hVWC3-VVnYJxAh44thdZMOOlO6XG0eafLCX92VovYsYWjQ-TlTDzG2LriCDxW-tMnWTrjpsB17Pgek9DRbeAbNOiw",
    description: "iPad Air Gen 5 ditenagai chip M1 super kencang. Lengkap dengan Apple Pencil gen 2. Sangat menunjang kebutuhan belajar, digital painting, atau mencatat materi kuliah FEB UNSOED. Kondisi mulus, layar jernih, dan baterai awet.",
    views: 142,
    rentCount: 8
  },
  {
    id: "item-2",
    name: "Sony WH-1000XM4",
    category: "Elektronik",
    condition: "Baru",
    price: 35000,
    status: "Sedang Dipinjam",
    location: "Perpustakaan Pusat UNSOED",
    distance: 0.2,
    ownerId: "owner-rina",
    ownerName: "Rina Soedirman",
    ownerPfp: "https://avatar.iran.liara.run/public/44",
    ownerRating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7zlN1VDbZy9-43xcFCC2qM1QVK4YkUFxH4IlukDr1Y2K-IOounrrnJVgKw1PkCABHRPBj6M14EllzPSWVyNWuoYSp6zDVCcW5tSvcFIXvtaacOrc8vPv4NxhuCrii2qGqs4DBN4G2RKLPZ1QsaRBRxw3si8s8D3t1Mynf5fuqHzMrAWjnThAmMakAXZ0by1JgnUDbvF6sv1JyLQ6PaVU_A9xmyViqAuCP2XGGVl2fT8p2yAPuitTn-uvxWoS3rI0iJ0x6NYLSWC4",
    description: "Headphone wireless kelas dunia dengan Active Noise Cancelling terbaik. Sangat cocok untuk fokus belajar di perpustakaan UNSOED tanpa kebisingan eksternal. Kualitas suara jernih, deep bass, lengkap dengan carrying case.",
    views: 95,
    rentCount: 14
  },
  {
    id: "item-3",
    name: "Tripod Kamera Pro",
    category: "Hobi & Sport",
    condition: "Bekas",
    price: 15000,
    status: "Tersedia",
    location: "FISIP Grendeng, UNSOED",
    distance: 0.9,
    ownerId: "owner-budi",
    ownerName: "Budi Purwokerto",
    ownerPfp: "https://avatar.iran.liara.run/public/23",
    ownerRating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw71l2eoQRbTaEEJfHoP-x4xcY9K5RLdMViwTm0mPYEh0dS3yvSR3cWkGPUdXwND6ZR1CPpRpQo9rHniBsUGrpbGbQRoav28CvgR-GtOHDwLICj4vYwHWGmHYZwZzJgL_cIQFZUP2xge7Ka-KhtrEisva_SZDhXS-J-_Nok5SenQ9yl7MQU2k3Lw5bYLXRt0hsDJ-CJ5ffhmlIQ9DK5_kroRq_u8zLvoivf5M-3Utqhp7wGOQkjIMkjpuMOWQ0PFJEiuKF9eol2Bk",
    description: "Tripod profesional berserat alumunium kuat, ringan, dan stabil. Sanggup memikul beban DSLR/Mirrorless dengan lensa berat untuk dokumentasi kegiatan FISIP.",
    views: 64,
    rentCount: 3
  },
  {
    id: "item-4",
    name: "Kamera DSLR Canon EOS 200D",
    category: "Fotografi",
    condition: "Sangat Baik",
    price: 85000,
    status: "Tersedia",
    location: "FT Purbalingga (Blater)",
    distance: 12.5,
    ownerId: "owner-arif",
    ownerName: "Arif Purbalingga",
    ownerPfp: "https://avatar.iran.liara.run/public/12",
    ownerRating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfwqjDCPw5q7W49XFrLaJkuWOrEiJX8EPuma0OsAHwrdWYoJPa88wyFcy0V3hdkYbdIi8X6C9xd7HEJ3NiSwavqt6-yAcRAmVDT4Dq_33w3Swh4OosjxZOXIO2hznt2GbjX_y_AZ64utchhEuCuzsnTHDn5PGVGki5TomiRaH6AKdcFtMxR9CjOl3AmTtzGfyEqiGJaJbsQISnnPvxCBbq4CUSrmLibdefrfCCPNQCXRXZ9bhBf7TfBipElGqCkU97PDjAzaNWDDU",
    description: "Canon EOS 200D adalah kamera DSLR teringan di dunia dengan layar vari-angle sentuh. Sangat cocok untuk mahasiswa Teknik yang ingin memulai belajar fotografi di Blater. Kelengkapan: Tas kamera, baterai, charger.",
    views: 228,
    rentCount: 47
  },
  {
    id: "item-5",
    name: "Carrier 60L Arei Outdoors",
    category: "Outdoor",
    condition: "Sangat Baik",
    price: 35000,
    status: "Tersedia",
    location: "FPIK Karangwangkal, UNSOED",
    distance: 1.2,
    ownerId: "owner-arif",
    ownerName: "Arif Purbalingga",
    ownerPfp: "https://avatar.iran.liara.run/public/12",
    ownerRating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY9PCtgFDsw7oUMg7jijhhz3cjmQt-uHRCkGHlp71XqvgTPQ9vhKx0e0zItbqxRuK_s2PDuleKZndn6D5axE2mvsSdwxMyO8kCWyW9dVHYbUehrbZm_3kew7WtUOY_4tlzuaeuXac-yA6qWQafoyV5iCqG5wbE92cdGP8NUrUlv6aOAMvYg-TH_-QqP9AtliQDnD0N9gslVmebfji8fzTFOI9UYRZI2af3EhiWkfL-to1ZSVQ5vZuUtmmB6VklipZqSkxf1eFlnE4",
    description: "Tas Carrier Arei kapasitas 60 Liter. Sangat tangguh untuk kegiatan naik gunung slamet maupun KKN mahasiswa UNSOED. Backsystem empuk anti pegal, bonus rain cover.",
    views: 74,
    rentCount: 19
  },
  {
    id: "item-6",
    name: "Mikroskop Digital USB",
    category: "Lab",
    condition: "Baru",
    price: 50000,
    status: "Tersedia",
    location: "MIPA Karangwangkal, UNSOED",
    distance: 0.1,
    ownerId: "owner-budi-s",
    ownerName: "Budi Santoso",
    ownerPfp: "https://avatar.iran.liara.run/public/25",
    ownerRating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCREHT3bV_vp8I0Jjux6vDhW6U5rK7p3719ECm-Q0JAeNRzQkEVx5USjWOA52BJ0dj3yqLFkKorHRouLzrTFSPfwofSrSqaovvye92pLYFSMnscivr5eUNoYP_ztwE7QZI92_9c_2LFpglnjU4PHYi3xdvpKETPVuUr53eprloXlMksd6AWTWoPZt5YBnGC8qtYJvapXNvG6bRzZkC5EwYzkTn-BkrRMT4pZO7RXWaH_7kUk_xCIaUbFW-HI2n-7dbpn74yi1HYOZg",
    description: "Mikroskop digital koneksi USB langsung ke laptop/smartphone. Perbesaran hingga 1600x. Sangat andal untuk praktikum MIPA Biologi atau riset kelulusan UNSOED.",
    views: 128,
    rentCount: 6
  },
  {
    id: "item-7",
    name: "Laptop MacBook Air M1",
    category: "Elektronik",
    condition: "Sangat Baik",
    price: 120000,
    status: "Tersedia",
    location: "FH Grendeng, UNSOED",
    distance: 0.8,
    ownerId: "owner-sari",
    ownerName: "Sari Handayani",
    ownerPfp: "https://avatar.iran.liara.run/public/47",
    ownerRating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATHgnHOQbGeT1GwWukIWSkXzs3o8JXbzKYmqjvpUDyA6H-nTQtnL__Uje3ANzdU7BtY5Hb5FTAhb8LOuOM7QWXPg_CXnknn8Dhy61zir8AWC-m4Uh8Rrwn7K_TWSkal3eEatvTcdfWtuXCskLCdYNamN2YHBu4hw4as-1R1no2Kuq6S65sSXrIzu5Ib-iJZm0UrKT6BeWMUYcBQpSAUs6iK0xeuC2FBhU7pB_528SPQwXKG1RCCEBGLjQHJSx8XI5cPtgWojkEZtU",
    description: "MacBook Air Retina 13.3-inci dengan processor Apple M1. RAM 8GB, SSD 256GB. Sangat lancar untuk pemrograman, coding, tugas akhir, dan skripsi hukum.",
    views: 184,
    rentCount: 22
  },

  // Wishlist preview items that can be searched or selected
  {
    id: "wishlist-1",
    name: "Laptop Kerja ASUS",
    category: "Elektronik",
    condition: "Sangat Baik",
    price: 50000,
    status: "Tersedia",
    location: "Koperma UNSOED Grendeng",
    distance: 0.4,
    ownerId: "owner-rizky",
    ownerName: "Aldi Trio Prabowo",
    ownerPfp: "https://avatar.iran.liara.run/public/40",
    ownerRating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRTsBEpGQL72CS-CteZUo3r4qLRqrWy-eG63FyGmduqc36Sfur2Dt4aoyGNK2Da2UnGGJ51diruCOEQz-v7mVZdgUU1Ht71Ezjqy5kR6PKCA1frOcLv8IJqf76CVlkSMLMexErXEVvdgT7IOlqWbj72psg0RtE9ZyH0k4qXeMNRH4j-47WtWDjqAVBk1yfGq_Dn2zu2SEAboWXlmLYdKvZ05Vz7x5ilTyp1XxzWXNHya-kaFK3wYsv2I33DNlZY21S3v860X-GEdg",
    description: "Laptop ASUS Vivobook tangguh untuk produktivitas mahasiswa UNSOED. Windows 11 Orisinil, Office lengkap.",
    views: 46,
    rentCount: 2
  },
  {
    id: "wishlist-2",
    name: "Backpack Eiger 35L",
    category: "Outdoor",
    condition: "Bekas",
    price: 15000,
    status: "Tersedia",
    location: "FH Grendeng, UNSOED",
    distance: 0.7,
    ownerId: "owner-adi",
    ownerName: "Aris Adi Saputra",
    ownerPfp: "https://avatar.iran.liara.run/public/15",
    ownerRating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmImV_CpKnablpImD6sItFPHDrKSs4gz419mFIjCddp0T14b9Gy5H4dltF__ETxHL-F8YIff0f3UlElr4_Vw857LVOkLyQctmNEXsXDR4D1qAfOc2TQrBSyQWse-AarDPhdYZHiTGVHYZUSbAirlih4ZkhUXPjX-FwRGXxp9isd3gO-kUHZ0GDyuwDT7v1dnrLHw7pRRP3jy2EK60eF5qNsy2XPcmMvT-PFHiDFfVQwyg7hcMpL_c-oKKibvJff367qzzXmQNMZEc",
    description: "Tas punggung ransel Eiger kapasitas 35 Liter. Sangat cocok untuk KKN UNSOED, kuliah lapangan, atau piknik akhir pekan.",
    views: 52,
    rentCount: 7
  },
  {
    id: "wishlist-3",
    name: "Gitar Akustik Yamaha",
    category: "Hobi & Sport",
    condition: "Sangat Baik",
    price: 35000,
    status: "Sedang Dipinjam",
    location: "FIB Karangwangkal, UNSOED",
    distance: 1.1,
    ownerId: "owner-rina",
    ownerName: "Rina Soedirman",
    ownerPfp: "https://avatar.iran.liara.run/public/44",
    ownerRating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMrnE-V5WqNJh4BZlLOrt9EBTT6rCdEXQ_kxP5X6yfXHBzM-iNeB2cYhi6kja9brFxuYNf91r3lYJ7ZJP5eeiSRMCeE5qFJYiRpz6t9IdVf6Lr3ckXA4IogBtPB4UG4kegDn4wOm5NqxY30fFAh5U1dwyviJKdiTk0vy_2CoracCYAgTvpyr7Bt75zCxeJK1XYI5pQc3OanWvVHD4JuNWSCXhW2SfqteJlZjRY4syoYqGTEBGxBeh9DqXduA0cXTt-vFH1MG1Fa3g",
    description: "Gitar akustik Yamaha original bertipe F310. Suara garing empuk, action senar rendah tidak bikin jari sakit.",
    views: 84,
    rentCount: 5
  },
  {
    id: "wishlist-4",
    name: "iPad Air + Pencil",
    category: "Elektronik",
    condition: "Sangat Baik",
    price: 75000,
    status: "Tersedia",
    location: "Fakultas Pertanian, Karangwangkal",
    distance: 0.9,
    ownerId: "owner-adi",
    ownerName: "Aris Adi Saputra",
    ownerPfp: "https://avatar.iran.liara.run/public/15",
    ownerRating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX_-RW5Y5adQ7liY3cn-EnrPURsmKf62eZCqWOLT4QlXhqMSkvx5_flYDQVQi9wLmFVx8b1ZEaILa5kAsc959HLCZFGsne1Ziw7M-Ah2kexWoh4XI7R3XCz73Qfa7xE3lhTtiqqp0q3ZDNjqEvNSzSEWEnCzex9ozG3mnVZL0YsIWn0E-9F1hP7yuzvkXZAOI2fTvXCGBBu5Y5_AMEfDmK1lq8XquDZCI7dgSCUMY2pXfg6VZmgkze5rHnH7k-suILKNVAIm19Q2M",
    description: "iPad Air 4th Gen WiFi Only + Apple Pencil 2nd Gen. Layar Liquid Retina luar biasa, chipset kuat A14 Bionic.",
    views: 112,
    rentCount: 11
  }
];

// Initial Borrower Rentals
export const INITIAL_RENTALS: Rental[] = [];

// Initial Live Stream Activities
export const INITIAL_ACTIVITIES: RecentActivity[] = [
  {
    id: "act-1",
    userName: "Andi",
    action: "sewakan",
    itemName: "Tenda 4p",
    timeAgo: "1 jam yang lalu",
    userPfp: "https://avatar.iran.liara.run/public/12"
  }
];

// Initial Input Rent Requests for Lander Dashboard
export const INITIAL_REQUESTS: RentRequest[] = [];

// Initial Lander Items for Lander Dashboard Table
export interface LanderItem {
  id: string;
  name: string;
  views: number;
  rentCount: number;
  pricePerDay: number;
  status: 'Tersedia' | 'Sedang Dipinjam' | 'Maintenance';
  image: string;
}

export const INITIAL_LANDER_ITEMS: LanderItem[] = [];

// Seed Reviews
export const ITEM_REVIEWS: Review[] = [
  {
    id: "rev-1",
    studentName: "Dinda Nurul",
    initials: "DN",
    rating: 5,
    comment: "Kameranya bersih banget, baterai awet. Mas Arif juga ramah banget pas COD di perpus pusat.",
    timeAgo: "2 hari yang lalu"
  },
  {
    id: "rev-2",
    studentName: "Bagus Kurniawan",
    initials: "BK",
    rating: 4,
    comment: "Sangat membantu buat tugas uas sinematografi. Recommended lender!",
    timeAgo: "1 minggu yang lalu"
  }
];
