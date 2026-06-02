import React, { useState } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  Camera, Laptop, Tent, Compass, Sparkles, Navigation, ShieldCheck, 
  ArrowRight, Star, Heart, CheckCircle2, Search, ArrowUpRight, HelpCircle,
  Activity, RefreshCw, Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { items, activities, navigateTo, toggleWishlist, wishlist } = usePinjamIn();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    { name: 'Semua', label: 'Semua Kategori' },
    { name: 'Elektronik', label: 'Elektronik' },
    { name: 'Fotografi', label: 'Fotografi' },
    { name: 'Outdoor', label: 'Outdoor' },
    { name: 'Lab', label: 'Peralatan Lab' }
  ];

  // Filter items matching selected category
  const filteredItems = items
    .filter(item => selectedCategory === 'Semua' || item.category === selectedCategory)
    .slice(0, 4);

  return (
    <div className="bg-[#f7f6f3] min-h-screen text-[#23201d]">
      
      {/* 🚀 Segment 1: Encapsulated Dual-Tone Hero Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="bg-[#1e1c19] text-[#f9f5f0] rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xl border border-[#2e2b26]">
          
          {/* Subtle geometric pattern ambient overlays */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e9a32c]/5 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/40 rounded-full filter blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Col Intro */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#e9a32c]/10 text-[#e9a32c] px-3.5 py-1.5 rounded-full border border-[#e9a32c]/20">
                <Sparkles className="w-4 h-4 text-[#e9a32c] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase font-mono">
                  Platform Mahasiswa #1 di Indonesia
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                Butuh Alat?<br />
                <span className="text-[#e9a32c]">Pinjam Aja Dulu!</span>
              </h1>

              <p className="text-sm sm:text-base text-[#d1cbc4] leading-relaxed max-w-xl font-medium">
                Solusi hemat untuk kebutuhan kuliahmu. Pinjam perlengkapan praktikum, hobi, hingga elektronik dari sesama mahasiswa di kampusmu dengan mudah, aman, dan harga bersahabat. Saling bantu memajukan sirkularitas akademis!
              </p>

              <div>
                <button 
                  onClick={() => navigateTo('browse')}
                  className="bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] px-7 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Mulai Pinjam Sekarang</span>
                  <ArrowRight className="w-4 h-4 text-[#1e1c19] stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Right Col Student Team Tablet Frame mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full max-w-[440px] shadow-2xl relative">
                {/* Micro indicators */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-[10px] font-mono text-zinc-500">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span>PINJAMIN SYSTEM HOSTED BY NIM</span>
                </div>

                <div className="rounded-xl overflow-hidden aspect-[4/3] relative bg-[#2a2724]">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" 
                    alt="Friendly Students Team Campus"
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay tags */}
                  <div className="absolute top-3 left-3 bg-[#e9a32c] text-[#1e1c19] text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider font-mono">
                    PRO VERIFIED ✓
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/85 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10">
                    Saling Dukung 🎓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🤝 Golden Bottom Strip in the Hero layout */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-y-4 justify-between items-center text-xs text-white">
            <div className="bg-[#e9a32c] text-[#1e1c19] font-black px-4 py-1.5 rounded-lg tracking-wider font-mono uppercase text-[10px]">
              Platform Terbaik Untuk Mahasiswa
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#e5e2da] font-bold font-mono text-[10px] sm:text-xs">
              <span className="flex items-center space-x-1">
                <span className="text-[#e9a32c] font-black text-sm">✓</span>
                <span>Terverifikasi KTM & NIM</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-[#e9a32c] font-black text-sm">✓</span>
                <span>Pembayaran Kampus Aman</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-[#e9a32c] font-black text-sm">✓</span>
                <span>Ulasan Mahasiswa Nyata</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 🧭 Segment 2: JELAJAHI BARANG catalog section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Custom Header labels matching screenshot */}
        <div className="text-left mb-8 space-y-1">
          <p className="text-[#e29c1e] text-xs font-black tracking-widest uppercase font-mono">
            Jelajahi Barang
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e1c19] tracking-tight">
            Temukan apa yang Kamu Butuhkan
          </h2>
        </div>

        {/* Master Row grid mapping left catalog & right logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Filters and elegant White Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Horizontal Filter Buttons */}
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                      isSelected 
                        ? 'bg-[#1e1c19] text-white border-[#1e1c19] shadow-md' 
                        : 'bg-white text-[#7c7267] border-[#e6e2da] hover:border-[#1e1c19] hover:text-[#1e1c19]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Core Product Grid of elegant white cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-[#e6e2da] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#e9a32c] flex flex-col h-full text-left"
                >
                  
                  {/* Image container frame */}
                  <div className="relative aspect-[16/10] bg-[#faf9f6] border-b border-[#e6e2da] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge status */}
                    <div className="absolute top-3 left-3 bg-[#1e1c19]/90 text-white border border-[#2e2b26] text-[9px] font-bold px-2.5 py-0.5 rounded-md font-mono">
                      {item.category}
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                      className="absolute top-3 right-3 p-2 bg-white text-zinc-400 rounded-full shadow border border-[#e6e2da] hover:text-[#e9a32c] transition-colors cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(item.id) ? 'fill-[#e9a32c] text-[#e9a32c]' : ''}`} />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-extrabold text-[#1c1a17] line-clamp-2 text-sm sm:text-base tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                          item.status === 'Tersedia' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-zinc-100 text-[#7c7267] border-zinc-200'
                        }`}>
                          {item.status === 'Tersedia' ? 'Tersedia ✓' : 'Habis Terpinjam'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5 text-xs text-[#7c7267] font-medium font-sans">
                        <Navigation className="w-3.5 h-3.5 text-[#e9a32c] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#f4f3ef] flex flex-col gap-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[9px] text-[#7c7267] uppercase tracking-wider font-bold font-mono">Tarif Sewa</p>
                          <p className="text-sm font-extrabold text-[#e29c1e] font-mono leading-none mt-1">
                            Rp {item.price.toLocaleString('id-ID')}
                            <span className="text-xs text-[#7c7267] font-sans font-normal lowercase"> / hari</span>
                          </p>
                        </div>
                        <span className="text-[10px] text-[#7c7267] font-mono">Kondisi: <strong className="font-bold text-[#1e1c19]">{item.condition}</strong></span>
                      </div>

                      <button 
                        onClick={() => navigateTo('item-detail', item)}
                        className="w-full bg-white hover:bg-[#1e1c19] text-[#1e1c19] hover:text-white border-2 border-[#1e1c19] font-black py-2 rounded-xl text-xs transition-colors cursor-pointer text-center"
                      >
                        Pinjam Sekarang
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Quick trigger footer */}
            <div className="text-center pt-3">
              <button 
                onClick={() => navigateTo('browse')}
                className="inline-flex items-center space-x-1.5 text-xs font-black text-[#e29c1e] hover:text-[#da921a] group uppercase tracking-widest"
              >
                <span>Lihat Seluruh Katalog Barang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Right Column (Sidebar Box): Match the mockup Orange Activity Tray */}
          <div className="lg:col-span-4 self-stretch">
            <div className="bg-[#e9a32c] rounded-2xl overflow-hidden border border-[#da921a] shadow-md flex flex-col h-full text-left">
              
              {/* Header Title Board */}
              <div className="bg-[#1e1c19] text-white p-4 flex items-center justify-between border-b border-black">
                <span className="font-black text-xs font-mono tracking-wider text-yellow-500 uppercase flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-[#e9a32c] animate-ping" />
                  <span>#AKTIVITASTERBARU</span>
                </span>
                <span className="bg-[#e9a32c] text-[#1e1c19] text-[9px] font-black px-2 py-0.5 rounded uppercase">
                  Kampus Live
                </span>
              </div>

              {/* Feed lists */}
              <div className="p-5 flex-grow space-y-4">
                {activities.map((act) => (
                  <div key={act.id} className="bg-[#faf9f6]/40 hover:bg-white/55 border border-[#e6e2da]/10 p-3.5 rounded-xl transition-all flex space-x-3 items-start">
                    
                    {/* User initial avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#1e1c19] text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {act.userName.charAt(0)}
                    </div>

                    <div className="text-xs">
                      <p className="font-bold text-[#111111] leading-tight">{act.userName}</p>
                      <p className="text-[#3c3a35] mt-0.5 font-medium leading-snug">
                        {act.action === 'pinjam' && <span>meminjam <strong className="text-[#1c1a17] font-black">{act.itemName}</strong></span>}
                        {act.action === 'kembalikan' && <span>mengembalikan <strong className="text-[#1c1a17] font-bold">{act.itemName}</strong></span>}
                        {act.action === 'sewakan' && <span>memulai sewa <strong className="text-[#1c1a17] font-black">{act.itemName}</strong></span>}
                      </p>
                      <span className="block text-[9px] text-[#7c7267] font-mono mt-1 font-semibold">{act.timeAgo}</span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Orange Block Button */}
              <div className="p-4 bg-[#1e1c19] border-t border-black">
                <button 
                  onClick={() => navigateTo('browse')}
                  className="w-full bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] font-black py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-inner"
                >
                  <span>Lihat Semua Barang</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3.5]" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 🛠️ Segment 3: CARA KERJA section */}
      <section id="carakerja" className="bg-[#faf9f5] border-y border-[#eae7e1] py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#e29c1e] text-xs font-black tracking-widest uppercase font-mono">
              Cara Kerja
            </span>
            <h2 className="text-3xl font-black text-[#1e1c19] tracking-tight">
              Semudah 3 Langkah Praktis
            </h2>
            <p className="text-sm text-[#7c7267] font-medium leading-relaxed">
              Peminjaman barang terjamin keamanannya antar sesama sivitas mahasiswa aktif di lingkungan kampus.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visual dashed connectors linking cards only on large row layouts */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] border-b-2 border-dashed border-[#d9d4cc] -z-0" />

            {/* Step 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e2da] space-y-4 relative z-10 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1e1c19] text-[#e9a32c] rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md">
                01
              </div>
              <h3 className="font-extrabold text-[#111111] text-lg">Cari Barang Kami</h3>
              <p className="text-xs text-[#7c7267] leading-relaxed font-semibold">
                Gunakan filter pencarian pintar kami untuk menelusuri alat kuliah yang kamu inginkan, dekat dari kosmu.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e2da] space-y-4 relative z-10 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#e9a32c] text-[#1e1c19] rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md">
                02
              </div>
              <h3 className="font-extrabold text-[#111111] text-lg">Pinjam & Bayar Aman</h3>
              <p className="text-xs text-[#7c7267] leading-relaxed font-semibold">
                Selesaikan durasi jadwal penyewaan dan transfer pembayaran secara aman. Saldo ditahan hingga serah terima selesai.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e2da] space-y-4 relative z-10 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1e1c19] text-[#e9a32c] rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md">
                03
              </div>
              <h3 className="font-extrabold text-[#111111] text-lg">Pakai & Kembalikan</h3>
              <p className="text-xs text-[#7c7267] leading-relaxed font-semibold">
                Hubungi lender, janjian COD aman di area kampus, manfaatkan untuk mendukung kelulusan tugasmu, lalu serahkan kembali.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 📣 Segment 4: Core Dual Split CTA Banner (Orange Left • Charcoal Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Block CTA: Orange bg */}
          <div className="bg-[#e9a32c] text-[#1e1c19] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between items-start space-y-6 shadow-md border border-[#da921a]">
            <div className="absolute right-[-20px] top-[-20px] opacity-[0.05] pointer-events-none transform rotate-45">
              <Tent className="w-48 h-48" />
            </div>
            
            <div className="space-y-3.5 text-left">
              <span className="bg-[#1e1c19] text-white text-[9px] font-bold px-2.5 py-1 rounded font-mono uppercase">
                Untuk Peminjam
              </span>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Daftar & Mulai Pinjam
              </h4>
              <p className="text-xs text-[#3c3a35] font-semibold leading-relaxed max-w-sm">
                Nikmati kemudahan sewa berbagai alat harian tanpa harus boros membeli yang baru. Hemat hingga 90% budget bulanan mahasiswa!
              </p>
            </div>

            <button 
              onClick={() => navigateTo('register')}
              className="bg-[#1e1c19] hover:bg-black text-white px-6 py-3 rounded-xl text-xs font-black transition-transform cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              Daftar Sebagai Peminjam
            </button>
          </div>

          {/* Right Block CTA: Charcoal grey/black bg */}
          <div className="bg-[#1e1c19] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between items-start space-y-6 shadow-md border border-[#2e2b26]">
            <div className="absolute right-[-20px] top-[-20px] opacity-[0.05] pointer-events-none transform rotate-12">
              <Camera className="w-48 h-48" />
            </div>

            <div className="space-y-3.5 text-left">
              <span className="bg-[#e9a32c] text-[#1e1c19] text-[9px] font-black px-2.5 py-1 rounded font-mono uppercase">
                Untuk Pemilik Barang
              </span>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Pinjamkan Barangmu
              </h4>
              <p className="text-xs text-[#d1cbc4] font-medium leading-relaxed max-w-sm">
                Punya kamera, proyektor, atau tenda gunung di kolong kosan? Daftarkan sekarang dan raup uang jajan ekstra berlimpah tiap minggunya!
              </p>
            </div>

            <button 
              onClick={() => navigateTo('register')}
              className="bg-white hover:bg-[#faf9f5] text-[#1e1c19] px-6 py-3 rounded-xl text-xs font-black transition-transform cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              Mulai Pinjamkan Sekarang
            </button>
          </div>

        </div>
      </section>

      {/* 💬 Segment 5: Testimoni & Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-left">
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-[#e29c1e] text-xs font-black tracking-widest uppercase font-mono">
              Testimoni
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-[#1e1c19] tracking-tight">
              Apa Kata Mahasiswa?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e2da] space-y-4">
              <div className="flex items-center space-x-0.5 text-[#e9a32c]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#e9a32c] text-[#e9a32c]" />)}
              </div>
              <p className="text-xs sm:text-sm text-[#4a463e] leading-relaxed italic font-medium">
                "Asli terbantu banget! Buat praktikum Hubungan Masyarakat harus buat dokumenter video, tapi dana kelompok tipis banget kalau sewa di rental umum. Saling pinjam di PinjamIn dapet kamera Canon berkualitas cuma sepertiga harga sewa luar universitas!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-[#1e1c19] text-white flex items-center justify-center font-bold text-xs">
                  FA
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#111111]">Farhan Azis</h4>
                  <p className="text-[10px] text-[#7c7267] font-mono leading-none mt-0.5">FEB, Universitas Jenderal Soedirman</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e2da] space-y-4">
              <div className="flex items-center space-x-0.5 text-[#e9a32c]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#e9a32c] text-[#e9a32c]" />)}
              </div>
              <p className="text-xs sm:text-sm text-[#4a463e] leading-relaxed italic font-medium">
                "Barang-barang saya seperti Speaker Portable, Ring Light, dan Carrier tas yang tadinya berdebu di kolong kasur, sekarang menghasilkan uang saku tambahan bulanan yang lumayan banget buat bayar wifi. Sistem verifikasi KTM di sini bikin tenang dan aman!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-[#e9a32c] text-[#1e1c19] flex items-center justify-center font-bold text-xs">
                  SL
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#111111]">Sari Lestari</h4>
                  <p className="text-[10px] text-[#7c7267] font-mono leading-none mt-0.5">FISIP, Universitas Jenderal Soedirman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
