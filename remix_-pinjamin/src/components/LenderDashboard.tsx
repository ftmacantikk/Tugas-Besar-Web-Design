import React, { useState } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  Plus, Check, X, ShieldAlert, BadgeCent, Heart, BookOpen, Clock, 
  MapPin, Image, Eye, HelpCircle, LayoutGrid, CheckSquare, PlusCircle, Sparkles, Star
} from 'lucide-react';
import { ItemCategory, ItemCondition } from '../types';

export const LenderDashboard: React.FC = () => {
  const { 
    user, requests, landerItems, addLanderItem, handleRentRequest 
  } = usePinjamIn();

  // Create Item listing modal toggle vs states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ItemCategory>('Elektronik');
  const [newItemCondition, setNewItemCondition] = useState<ItemCondition>('Sangat Baik');
  const [newItemPrice, setNewItemPrice] = useState<number>(35000);
  const [newItemImage, setNewItemImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBvKbzfIHjDpLs6xZULntGzV5_tteCNCy-9uIcQnYda2f3JCK_1JhVkHf6fkXdPzQbxcxZa-nbyxduNeLumL1AX5u65ny1chHmp_4fhKOr6gn5zkJbq1pk7-1-oisJ6OyTBwHfVOyg-GKIK4IykaDnIMOL_keqnf041wnESWMmFe4p5WAlnW8hVWC3-VVnYJxAh44thdZMOOlO6XG0eafLCX92VovYsYWjQ-TlTDzG2LriCDxW-tMnWTrjpsB17Pgek9DRbeAbNOiw');

  // Interactive submit new item
  const handleAddNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    addLanderItem(
      newItemName,
      newItemCategory,
      newItemPrice,
      newItemCondition,
      newItemImage
    );

    // reset form
    setNewItemName('');
    setShowAddForm(false);
  };

  // Demo random helper images for item adding
  const applyDemoItemPreset = (presetName: string) => {
    if (presetName === 'Kamera') {
      setNewItemName("Mirrorless Fujifilm X-T30");
      setNewItemCategory("Fotografi");
      setNewItemPrice(95000);
      setNewItemCondition("Baru");
      setNewItemImage("https://lh3.googleusercontent.com/aida-public/AB6AXuBfwqjDCPw5q7W49XFrLaJkuWOrEiJX8EPuma0OsAHwrdWYoJPa88wyFcy0V3hdkYbdIi8X6C9xd7HEJ3NiSwavqt6-yAcRAmVDT4Dq_33w3Swh4OosjxZOXIO2hznt2GbjX_y_AZ64utchhEuCuzsnTHDn5PGVGki5TomiRaH6AKdcFtMxR9CjOl3AmTtzGfyEqiGJaJbsQISnnPvxCBbq4CUSrmLibdefrfCCPNQCXRXZ9bhBf7TfBipElGqCkU97PDjAzaNWDDU");
    } else if (presetName === 'Tenda') {
      setNewItemName("Tenda Dome 4P Arei");
      setNewItemCategory("Outdoor");
      setNewItemPrice(20000);
      setNewItemCondition("Sangat Baik");
      setNewItemImage("https://lh3.googleusercontent.com/aida-public/AB6AXuCVWpc_jCYksvPWpnR677VDk8DREEZ_p_bGD1wj_SLauM0Iwo-obBzwmCtfFXfmqjdhz1Wpu349JThn5kX5R2qrD4SIXS8hNczMkaWLrc-64QxZjR7413HV3NwIcrWK-5LcdKSX4hwcdO57l08gvI5n0JbXZqLamjatzqVOeDOEcERtJ1_BvAvvBauYvPP2Eo1QUQCswlOInQ6VBlv31MvqGLsneSVaoW-QaORXvWelCDfXHZ-Pwt4P1zh3HVKNykaYOzSDJBtnZ7U");
    } else if (presetName === 'Buku') {
      setNewItemName("Fisika Dasar Halliday Resnick");
      setNewItemCategory("Alat Tulis");
      setNewItemPrice(8000);
      setNewItemCondition("Bekas");
      setNewItemImage("https://lh3.googleusercontent.com/aida-public/AB6AXuBRTsBEpGQL72CS-CteZUo3r4qLRqrWy-eG63FyGmduqc36Sfur2Dt4aoyGNK2Da2UnGGJ51diruCOEQz-v7mVZdgUU1Ht71Ezjqy5kR6PKCA1frOcLv8IJqf76CVlkSMLMexErXEVvdgT7IOlqWbj72psg0RtE9ZyH0k4qXeMNRH4j-47WtWDjqAVBk1yfGq_Dn2zu2SEAboWXlmLYdKvZ05Vz7x5ilTyp1XxzWXNHya-kaFK3wYsv2I33DNlZY21S3v860X-GEdg");
    }
  };

  return (
    <div className="bg-[#f7f6f3] min-h-screen text-[#23201d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        
        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= 🛡️ LENDER PROFILE LEFT SIDEBAR ================= */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#e6e2da] p-5 rounded-3xl space-y-5 shadow-sm text-left">
              
              <div className="space-y-3 text-center pb-4 border-b border-[#f4f3ef]">
                <div className="relative inline-block">
                  <img 
                    src={user?.pfp || "https://avatar.iran.liara.run/public/40"} 
                    alt={user?.name} 
                    className="w-16 h-16 rounded-full border-2 border-[#e9a32c] object-cover mx-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-1 bg-[#1e1c19] text-white px-2 py-0.5 rounded border border-[#e9a32c] text-[8px] font-mono leading-none tracking-wider">
                    PRO
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1e1c19] leading-tight">{user?.name || 'Mahasiswa'}</h3>
                  <p className="text-[10px] text-[#e29c1e] font-black font-mono tracking-wider mt-1.5 uppercase">CAMPUS LENDER VERIFIED</p>
                </div>
              </div>

              {/* Verified badges */}
              <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#e6e2da] text-xs space-y-3 font-semibold">
                <div className="flex items-center space-x-2 text-[#3c3a35]">
                  <Check className="w-4 h-4 text-[#e29c1e] shrink-0" />
                  <span>KTM & NIM Sesuai Catatan</span>
                </div>
                <div className="flex items-center space-x-2 text-[#3c3a35]">
                  <Check className="w-4 h-4 text-[#e29c1e] shrink-0" />
                  <span>Rekening Dompet Kampus Aktif</span>
                </div>
                <p className="text-[9px] text-[#7c7267] font-mono leading-relaxed mt-1 font-semibold">
                  Semua barang dilindungi garansi keamanan sanksi akademis mahasiswa peminjam.
                </p>
              </div>

              {/* Form trigger action button */}
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full bg-[#1e1c19] hover:bg-black text-[#e9a32c] font-black py-3.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambah Barang Baru</span>
              </button>

            </div>
          </aside>

          {/* ================= 📋 ENTERPRISE LENDER MAIN AREA ================= */}
          <main className="lg:col-span-9 space-y-8 text-left">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#e6e2da] shadow-sm">
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-black text-[#1e1c19] leading-tight">Lender Panel</h1>
                <p className="text-xs text-[#7c7267] mt-1 font-semibold">Pantau pendapatan sewa, konfirmasi permintaan, dan daftarkan alat baru.</p>
              </div>
              
              <div className="flex items-center space-x-2 bg-[#fcfbfa] border border-[#e6e2da] px-3.5 py-1.5 rounded-xl">
                <span className="text-[9px] font-black text-[#7c7267] font-mono tracking-wider">STATUS LENDER:</span>
                <span className="bg-[#e9a32c]/15 text-[#da921a] text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono border border-[#e9a32c]/30">
                  ● AKTIF & AMAN
                </span>
              </div>
            </div>

            {/* 🪙 STATISTICS SUMMARY GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white p-4.5 rounded-3xl border border-[#e6e2da] space-y-2 hover:border-[#e9a32c] shadow-sm transition-colors text-left">
                <p className="text-[10px] text-[#7c7267] font-black uppercase tracking-wider font-mono">Total Pendapatan</p>
                <h3 className="text-lg sm:text-2xl font-black text-[#e29c1e] font-mono">Rp 840.000</h3>
                <p className="text-[9px] text-[#7c7267] font-bold leading-none">+Rp 120.000 bulan ini</p>
              </div>

              <div className="bg-white p-4.5 rounded-3xl border border-[#e6e2da] space-y-2 hover:border-[#e9a32c] shadow-sm transition-colors text-left">
                <p className="text-[10px] text-[#7c7267] font-black uppercase tracking-wider font-mono">Barang Aktif</p>
                <h3 className="text-lg sm:text-2xl font-black text-[#1e1c19] font-mono">{landerItems.length} Pcs</h3>
                <p className="text-[9px] text-[#7c7267] leading-none font-semibold">Terdaftar resmi</p>
              </div>

              <div className="bg-white p-4.5 rounded-3xl border border-[#e6e2da] space-y-2 hover:border-[#e9a32c] shadow-sm transition-colors text-left">
                <p className="text-[10px] text-[#7c7267] font-black uppercase tracking-wider font-mono">Total Transaksi</p>
                <h3 className="text-lg sm:text-2xl font-black text-[#1e1c19] font-mono">14 Kali</h3>
                <p className="text-[9px] text-emerald-700 font-bold leading-none">Rasio kepuasan 100%</p>
              </div>

              <div className="bg-white p-4.5 rounded-3xl border border-[#e6e2da] space-y-2 hover:border-[#e9a32c] shadow-sm transition-colors text-left">
                <p className="text-[10px] text-[#7c7267] font-black uppercase tracking-wider font-mono">Rating Lender</p>
                <div className="flex items-center space-x-1 mt-0.5">
                  <h3 className="text-lg sm:text-2xl font-black text-[#1e1c19] font-mono">4.9</h3>
                  <Star className="w-5 h-5 fill-[#e9a32c] text-[#e9a32c]" />
                </div>
                <p className="text-[9px] text-[#7c7267] font-bold leading-none font-mono">Ulasan Mahasiswa</p>
              </div>

            </div>

            {/* 📩 LIVE INCOMING RENT REQUESTS FOR REVIEWS */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-lg text-[#1e1c19] tracking-tight font-sans">Permintaan Sewa Masuk 👋</h3>
                <span className="bg-[#1e1c19] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full leading-none shrink-0 font-mono">
                  {requests.filter(r => r.status === 'Menunggu').length} MENUNGGU
                </span>
              </div>

              <div className="space-y-3">
                {requests.length === 0 ? (
                  <p className="text-xs text-[#7c7267] italic font-mono">Tidak ada permintaan sewa baru yang menanti persetujuan.</p>
                ) : (
                  requests.map((req) => {
                    const isPending = req.status === 'Menunggu';
                    return (
                      <div 
                        key={req.id}
                        className={`border rounded-3xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all text-left ${
                          req.status === 'Diterima' 
                            ? 'border-emerald-250 bg-emerald-50' 
                            : req.status === 'Ditolak' 
                              ? 'border-[#e6e2da] bg-[#fcfbfa]/80 opacity-60' 
                              : 'border-[#e6e2da] bg-white shadow-sm'
                        }`}
                      >
                        {/* Requester Profile & Item Info */}
                        <div className="flex gap-3.5 items-center">
                          {req.requesterPfp ? (
                            <img 
                              src={req.requesterPfp} 
                              alt={req.requesterName} 
                              className="w-10 h-10 rounded-full border border-[#e6e2da] object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#f3efe6] text-[#e9a32c] flex items-center justify-center font-bold text-sm shrink-0 border border-[#e6e2da]">
                              {req.requesterName.charAt(0)}
                            </div>
                          )}
                          <div className="text-left">
                            <p className="text-xs font-bold text-[#1e1c19]">{req.requesterName}</p>
                            <p className="text-xs text-[#5e584f] mt-0.5 leading-tight font-semibold">
                              Meminjam: <strong className="text-[#e29c1e] font-black">{req.itemName}</strong> ({req.durationDays} hari)
                            </p>
                            <p className="text-[10px] text-[#7c7267] font-mono mt-0.5">Jadwal: {req.startDate} - {req.endDate} • Nilai: <strong className="text-[#1c1a17] font-mono">Rp {req.price.toLocaleString('id-ID')}</strong></p>
                          </div>
                        </div>

                        {/* Rent approval action buttons */}
                        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
                          {isPending ? (
                            <>
                              <button 
                                onClick={() => handleRentRequest(req.id, 'Diterima')}
                                className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] font-black text-xs px-4.5 py-2.5 rounded-xl flex items-center space-x-1 cursor-pointer shadow-md"
                              >
                                <Check className="w-4 h-4 stroke-[3.5]" />
                                <span>Setujui</span>
                              </button>
                              <button 
                                onClick={() => handleRentRequest(req.id, 'Ditolak')}
                                className="bg-white hover:bg-[#faf9f5] text-red-700 border border-red-200 font-black text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                                <span>Tolak</span>
                              </button>
                            </>
                          ) : (
                            <span className={`text-[10px] font-black px-3.5 py-1.5 rounded-xl border font-mono ${
                              req.status === 'Diterima' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-250 animate-fade-in' 
                                : 'bg-zinc-100 text-[#7c7267] border-zinc-200'
                            }`}>
                              {req.status === 'Diterima' ? '✓ DISETUJUI' : '✗ DITOLAK'}
                            </span>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 📋 ACTIVE BARANG SAYA TABLE - LISTINGS */}
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center pb-2">
                <h3 className="font-extrabold text-lg text-[#1e1c19] tracking-tight">Barang Saya 📦</h3>
                <span className="text-xs text-[#7c7267] font-mono font-semibold">Total {landerItems.length} Terdaftar</span>
              </div>

              <div className="overflow-hidden bg-white border border-[#e6e2da] rounded-3xl text-xs shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#faf9f5] border-b border-[#e6e2da] text-[#7c7267] font-mono font-black uppercase tracking-widest text-[9px]">
                      <th className="p-4">Barang</th>
                      <th className="p-4">Statistik Keaktifan</th>
                      <th className="p-4">Tarif Sewa</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6e2da]">
                    {landerItems.map((li) => (
                      <tr key={li.id} className="hover:bg-[#faf9f6]/95 transition-colors">
                        <td className="p-4 font-bold text-[#1e1c19]">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={li.image} 
                              alt={li.name} 
                              className="w-10 h-10 rounded bg-[#faf9f6]/95 border border-[#e6e2da] object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <span className="truncate max-w-[120px] sm:max-w-xs">{li.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-[#5e584f] font-mono leading-normal font-semibold">
                          <p>👀 {li.views} Dilihat</p>
                          <p className="mt-0.5 text-[#e29c1e] font-black font-sans">✓ {li.rentCount} Kali disewa</p>
                        </td>
                        <td className="p-4 font-mono font-extrabold text-[#e29c1e]">
                          Rp {li.pricePerDay.toLocaleString('id-ID')}/hari
                        </td>
                        <td className="p-4 font-semibold">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] border leading-none ${
                            li.status === 'Tersedia' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-250' 
                              : li.status === 'Sedang Dipinjam' 
                                ? 'bg-amber-50 text-amber-700 border-amber-250' 
                                : 'bg-zinc-100 text-[#7c7267] border-zinc-200'
                          }`}>
                            {li.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* ================= Tambahkan barang baru MODAL ================= */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-[#e6e2da] rounded-3xl p-6 w-full max-w-lg relative space-y-4 text-left shadow-2xl animate-fade-in-up">
            
            <button 
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-[#7c7267] hover:text-[#1e1c19] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="font-extrabold text-lg text-[#1e1c19]">Daftarkan Peralatan Baru 🪄</h3>
              <p className="text-xs text-[#7c7267] leading-tight font-medium">Unggah fungsionalitas barang milikmu ke dalam sistem peer-to-peer kampus.</p>
            </div>

            {/* Quick Presets row */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-black text-[#7c7267] font-mono uppercase block tracking-wider">Presets Pilihan Cepat</span>
              <div className="flex flex-wrap gap-2 text-[10px] font-black">
                <button 
                  type="button"
                  onClick={() => applyDemoItemPreset('Kamera')}
                  className="bg-[#faf9f5] hover:bg-zinc-100 text-[#1e1c19] border border-[#e6e2da] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                >
                  📸 DSLR Preset
                </button>
                <button 
                  type="button"
                  onClick={() => applyDemoItemPreset('Tenda')}
                  className="bg-[#faf9f5] hover:bg-zinc-100 text-[#1e1c19] border border-[#e6e2da] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                >
                  ⛺ Camp Tenda
                </button>
                <button 
                  type="button"
                  onClick={() => applyDemoItemPreset('Buku')}
                  className="bg-[#faf9f5] hover:bg-zinc-100 text-[#1e1c19] border border-[#e6e2da] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                >
                  📚 Buku Purcell
                </button>
              </div>
            </div>

            <form onSubmit={handleAddNewItemSubmit} className="space-y-4 text-xs font-semibold">
              
              <div className="space-y-1 text-left">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono">Nama Peralatan</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mirrorless Sony Alpha A6000"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-[#faf9f6]/95 border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 outline-none font-medium focus:border-[#e9a32c] shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono">Pilih Kategori</label>
                  <select 
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as ItemCategory)}
                    className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 outline-none text-xs"
                  >
                    <option value="Elektronik">Elektronik</option>
                    <option value="Fotografi">Fotografi & DSLR</option>
                    <option value="Outdoor">Outdoor & Hiking</option>
                    <option value="Alat Tulis">Alat Tulis & Buku</option>
                    <option value="Lab">Lab & Mikroskop</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono">Kondisi Fisik</label>
                  <select 
                    value={newItemCondition}
                    onChange={(e) => setNewItemCondition(e.target.value as ItemCondition)}
                    className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 outline-none text-xs"
                  >
                    <option value="Baru">Baru / Istimewa</option>
                    <option value="Sangat Baik">Sangat Baik / Terawat</option>
                    <option value="Bekas">Bekas / Berfungsi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono">Tarif Sewa (/hari)</label>
                  <input 
                    type="number" 
                    required
                    min={5000}
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full bg-[#faf9f6]/95 border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 outline-none font-mono focus:border-[#e9a32c] shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono">Gambar URL (Hotlink)</label>
                  <input 
                    type="text" 
                    required
                    value={newItemImage}
                    onChange={(e) => setNewItemImage(e.target.value)}
                    className="w-full bg-[#faf9f6]/95 border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 outline-[#e9a32c] outline-none text-xs focus:border-[#e9a32c] shadow-inner"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3 text-xs font-bold">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 border border-[#e6e2da] rounded-xl text-[#7c7267] hover:bg-zinc-100 cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] px-5 py-2.5 rounded-xl cursor-pointer font-black shadow"
                >
                  ✓ Daftarkan Alat
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
