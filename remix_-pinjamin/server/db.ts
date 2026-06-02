import { Item, Rental, RentRequest, RecentActivity, LanderItem, User, ItemCategory, ItemCondition } from '../src/types';

// Central Server State for systematic storage
export class PinjamInDatabase {
  private user: User | null = null;
  private users: User[] = [
    {
      id: "aldirio-101",
      name: "Aldi Prabowo",
      email: "aldirio@mhs.unsoed.ac.id",
      campus: "Universitas Jenderal Soedirman",
      faculty: "Fakultas Teknik",
      department: "Teknik Informatika",
      nim: "H1D021002",
      phone: "081395874122",
      role: "keduanya" as const,
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
      role: "keduanya" as const,
      pfp: "https://avatar.iran.liara.run/public/12",
      isActiveLenderPro: true
    }
  ];

  private items: Item[] = [
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
    }
  ];

  private rentals: Rental[] = [];

  private requests: RentRequest[] = [];

  private landerItems: LanderItem[] = [];

  private activities: RecentActivity[] = [];

  public getUser(): User | null {
    return this.user;
  }

  public setUser(user: User | null) {
    this.user = user;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public registerNewUser(newUser: User) {
    this.users.push(newUser);
  }

  public findUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getItems(): Item[] {
    return this.items;
  }

  public getRentals(): Rental[] {
    return this.rentals;
  }

  public getRequests(): RentRequest[] {
    return this.requests;
  }

  public getLanderItems(): LanderItem[] {
    return this.landerItems;
  }

  public getActivities(): RecentActivity[] {
    return this.activities;
  }

  public addItem(item: Item) {
    this.items.unshift(item);

    // Sync activity
    this.activities.unshift({
      id: `act-${Date.now()}`,
      userName: item.ownerName.split(' ')[0],
      action: 'sewakan',
      itemName: item.name,
      timeAgo: 'Baru saja',
      userPfp: item.ownerPfp
    });

    // Also add to lander list
    this.landerItems.unshift({
      id: item.id,
      name: item.name,
      views: 0,
      rentCount: 0,
      pricePerDay: item.price,
      status: 'Tersedia',
      image: item.image
    });
  }

  public borrowItem(itemId: string, days: number, startDate: string, endDate: string) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return null;

    item.status = 'Sedang Dipinjam';

    const newRental: Rental = {
      id: `rental-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      price: item.price * days,
      startDate,
      endDate,
      status: 'Berlangsung'
    };

    this.rentals.unshift(newRental);

    this.activities.unshift({
      id: `act-${Date.now()}`,
      userName: this.user?.name.split(' ')[0] || 'Tamu',
      action: 'pinjam',
      itemName: item.name,
      timeAgo: 'Baru saja',
      userPfp: this.user?.pfp || ''
    });

    return newRental;
  }

  public handleRequest(requestId: string, action: 'Diterima' | 'Ditolak') {
    const reqIndex = this.requests.findIndex(r => r.id === requestId);
    if (reqIndex === -1) return false;

    this.requests[reqIndex].status = action;
    const req = this.requests[reqIndex];

    if (action === 'Diterima') {
      const globalItem = this.items.find(it => it.id === req.itemId || it.name === req.itemName);
      if (globalItem) {
        globalItem.status = 'Sedang Dipinjam';
      }

      this.landerItems = this.landerItems.map(li => {
        if (li.id === req.itemId || li.name === req.itemName) {
          return { ...li, status: 'Sedang Dipinjam', rentCount: li.rentCount + 1 };
        }
        return li;
      });

      this.activities.unshift({
        id: `act-${Date.now()}`,
        userName: req.requesterName.split(' ')[0],
        action: 'pinjam',
        itemName: req.itemName,
        timeAgo: 'Sedang berlangsung',
        userPfp: req.requesterPfp
      });
    }

    return true;
  }

  public addReview(rentalId: string, comment: string, rating: number) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (rental) {
      rental.hasReviewed = true;
      return true;
    }
    return false;
  }
}

export const db = new PinjamInDatabase();
