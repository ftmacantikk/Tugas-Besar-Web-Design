import React, { useState } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { ShieldCheck, Send, GraduationCap, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = usePinjamIn();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubsubscribed(true);
      setNewsEmail('');
    }
  };

  return (
    <footer className="bg-[#eae7e1] text-[#4a463e] border-t border-[#d9d4cc] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Main Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#d9d4cc]">
          
          {/* Col 1: About Brand */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div 
              onClick={() => navigateTo('landing')} 
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
            >
              <div className="flex items-center justify-center bg-[#e9a32c] text-white font-extrabold w-9 h-9 rounded-xl shadow-md">
                <GraduationCap className="w-5 h-5 text-[#1e1c19]" />
              </div>
              <span className="text-xl font-black text-[#1e1c19] tracking-tight">
                Pinjam<span className="text-[#e29c1e]">In</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-[13px] text-[#5e584f] leading-relaxed font-medium">
              Platform gotong-royong digital mahasiswa Indonesia. Saling bantu meminjam dan meminjamkan peralatan berkualitas tinggi antar teman sekampus demi menekan biaya pendidikan serta mendukung ekonomi sirkular.
            </p>

            <div className="inline-flex items-center space-x-1.5 text-xs text-[#2c2924] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#e29c1e]" />
              <span>Sistem Terverifikasi Kampus Resmi</span>
            </div>
          </div>

          {/* Col 2: Perusahaan */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-black text-[#1e1c19] uppercase tracking-wider font-mono mb-4">
              Perusahaan
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#5e584f] font-semibold">
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Tentang Kami</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Karit Kampus</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Kontak Hub</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Mitra Akademis</button></li>
            </ul>
          </div>

          {/* Col 3: Dukungan */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-black text-[#1e1c19] uppercase tracking-wider font-mono mb-4">
              Dukungan
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#5e584f] font-semibold">
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Pusat Bantuan</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Syarat Ketentuan</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Kebijakan Privasi</button></li>
              <li><button onClick={() => navigateTo('landing')} className="hover:text-[#e9a32c] transition-colors cursor-pointer">Keamanan COD</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 text-left space-y-3">
            <h4 className="text-xs font-black text-[#1e1c19] uppercase tracking-wider font-mono">
              Langganan Newsletter
            </h4>
            <p className="text-xs text-[#5e584f] leading-snug font-medium">
              Dapatkan info penawaran sewa alat terpopuler dan update promo gratis ongkir kampus harian.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#e9a32c]/10 text-[#da921a] rounded-xl text-xs font-bold border border-[#e9a32c]/20">
                Terima kasih! Email Anda telah terdaftar ✓
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="name@emailkampus.ac.id" 
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="flex-grow bg-white text-xs text-[#1e1c19] border border-[#d9d4cc] rounded-xl px-3 py-2.5 outline-none focus:border-[#e9a32c] font-medium"
                />
                <button 
                  type="submit"
                  className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar with Madura & Bandung Perjuangan tagline requested */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#7c7267] font-mono">
          <p>© 2026 PinjamIn Indonesia. All rights reserved. | Madura & Bandung Perjuangan 🇮🇩</p>
          <div className="flex space-x-4 mt-3 sm:mt-0 font-bold">
            <span className="hover:text-[#e9a32c] cursor-pointer">• Berbagi Hemat</span>
            <span className="hover:text-[#e9a32c] cursor-pointer">• Saling Percaya</span>
            <span className="hover:text-[#e9a32c] cursor-pointer">• Berdikari Kampus</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
