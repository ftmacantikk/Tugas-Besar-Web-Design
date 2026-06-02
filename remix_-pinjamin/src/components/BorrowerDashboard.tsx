import React, { useState } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  BookOpen, Heart, Clock, CheckCircle2, Navigation, MessageSquare, 
  Sparkles, Calendar, PlusCircle, Search, AlertCircle, Award, Star, X
} from 'lucide-react';
import { Rental, Item } from '../types';

export const BorrowerDashboard: React.FC = () => {
  const { 
    user, rentals, wishlist, items, navigateTo, toggleWishlist, addReview 
  } = usePinjamIn();

  const [activeTab, setActiveTab ] = useState<'Berlangsung' | 'Selesai' | 'Dibatalkan'>('Berlangsung');
  
  // Interactive Review Modal states
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');

  // Find bookmarked products details
  const bookmarkedProducts = items.filter(it => wishlist.includes(it.id));

  // Current tab filtered rentals list
  const filteredRentals = rentals.filter(r => {
    if (activeTab === 'Berlangsung') return r.status === 'Berlangsung';
    if (activeTab === 'Selesai') return r.status === 'Selesai';
    return r.status === 'Dibatalkan';
  });

  // Handle Review write submit
  const submitReviewHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRental) return;

    addReview(selectedRental.id, reviewComment, reviewRating);
    
    // Close & reset
    setSelectedRental(null);
    setReviewComment('');
    setReviewRating(5);
  };

  return (
    <div className="bg-[#f7f6f3] min-h-screen text-[#23201d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        
        {/* Main 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= 👥 LEFT SIDEBAR: PROFILE SUMMARY ================= */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#e6e2da] p-5 rounded-3xl space-y-5 shadow-sm text-left">
              
              {/* User overview block */}
              <div className="text-center space-y-3 pb-4 border-b border-[#f4f3ef]">
                <div className="relative inline-block">
                  <img 
                    src={user?.pfp || "https://avatar.iran.liara.run/public/40"} 
                    alt={user?.name} 
                    className="w-16 h-16 rounded-full border-2 border-[#e9a32c] object-cover mx-auto"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1e1c19] leading-tight">{user?.name || 'Mahasiswa'}</h3>
                  <p className="text-[10px] text-[#7c7267] font-mono mt-1">NIM {user?.nim || '1202220199'}</p>
                </div>
              </div>

              {/* Campus major details */}
              <div className="space-y-1.5 text-xs text-[#5e584f] bg-[#faf9f5] p-3 rounded-2xl border border-[#e6e2da]">
                <p className="font-black text-[#7c7267] text-[9px] font-mono tracking-widest leading-none">AFILIASI AKADEMIK</p>
                <p className="font-black text-[#e29c1e] mt-2">{user?.campus || 'Universitas Jenderal Soedirman'}</p>
                <p className="text-[#3c3a35] text-[11px] leading-tight font-bold mt-1">{user?.faculty || 'Fakultas Teknik'}</p>
                <p className="text-[#7c7267] text-[11px] leading-none mt-0.5">{user?.department || 'Teknik Informatika'}</p>
              </div>

              {/* Static quick rules help widget */}
              <div className="space-y-2.5 text-xs text-left">
                <p className="font-black text-[#7c7267] font-mono text-[9px] tracking-widest">TUNTUNAN PEMINJAM</p>
                <div className="flex items-center space-x-2 text-[#4a463e] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jaga kelayakan fisik barang</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4a463e] font-semibold">
                  <AlertCircle className="w-4 h-4 text-[#e29c1e] shrink-0" />
                  <span>Denda telat Rp 25k/hari</span>
                </div>
              </div>

              {/* Switch dashboard shortcut button link */}
              <div className="border-t border-[#f4f3ef] pt-4">
                <button 
                  onClick={() => navigateTo('lender-dashboard')}
                  className="w-full bg-[#1e1c19] hover:bg-black text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <PlusCircle className="w-4 h-4 text-[#e9a32c]" />
                  <span>Kelola & Sewakan Barang</span>
                </button>
              </div>

            </div>
          </aside>

          {/* ================= 📊 RIGHT CONTENTS AREA ================= */}
          <main className="lg:col-span-9 space-y-8 text-left">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-[#e6e2da] shadow-sm">
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-black text-[#1e1c19] leading-tight">Peminjaman Saya</h1>
                <p className="text-xs text-[#7c7267] mt-1 font-semibold">Pantau status transaksi aktif dan ulas barang yang selesai dipasang.</p>
              </div>
              <button 
                onClick={() => navigateTo('browse')}
                className="bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] font-black px-4.5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cari Alat Lagi</span>
              </button>
            </div>

            {/* Sub category tabs */}
            <div className="border-b border-[#e6e2da] flex space-x-6 text-sm">
              {(['Berlangsung', 'Selesai', 'Dibatalkan'] as const).map((tab) => {
                const isSelected = activeTab === tab;
                const count = rentals.filter(r => r.status === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3.5 font-extrabold transition-all flex items-center space-x-2 relative cursor-pointer ${
                      isSelected 
                        ? 'text-[#1e1c19] border-b-2 border-[#1e1c19]' 
                        : 'text-[#7c7267] hover:text-[#1e1c19]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-none ${isSelected ? 'bg-[#1e1c19] text-white' : 'bg-[#e6e2da] text-[#7c7267]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS LIST */}
            <div className="space-y-4">
              {filteredRentals.length === 0 ? (
                <div className="bg-white border border-[#e6e2da] p-10 rounded-3xl text-center space-y-3 shadow-sm">
                  <span className="text-3xl">📭</span>
                  <p className="text-sm font-black text-[#1e1c19]">Tidak ada transaksi pada kategori {activeTab}.</p>
                  <p className="text-xs text-[#7c7267] max-w-sm mx-auto leading-relaxed">
                    Peralatan kuliah yang sedang atau sudah kamu sewa akan tampil secara rapi dan transparan di sini.
                  </p>
                </div>
              ) : (
                filteredRentals.map((rental) => {
                  const isOngoing = rental.status === 'Berlangsung';
                  return (
                    <div 
                      key={rental.id}
                      className="bg-white border border-[#e6e2da] rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-[#e9a32c] shadow-sm transition-all"
                    >
                      {/* Left: item photo + dates info */}
                      <div className="flex gap-4 items-start w-full md:max-w-xl text-left">
                        {rental.itemImage ? (
                          <img 
                            src={rental.itemImage} 
                            alt={rental.itemName} 
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-[#faf9f6]/95 border border-[#e6e2da] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#faf9f6] text-[#e9a32c] border border-[#e6e2da] rounded-2xl flex items-center justify-center font-extrabold text-xs shrink-0">
                            FOTO
                          </div>
                        )}
                        <div className="space-y-1.5 min-w-0 flex-grow text-left">
                          <h3 className="font-extrabold text-[#1e1c19] leading-tight text-sm sm:text-base truncate">{rental.itemName}</h3>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#4a463e]">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5 text-[#e9a32c] shrink-0" />
                              <span className="font-semibold">{rental.startDate} - {rental.endDate}</span>
                            </span>
                            <span className="flex items-center space-x-1 font-mono font-bold text-[#e29c1e] bg-[#faf9f5] px-2 py-0.5 rounded border border-[#e6e2da]">
                              <span>Tagihan: Rp {rental.price.toLocaleString('id-ID')}</span>
                            </span>
                          </div>

                          {/* Dynamic Active Progress loop (Active Rentals only) */}
                          {isOngoing && (
                            <div className="space-y-1.5 pt-1 text-left">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-[#7c7267] font-semibold">Peminjaman Aktif</span>
                                <span className="text-[#e29c1e] font-black">Sewa Berlangsung</span>
                              </div>
                              <div className="w-full bg-[#f4f3ef] h-1.5 rounded-full overflow-hidden border border-[#e6e2da]">
                                <div className="bg-[#e9a32c] h-full w-[65%] rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right actions columns */}
                      <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0">
                        {isOngoing ? (
                          <>
                            <a 
                              href="https://wa.me/628123456789" 
                              target="_blank" 
                              rel="noreferrer"
                              className="bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5"
                            >
                              <MessageSquare className="w-4 h-4 shrink-0 text-emerald-600" />
                              <span>Hubungi Lender (WA)</span>
                            </a>
                            <button 
                              onClick={() => {
                                alert("Permintaan perpanjangan sewa telah diajukan ke Lender!");
                              }}
                              className="bg-[#fcfbfa] hover:bg-[#faf9f5] text-[#1e1c19] border border-[#e6e2da] text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                            >
                              Minta Perpanjangan
                            </button>
                          </>
                        ) : rental.status === 'Selesai' ? (
                          rental.hasReviewed ? (
                            <div className="border border-[#e6e2da] bg-[#fcfbfa] text-[#7c7267] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 cursor-not-allowed">
                              <Award className="w-4 h-4 text-emerald-600" />
                              <span>Selesai & Diulas</span>
                            </div>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => setSelectedRental(rental)}
                              className="bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] font-black text-xs px-4 py-2.5 rounded-xl border border-[#da921a] shadow flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <Star className="w-4 h-4 fill-[#1e1c19] text-[#1e1c19]" />
                              <span>Tulis Ulasan</span>
                            </button>
                          )
                        ) : null}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* ================= Wishlist Grid Preview ================= */}
            <div className="space-y-4 pt-6 border-t border-[#e6e2da]">
              <div className="text-left">
                <h2 className="text-lg font-black text-[#1e1c19] tracking-tight">Wishlist Saya ⭐</h2>
                <p className="text-xs text-[#7c7267] font-semibold">Barang-barang sewaan yang menarik perhatian kuliahmu.</p>
              </div>

              {bookmarkedProducts.length === 0 ? (
                <p className="text-xs text-[#7c7267] italic font-mono pt-1 text-left">Anda belum menandai barang apapun dalam daftar wishlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-white border border-[#e6e2da] rounded-2xl overflow-hidden flex flex-col justify-between group shadow-sm hover:border-[#e9a32c] transition-all"
                    >
                      <div className="relative aspect-[16/10] bg-[#faf9f6]/95 border-b border-[#e6e2da] overflow-hidden">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => toggleWishlist(p.id)}
                          className="absolute top-3 right-3 p-2 bg-white text-zinc-400 rounded-full border border-[#e6e2da] shadow-sm hover:text-red-500 cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </button>
                        <span className="absolute bottom-3 left-3 bg-[#1e1c19] text-white font-mono text-[9px] px-2.5 py-0.5 rounded-full capitalize font-bold">
                          {p.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-3 text-left">
                        <h4 className="font-extrabold text-xs sm:text-sm text-[#1e1c19] line-clamp-1">{p.name}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-mono font-bold text-[#e29c1e]">Rp {p.price.toLocaleString('id-ID')}<span className="text-[10px] text-[#7c7267] font-sans font-normal">/hari</span></p>
                          <button 
                            onClick={() => navigateTo('item-detail', p)}
                            className="bg-[#1e1c19] hover:bg-black text-white text-[10px] font-black px-3.5 py-2 rounded-lg transition-all cursor-pointer"
                          >
                            Buka Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </main>
        </div>
      </div>

      {/* ================= WRITE REVIEW DIALOG MODAL ================= */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-[#e6e2da] p-6 w-full max-w-md rounded-3xl relative space-y-5 text-left shadow-2xl">
            
            <button 
              onClick={() => setSelectedRental(null)}
              className="absolute top-4 right-4 text-[#7c7267] hover:text-[#1e1c19] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="font-extrabold text-lg text-[#1e1c19]">Ulas Barang Sewaan ⭐</h3>
              <p className="text-xs text-[#7c7267] leading-tight">Bagikan pengalaman meminjam dari <strong className="text-[#e29c1e]">{selectedRental.itemName}</strong></p>
            </div>

            <form onSubmit={submitReviewHandler} className="space-y-4">
              
              {/* Stars selection row */}
              <div className="space-y-1 text-center bg-[#faf9f5] py-3.5 rounded-2xl border border-[#e6e2da]">
                <label className="text-xs font-black text-[#7c7267] uppercase font-mono block">Berikan Penilaian Bintang</label>
                <div className="flex justify-center space-x-2 pt-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setReviewRating(s)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${s <= reviewRating ? 'fill-[#e9a32c] text-[#e9a32c]' : 'text-zinc-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text comment */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-extrabold text-[#7c7267] uppercase font-mono block">Ulasan Tertulis Anda</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Ceritakan tingkat kepuasan, fungsionalitas fisik, dan keramahan penyerahan..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#faf9f6]/95 border border-[#e6e2da] text-[#1e1c19] focus:border-[#e9a32c] text-xs p-3.5 rounded-xl outline-none shadow-inner"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2 text-xs font-bold">
                <button 
                  type="button"
                  onClick={() => setSelectedRental(null)}
                  className="px-4 py-2.5 border border-[#e6e2da] rounded-xl text-[#7c7267] hover:bg-zinc-50 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] px-5 py-2.5 rounded-xl cursor-pointer font-black shadow"
                >
                  Kirim Ulasan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
