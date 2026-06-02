import React, { useState, useMemo } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  Search, SlidersHorizontal, MapPin, Star, History, Compass, 
  RotateCcw, Sparkles, Navigation, Check, ShieldCheck, Heart
} from 'lucide-react';
import { Item, ItemCategory, ItemCondition } from '../types';

export const BrowseItems: React.FC = () => {
  const { items, navigateTo, toggleWishlist, wishlist } = usePinjamIn();
  
  // States of search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'terpopuler' | 'terdekat' | 'tarif-rendah' | 'tarif-tinggi'>('terpopuler');
  
  // Filter sidebar states
  const [selectedCats, setSelectedCats] = useState<ItemCategory[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(150000); // default slider limit
  const [selectedConditions, setSelectedConditions] = useState<ItemCondition[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);

  // Category and campus helper sets
  const categoriesList: ItemCategory[] = ['Elektronik', 'Fotografi', 'Outdoor', 'Alat Tulis', 'Lab'];
  const campusList = [
    'FEB Grendeng, UNSOED',
    'FISIP Grendeng, UNSOED',
    'FH Grendeng, UNSOED',
    'Koperma UNSOED Grendeng',
    'MIPA Karangwangkal, UNSOED',
    'FPIK Karangwangkal, UNSOED',
    'FIB Karangwangkal, UNSOED',
    'Fakultas Pertanian, Karangwangkal',
    'FT Purbalingga (Blater)',
    'Perpustakaan Pusat UNSOED'
  ];

  // Toggle Category Filter
  const handleCatToggle = (cat: ItemCategory) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Condition
  const handleConditionToggle = (cond: ItemCondition) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  // Toggle Campus location Filter
  const handleCampusToggle = (camp: string) => {
    setSelectedCampuses(prev => 
      prev.includes(camp) ? prev.filter(c => c !== camp) : [...prev, camp]
    );
  };

  // Reset Filters trigger
  const handleResetFilters = () => {
    setSelectedCats([]);
    setMaxPrice(150000);
    setSelectedConditions([]);
    setSelectedCampuses([]);
    setSearchQuery('');
  };

  // Memoized Search and filtering logic
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search query match (name, owner, location, category)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.ownerName.toLowerCase().includes(q)
      );
    }

    // Categories filter
    if (selectedCats.length > 0) {
      result = result.filter(item => selectedCats.includes(item.category));
    }

    // Price slider filter
    result = result.filter(item => item.price <= maxPrice);

    // Condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(item => selectedConditions.includes(item.condition));
    }

    // Campuses filter
    if (selectedCampuses.length > 0) {
      result = result.filter(item => selectedCampuses.includes(item.location));
    }

    // Sorting implementations
    if (selectedSort === 'terpopuler') {
      result.sort((a, b) => (b.rentCount || 0) - (a.rentCount || 0));
    } else if (selectedSort === 'terdekat') {
      result.sort((a, b) => a.distance - b.distance);
    } else if (selectedSort === 'tarif-rendah') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'tarif-tinggi') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, searchQuery, selectedCats, maxPrice, selectedConditions, selectedCampuses, selectedSort]);

  return (
    <div className="bg-[#f7f6f3] min-h-screen text-[#23201d]">
      
      {/* 🔍 Segment 1: Light Mode Filters and Sorting Bar */}
      <div className="bg-white border-b border-[#e6e2da] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Main search input field */}
          <div className="relative w-full md:max-w-xl text-left">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c7267] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari iPad, Kamera DSLR, Tenda Eiger, dsb..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#faf9f6]/95 border border-[#e6e2da] text-[#1e1c19] focus:border-[#e9a32c] rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Sorter Selector */}
          <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-1 no-scrollbar shrink-0 justify-end">
            <button 
              onClick={() => setSelectedSort('terpopuler')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
                selectedSort === 'terpopuler' 
                  ? 'bg-[#1e1c19] text-white border-[#1e1c19] shadow-md' 
                  : 'bg-[#faf9f5] text-[#7c7267] border-[#e6e2da] hover:border-[#1e1c19]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Terpopuler</span>
            </button>

            <button 
              onClick={() => setSelectedSort('terdekat')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
                selectedSort === 'terdekat' 
                  ? 'bg-[#1e1c19] text-white border-[#1e1c19] shadow-md' 
                  : 'bg-[#faf9f5] text-[#7c7267] border-[#e6e2da] hover:border-[#1e1c19]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Terdekat</span>
            </button>

            <button 
              onClick={() => setSelectedSort('tarif-rendah')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                selectedSort === 'tarif-rendah' 
                  ? 'bg-[#1e1c19] text-white border-[#1e1c19] shadow-md' 
                  : 'bg-[#faf9f5] text-[#7c7267] border-[#e6e2da] hover:border-[#1e1c19]'
              }`}
            >
              Tarif Terendah
            </button>

            <button 
              onClick={() => setSelectedSort('tarif-tinggi')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                selectedSort === 'tarif-tinggi' 
                  ? 'bg-[#1e1c19] text-white border-[#1e1c19] shadow-md' 
                  : 'bg-[#faf9f5] text-[#7c7267] border-[#e6e2da] hover:border-[#1e1c19]'
              }`}
            >
              Tarif Tertinggi
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= SIDEBAR FILTERS ================= */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#e6e2da] p-5 rounded-3xl space-y-6 text-left shadow-sm">
              
              <div className="flex justify-between items-center pb-3 border-b border-[#f4f3ef]">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#e9a32c]" />
                  <span className="font-extrabold text-xs sm:text-sm text-[#1e1c19] uppercase font-mono tracking-wider">Filter Alat</span>
                </div>
                <button 
                  onClick={handleResetFilters}
                  className="text-[10px] font-black text-[#7c7267] hover:text-[#e9a32c] hover:underline flex items-center space-x-1 cursor-pointer uppercase"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Categorization */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Pilih Kategori</h4>
                <div className="space-y-2.5">
                  {categoriesList.map((cat) => {
                    const isChecked = selectedCats.includes(cat);
                    return (
                      <label key={cat} className="flex items-center space-x-2.5 text-xs font-bold text-[#4a463e] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCatToggle(cat)}
                          className="w-4.5 h-4.5 rounded text-white accent-[#e9a32c] border-[#e6e2da] focus:ring-amber-500/20 cursor-pointer"
                        />
                        <span className={isChecked ? 'text-[#1e1c19] font-black' : ''}>{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Maximum rate limits */}
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-[#fcfbfa] p-2.5 rounded-xl border border-[#e6e2da]">
                  <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Maks. Tarif</h4>
                  <span className="text-xs font-black text-[#e29c1e] font-mono">Rp {maxPrice.toLocaleString('id-ID')}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="150000" 
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#e9a32c] cursor-pointer h-1.5 bg-[#f4f3ef] rounded-lg"
                />
                <div className="flex justify-between items-center text-[9px] text-[#7c7267] font-mono font-medium">
                  <span>Rp 10k</span>
                  <span>Rp 150k+</span>
                </div>
              </div>

              {/* Conditions checkboxes */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Kondisi Fisik</h4>
                <div className="space-y-2.5">
                  {(['Baru', 'Sangat Baik', 'Bekas'] as ItemCondition[]).map((cond) => {
                    const isChecked = selectedConditions.includes(cond);
                    return (
                      <label key={cond} className="flex items-center space-x-2.5 text-xs font-bold text-[#4a463e] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleConditionToggle(cond)}
                          className="w-4.5 h-4.5 rounded text-white accent-[#e9a32c] border-[#e6e2da] focus:ring-amber-500/20 cursor-pointer"
                        />
                        <span className={isChecked ? 'text-[#1e1c19] font-black' : ''}>{cond}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Campus Locations checkboxes */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-[#7c7267] uppercase tracking-widest font-mono">Lokasi Kampus</h4>
                <div className="space-y-2.5">
                  {campusList.map((camp) => {
                    const isChecked = selectedCampuses.includes(camp);
                    return (
                      <label key={camp} className="flex items-center space-x-2.5 text-xs font-bold text-[#4a463e] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCampusToggle(camp)}
                          className="w-4.5 h-4.5 rounded text-white accent-[#e9a32c] border-[#e6e2da] cursor-pointer"
                        />
                        <span className={isChecked ? 'text-[#1e1c19] font-black' : ''}>{camp}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Reset Actions */}
              <div className="pt-2">
                <button 
                  onClick={() => handleResetFilters()}
                  className="w-full bg-[#fcfbfa] hover:bg-[#faf9f5] text-[#1e1c19] font-black py-2.5 rounded-xl text-xs border border-[#e6e2da] hover:border-[#1e1c19] cursor-pointer"
                >
                  Bersihkan Aturan Filter
                </button>
              </div>

            </div>
          </aside>

          {/* ================= CATALOG RESULTS GRID ================= */}
          <main className="lg:col-span-3 space-y-6 text-left">
            
            {/* Header metrics label */}
            <div className="flex justify-between items-center bg-white border border-[#e6e2da] p-4 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-[#4a463e] font-mono">
                Menyajikan <strong className="text-[#1c1a17] font-black">{filteredAndSortedItems.length}</strong> alat siap sewa
              </span>
              <span className="text-[9px] bg-[#e9a32c]/10 text-[#da921a] font-mono font-black px-3 py-1 rounded-full uppercase border border-[#e9a32c]/20 tracking-wider">
                Saling Percaya ✓
              </span>
            </div>

            {/* Empty view block */}
            {filteredAndSortedItems.length === 0 ? (
              <div className="bg-white border border-dashed border-[#e6e2da] p-12 rounded-3xl text-center space-y-4">
                <span className="text-4xl">😿</span>
                <h3 className="text-lg font-black text-[#1e1c19]">Alat Tidak Ditemukan</h3>
                <p className="text-xs text-[#7c7267] max-w-sm mx-auto leading-relaxed">
                  Kami tidak faham kata kunci atau kriteria saringan sewa yang Anda terapkan. Silakan ubah pengaturan filter untuk menjajaki barang lainnya.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-[#e9a32c] text-[#1e1c19] text-xs font-extrabold px-5 py-3 rounded-xl hover:bg-[#da921a] transition-all cursor-pointer shadow-md"
                >
                  Reset / Bersihkan Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedItems.map((item) => {
                  const isWished = wishlist.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      className="bg-white border border-[#e6e2da] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#e9a32c] flex flex-col h-full text-left"
                    >
                      {/* Image header segment */}
                      <div className="relative aspect-[16/10] bg-[#faf9f6] overflow-hidden border-b border-[#e6e2da]">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Custom status overlay badge */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                          <span className="bg-[#1e1c19]/90 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                            item.status === 'Tersedia' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-zinc-100 text-[#7c7267] border-zinc-200'
                          }`}>
                            {item.status === 'Tersedia' ? 'Tersedia ✓' : 'Habis Terpinjam'}
                          </span>
                        </div>

                        {/* Favorite button */}
                        <button 
                          onClick={() => toggleWishlist(item.id)}
                          className="absolute top-3 right-3 p-2 bg-white text-zinc-400 rounded-full border border-[#e6e2da] shadow-sm hover:text-red-500 transition-colors cursor-pointer animate-fade-in"
                        >
                          <svg className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : ''}`} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info layout payload */}
                      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                        <div className="space-y-1.5 text-left">
                          <div className="flex justify-between items-start gap-1">
                            <h3 className="font-extrabold text-sm text-[#111111] leading-tight line-clamp-2">
                              {item.name}
                            </h3>
                            <span className="text-[9px] font-bold bg-[#f3efe6] text-[#7c7267] border border-[#e6e2da] px-2 py-0.5 rounded shrink-0 font-mono">
                              {item.condition}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1.5 text-xs text-[#7c7267] font-medium">
                            <Navigation className="w-3.5 h-3.5 text-[#e9a32c] shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>

                        {/* Owner contact card row */}
                        <div className="flex items-center space-x-2 pt-3.5 border-t border-[#f4f3ef]">
                          {item.ownerPfp ? (
                            <img 
                              src={item.ownerPfp} 
                              alt={item.ownerName} 
                              className="w-7 h-7 rounded-full object-cover border border-[#e9a32c]"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#f3efe6] text-[#e9a32c] flex items-center justify-center font-black text-[10px] border border-[#e9a32c]">
                              {item.ownerName.charAt(0)}
                            </div>
                          )}
                          <div className="text-[10px] leading-tight flex-grow text-left">
                            <p className="font-bold text-[#1e1c19] truncate flex items-center space-x-0.5">
                              <span>{item.ownerName}</span>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#e9a32c] shrink-0" />
                            </p>
                            <p className="text-[#7c7267] font-medium">Mahasiswa Aktif</p>
                          </div>
                          <div className="flex items-center space-x-0.5 bg-[#faf9f6] text-[#e29c1e] px-1.5 py-0.5 rounded border border-[#e6e2da] font-bold text-[9px]">
                            <Star className="w-2.5 h-2.5 fill-[#e9a32c] text-[#e9a32c]" />
                            <span>{item.ownerRating}</span>
                          </div>
                        </div>

                        {/* Price rate and link action */}
                        <div className="pt-3.5 border-t border-[#f4f3ef] flex justify-between items-center bg-transparent mt-1">
                          <div className="text-left">
                            <p className="text-[8px] text-[#7c7267] uppercase font-mono font-bold leading-none">Tarif Sewa</p>
                            <p className="text-sm font-extrabold text-[#e29c1e] font-mono leading-none mt-1">
                              Rp {item.price.toLocaleString('id-ID')}
                              <span className="text-[10px] text-[#7c7267] font-sans font-normal">/hari</span>
                            </p>
                          </div>

                          <button 
                            onClick={() => navigateTo('item-detail', item)}
                            className="bg-[#1e1c19] hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                          >
                            Detail Alat
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
