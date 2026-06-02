import React, { useState, useMemo } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  ArrowLeft, Star, Navigation, ShieldCheck, Mail, MessageSquare, 
  Calendar, Check, HelpCircle, BadgeCheck, FileWarning, ArrowUpRight
} from 'lucide-react';
import { ITEM_REVIEWS } from '../types';

export const ItemDetailPage: React.FC = () => {
  const { 
    selectedItem, navigateTo, borrowItem, toggleWishlist, wishlist, user 
  } = usePinjamIn();

  // Date selection states
  const [startDate, setStartDate] = useState('2026-06-05');
  const [endDate, setEndDate] = useState('2026-06-08');

  // Booked trigger success banner
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  // Active thumbnail image switcher state
  const [activeImage, setActiveImage] = useState(selectedItem?.image || '');

  // Calculate Duration in days
  const durationDays = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return isNaN(diffDays) ? 1 : diffDays === 0 ? 1 : diffDays;
  }, [startDate, endDate]);

  // Safety fallback
  if (!selectedItem) {
    return (
      <div className="bg-[#f7f6f3] min-h-screen py-20 text-center text-[#23201d]">
        <p className="font-bold text-[#7c7267]">Tidak ada produk yang dipilih.</p>
        <button 
          onClick={() => navigateTo('browse')}
          className="mt-4 bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] font-black px-6 py-3 rounded-xl text-xs cursor-pointer"
        >
          Kembali ke Jelajahi Alat
        </button>
      </div>
    );
  }

  const priceRate = selectedItem.price;
  const rawTotal = priceRate * durationDays;
  const adminFee = 5000; // standard Student Admin fee
  const orderTotal = rawTotal + adminFee;

  // Book order handler
  const handleRentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Sobat PinjamIn, silakan Masuk atau Daftar gratis terlebih dahulu menggunakan tombol di kanan atas sebelum mengajukan pinjaman!");
      return;
    }
    
    // Trigger context booking
    borrowItem(
      selectedItem.id,
      durationDays,
      new Date(startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      new Date(endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    );

    setIsBookedSuccess(true);
    
    // Wait slightly then redirect to dashboard
    setTimeout(() => {
      setIsBookedSuccess(false);
      navigateTo('borrower-dashboard');
    }, 2000);
  };

  const isWished = wishlist.includes(selectedItem.id);

  return (
    <div className="bg-[#f7f6f3] min-h-screen pb-16 text-[#23201d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in-up text-left">
        
        {/* Breadcrumb row & Back button */}
        <div className="flex justify-between items-center text-xs">
          <button 
            onClick={() => navigateTo('browse')}
            className="flex items-center space-x-1.5 font-bold text-[#7c7267] hover:text-[#e9a32c] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Jelajahi</span>
          </button>
          <div className="text-[#a49a8d] font-mono font-bold uppercase shrink-0">
            Jelajahi &gt; {selectedItem.category} &gt; {selectedItem.name}
          </div>
        </div>

        {/* Dynamic Success Announcement Page Modal Banner */}
        {isBookedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center space-x-3 justify-center animate-bounce shadow">
            <BadgeCheck className="w-6 h-6 shrink-0 text-emerald-600" />
            <div className="text-center">
              <p className="font-black text-sm sm:text-base">Pesanan Sewa Berhasil Diajukan!</p>
              <p className="text-xs text-emerald-700">Menghubungkan Anda ke Peminjaman Saya...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= 🖼️ LEFT: GALLERY & DESCRIPTION ARTICLES ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gallery card layout */}
            <div className="bg-white border border-[#e6e2da] p-4 sm:p-5 rounded-3xl space-y-4 shadow-sm">
              <div className="relative aspect-video rounded-2xl bg-[#faf9f6] border border-[#e6e2da] overflow-hidden flex justify-center items-center">
                <img 
                  src={activeImage || selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-3 left-3 bg-[#1e1c19]/90 text-white font-mono text-[10px] px-3 py-1 rounded-md uppercase border border-black font-bold">
                  KONDISI {selectedItem.condition}
                </span>
              </div>

              {/* Thumbnails list switcher */}
              <div className="grid grid-cols-4 gap-3">
                {[selectedItem.image, "https://lh3.googleusercontent.com/aida-public/AB6AXuBfwqjDCPw5q7W49XFrLaJkuWOrEiJX8EPuma0OsAHwrdWYoJPa88wyFcy0V3hdkYbdIi8X6C9xd7HEJ3NiSwavqt6-yAcRAmVDT4Dq_33w3Swh4OosjxZOXIO2hznt2GbjX_y_AZ64utchhEuCuzsnTHDn5PGVGki5TomiRaH6AKdcFtMxR9CjOl3AmTtzGfyEqiGJaJbsQISnnPvxCBbq4CUSrmLibdefrfCCPNQCXRXZ9bhBf7TfBipElGqCkU97PDjAzaNWDDU", "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKbzfIHjDpLs6xZULntGzV5_tteCNCy-9uIcQnYda2f3JCK_1JhVkHf6fkXdPzQbxcxZa-nbyxduNeLumL1AX5u65ny1chHmp_4fhKOr6gn5zkJbq1pk7-1-oisJ6OyTBwHfVOyg-GKIK4IykaDnIMOL_keqnf041wnESWMmFe4p5WAlnW8hVWC3-VVnYJxAh44thdZMOOlO6XG0eafLCX92VovYsYWjQ-TlTDzG2LriCDxW-tMnWTrjpsB17Pgek9DRbeAbNOiw", "https://lh3.googleusercontent.com/aida-public/AB6AXuCw71l2eoQRbTaEEJfHoP-x4xcY9K5RLdMViwTm0mPYEh0dS3yvSR3cWkGPUdXwND6ZR1CPpRpQo9rHniBsUGrpbGbQRoav28CvgR-GtOHDwLICj4vYwHWGmHYZwZzJgL_cIQFZUP2xge7Ka-KhtrEisva_SZDhXS-J-_Nok5SenQ9yl7MQU2k3Lw5bYLXRt0hsDJ-CJ5ffhmlIQ9DK5_kroRq_u8zLvoivf5M-3Utqhp7wGOQkjIMkjpuMOWQ0PFJEiuKF9eol2Bk"].map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-video bg-white rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img ? 'border-[#e9a32c] scale-[1.03] shadow' : 'border-[#e6e2da] hover:border-[#1e1c19]'
                    }`}
                  >
                    <img src={img} alt="Thumbnail detail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Core details articles */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6e2da] space-y-5 shadow-sm">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#1e1c19] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                    {selectedItem.category}
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded border ${
                    selectedItem.status === 'Tersedia' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-zinc-100 text-[#7c7267] border-zinc-200'
                  }`}>
                    {selectedItem.status}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#1e1c19] leading-tight">
                  {selectedItem.name}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7c7267] border-b border-[#f4f3ef] pb-3.5">
                  <div className="flex items-center space-x-1 shrink-0">
                    <Star className="w-4 h-4 fill-[#e9a32c] text-[#e9a32c]" />
                    <span className="font-extrabold text-[#111111]">{selectedItem.ownerRating}</span>
                    <span className="text-[#a49a8d] font-mono leading-none"> (47 Ulasan Kampus terverifikasi)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0 text-[#7c7267]">
                    <Navigation className="w-3.5 h-3.5 text-[#e9a32c]" />
                    <span>{selectedItem.location}</span>
                  </div>
                </div>
              </div>

              {/* Description body copy */}
              <div className="space-y-2 text-left">
                <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Deskripsi Lengkap Alat</h4>
                <p className="text-xs sm:text-sm text-[#4a463e] leading-relaxed font-semibold">
                  {selectedItem.description || "Alat sewaan istimewa milik salah satu rekan kampus terdekat. Berfungsi normal, lengkap dengan kelengkapan tas pendukung, baterai dan charger bawaan asli. Hubungi lender untuk detail COD di lingkungan universitas."}
                </p>
              </div>

              {/* Rules bullets panel */}
              <div className="space-y-3 pt-4 border-t border-[#f4f3ef] text-left">
                <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Ketentuan Peminjaman 🛡️</h4>
                <ul className="text-xs text-[#5e584f] space-y-2 leading-relaxed font-semibold">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#e9a32c] shrink-0 font-black">•</span>
                    <span>Wajib menunjukkan Kartu Tanda Mahasiswa (KTM) yang aktif saat serah terima COD.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#e9a32c] shrink-0 font-black">•</span>
                    <span>Durasi sewa minimal adalah 1 hari. Pengembalian telat lewat dari 3 jam dikenai denda toleransi.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#e9a32c] shrink-0 font-black">•</span>
                    <span>Kerusakan fisik minor, gores atau cacat pecah menjadi tanggung jawab peminjam sepenuhnya.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Testimonies list section */}
            <div className="space-y-4 text-left">
              <h3 className="font-extrabold text-lg text-[#1e1c19] tracking-tight">Ulasan Teman Kampus 🎓</h3>
              
              <div className="space-y-3">
                {ITEM_REVIEWS.map((r) => (
                  <div key={r.id} className="bg-white border border-[#e6e2da] p-5 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#e9a32c]/10 text-[#da921a] flex items-center justify-center font-bold text-xs">
                          {r.initials}
                        </div>
                        <div>
                          <p className="font-bold text-[#1e1c19] leading-none">{r.studentName}</p>
                          <p className="text-[9px] text-[#7c7267] font-mono mt-0.5">Sivitas Universitas Terverifikasi</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-0.5 text-[#e9a32c]">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#e9a32c] text-[#e9a32c]" />)}
                      </div>
                    </div>
                    <p className="text-xs text-[#5e584f] leading-relaxed italic font-medium pl-10">
                      "{r.comment}"
                    </p>
                    <p className="text-[9px] font-mono text-[#7c7267] text-right">{r.timeAgo}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= 💳 RIGHT BOOKING SIDEBAR CARD ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Owner contact box view */}
            <div className="bg-white border border-[#e6e2da] p-5 rounded-2xl space-y-4 shadow-sm text-left">
              <span className="text-[9px] font-black text-[#7c7267] font-mono block leading-none tracking-widest uppercase">PEMILIK ALAT (LENDER)</span>
              
              <div className="flex gap-3.5 items-center">
                <img 
                  src={selectedItem.ownerPfp || "https://avatar.iran.liara.run/public/40"} 
                  alt={selectedItem.ownerName} 
                  className="w-12 h-12 rounded-full border-2 border-[#e9a32c] object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs text-left leading-tight">
                  <p className="font-bold text-[#1e1c19] flex items-center space-x-1">
                    <span>{selectedItem.ownerName}</span>
                    <ShieldCheck className="w-4 h-4 text-[#e9a32c] shrink-0" />
                  </p>
                  <p className="text-[#7c7267] font-semibold mt-0.5">Fakultas Teknik</p>
                  <p className="text-[#e29c1e] font-black text-[9px] uppercase font-mono mt-1.5">Rating: 4.9 • 47x disewa</p>
                </div>
              </div>

              <div className="pt-2 w-full text-xs font-bold leading-tight">
                <button 
                  onClick={() => alert("Mengajukan chat instan dengan pemilik alat...")}
                  className="w-full bg-[#fcfbfa] hover:bg-[#faf9f5] text-[#1e1c19] border border-[#d9d4cc] hover:border-[#1e1c19] py-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-[#e9a32c]" />
                  <span>Kirim Pesan Chat</span>
                </button>
              </div>
            </div>

            {/* Booking calculations details card */}
            <div className="bg-white border border-[#e6e2da] rounded-3xl p-5 space-y-4 shadow-sm text-left">
              <h3 className="font-black text-xs text-[#1e1c19] uppercase font-mono pb-2.5 border-b border-[#f4f3ef] text-center tracking-widest">Atur Tanggal Rental</h3>
              
              <form onSubmit={handleRentSubmit} className="space-y-4 text-xs">
                
                {/* Datepickers inputs */}
                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Sewa Mulai tanggal</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c7267] w-4 h-4" />
                      <input 
                        type="date" 
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-[#faf9f6] border border-[#e6e2da] hover:border-[#1e1c19] text-[#1e1c19] rounded-xl pl-10 pr-3 py-2.5 text-xs font-semibold outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Sewa Selesai tanggal</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c7267] w-4 h-4" />
                      <input 
                        type="date" 
                        required
                        min={startDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-[#faf9f6] border border-[#e6e2da] hover:border-[#1e1c19] text-[#1e1c19] rounded-xl pl-10 pr-3 py-2.5 text-xs font-semibold outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing calculated breakdowns summary */}
                <div className="space-y-2 pt-3.5 border-t border-[#f4f3ef] text-left text-[#4a463e] font-semibold">
                  <div className="flex justify-between">
                    <span>Tarif per hari</span>
                    <span className="font-mono font-bold text-[#1e1c19]">Rp {selectedItem.price.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Durasi Terpilih</span>
                    <span className="font-extrabold text-[#1e1c19]">{durationDays} Hari</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Biaya Admin Mahasiswa</span>
                    <span className="font-mono font-bold text-[#1e1c19]">Rp {adminFee.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="pt-2 border-t border-[#f4f3ef] flex justify-between items-center text-sm font-black text-[#1e1c19] font-sans">
                    <span>Total Tagihan</span>
                    <span className="text-[#e29c1e] font-mono text-base font-black">Rp {orderTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Submit rent trigger */}
                <div className="pt-2 space-y-2">
                  <button 
                    type="submit"
                    disabled={selectedItem.status !== 'Tersedia'}
                    className={`w-full py-3.5 rounded-xl text-center text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      selectedItem.status === 'Tersedia'
                        ? 'bg-[#1e1c19] hover:bg-black text-white shadow-lg'
                        : 'bg-zinc-100 text-[#7c7267] border border-[#e6e2da] cursor-not-allowed'
                    }`}
                  >
                    <span>{selectedItem.status === 'Tersedia' ? 'Ajukan Pinjaman' : 'Sedang Dipinjam'}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => toggleWishlist(selectedItem.id)}
                    className="w-full text-xs font-bold border border-[#e6e2da] py-2.5 rounded-xl flex items-center justify-center space-x-1.5 bg-[#faf9f5] hover:bg-[#faf9f6]/95 text-[#1e1c19] transition-colors cursor-pointer"
                  >
                    <svg className={`w-3.5 h-3.5 ${isWished ? 'fill-red-500 text-red-500' : 'text-[#7c7267]'}`} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{isWished ? 'Hapus Pin Wishlist' : 'Sematkan ke Wishlist'}</span>
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
