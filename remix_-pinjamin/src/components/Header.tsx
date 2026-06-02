import React, { useState } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  Menu, X, Sparkles, LogOut, LayoutDashboard, PlusCircle, 
  ChevronDown, Phone, Mail, Award, BookOpen, GraduationCap
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, activeScreen, navigateTo, logout, loginDemoUser } = usePinjamIn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Custom UNSOED login modal state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    // UNSOED Email Domain Check
    if (!loginEmail.toLowerCase().endsWith('.unsoed.ac.id')) {
      setLoginError("Masuk dibatasi! Portal khusus civitas akademik UNSOED (@mhs.unsoed.ac.id atau @unsoed.ac.id).");
      return;
    }
    
    setLoginError('');
    const success = await loginDemoUser(loginEmail, loginPassword);
    if (success) {
      setLoginModalOpen(false);
    } else {
      setLoginError("Gagal otentikasi. Silakan periksa kembali email dan kata sandi Anda.");
    }
  };

  // Helper to determine active CSS state
  const isActive = (screenName: string) => {
    if (activeScreen === screenName) {
      return "text-[#e9a32c] font-black border-b-2 border-[#e9a32c] pb-2 text-[14px]";
    }
    return "text-[#4a463e] font-medium hover:text-[#e9a32c] transition-all duration-150 pb-2 text-[14px]";
  };

  const handleCaraKerjaClick = () => {
    navigateTo('landing');
    setTimeout(() => {
      const element = document.getElementById('carakerja');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="w-full flex flex-col z-50">
      {/* 🌟 Topmost Micro Bar (As seen in premium corporate-academic mockup designs) */}
      <div className="w-full bg-[#1e1c19] text-[#e5e2da] py-2 px-4 border-b border-[#2e2b26] text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-[#e9a32c]" />
              <span>+62 821-3456-7890</span>
            </span>
            <span className="flex items-center space-x-1">
              <Mail className="w-3 h-3 text-[#e9a32c]" />
              <span className="underline select-all">info@pinjamin.id</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-yellow-400">
              <Award className="w-3 h-3 animate-bounce" />
              <span>Ekosistem P2P Universitas Jenderal Soedirman Excl.</span>
            </span>
            <span className="hidden md:inline text-zinc-500">|</span>
            <span className="hidden md:inline">Kampus Purwokerto • Blater</span>
          </div>
        </div>
      </div>

      {/* 🚀 Main Header Navigation (Light background matching mockup) */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e6e2da] shadow-[0_2px_15px_rgba(35,32,29,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo Brand (Hexagon Shape with P matching screenshot style) */}
            <div 
              onClick={() => navigateTo('landing')} 
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
            >
              <div className="flex items-center justify-center bg-[#e9a32c] text-white font-extrabold w-10 h-10 rounded-xl shadow-[0_4px_12px_rgba(233,163,44,0.3)] transform group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#1e1c19]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#1e1c19] tracking-tight font-sans">
                  Pinjam<span className="text-[#e29c1e]">In</span>
                </span>
                <span className="block text-[8px] font-bold text-[#7c7267] tracking-widest uppercase -mt-1">
                  KAMPUS SHARING
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menu (Mockup: Beranda, Jelajahi, Cara Kerja, Peminjaman, Blog, Kontak) */}
            <nav className="hidden md:flex space-x-7 items-end h-full pb-4">
              <button 
                onClick={() => navigateTo('landing')} 
                className={isActive('landing')}
              >
                Beranda
              </button>
              <button 
                onClick={() => navigateTo('browse')} 
                className={isActive('browse')}
              >
                Jelajahi
              </button>
              <button 
                onClick={handleCaraKerjaClick} 
                className="text-[#4a463e] font-medium hover:text-[#e9a32c] transition-all duration-150 pb-2 text-[14px]"
              >
                Cara Kerja
              </button>
              <button 
                onClick={() => {
                  if (user) {
                    navigateTo('borrower-dashboard');
                  } else {
                    // Prompt user to log in or register before accessing the dashboard
                    setLoginModalOpen(true);
                  }
                }} 
                className={isActive('borrower-dashboard')}
              >
                Peminjaman
              </button>
              <button 
                onClick={() => navigateTo('landing')} 
                className="text-[#4a463e] font-medium hover:text-[#e9a32c] transition-all duration-150 pb-2 text-[14px]"
              >
                Blog
              </button>
              <button 
                onClick={() => {
                  alert("Hubungi kami di info@pinjamin.id atau telepon +62 821-3456-7890");
                }} 
                className="text-[#4a463e] font-medium hover:text-[#e9a32c] transition-all duration-150 pb-2 text-[14px]"
              >
                Kontak
              </button>
            </nav>

            {/* Header Action Buttons (Light Theme styled) */}
            <div className="hidden md:flex items-center space-x-3.5">
              {user ? (
                <div className="relative">
                  {/* Profile Widget Trigger */}
                  <div className="flex items-center space-x-3 bg-[#fcfbfa] border border-[#e6e2da] pl-2.5 pr-4 py-1.5 rounded-full hover:bg-[#faf9f5] hover:border-[#da921a] transition-all cursor-pointer select-none"
                       onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                    {user.pfp ? (
                      <img 
                        src={user.pfp} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full border border-[#e9a32c] object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#faf9f5] text-[#e9a32c] flex items-center justify-center font-bold text-sm border border-[#e9a32c]">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left max-w-[130px]">
                      <p className="text-xs font-bold leading-tight truncate text-[#1e1c19]">{user.name}</p>
                      <p className="text-[10px] text-[#e9a32c] font-semibold truncate leading-tight font-mono">{user.campus}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#7c7267]" />
                  </div>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-xl border border-[#e6e2da] overflow-hidden py-1.5 z-50">
                      <div className="px-4 py-3 bg-[#faf9f5] border-b border-[#e6e2da]">
                        <p className="text-[10px] text-[#7c7267] uppercase tracking-wide font-bold font-mono">NIM {user.nim || "21/47890/UM"}</p>
                        <p className="text-xs text-[#4a463e] font-semibold truncate mt-0.5">{user.faculty || "Fakultas Teknik"}</p>
                        <span className="inline-block bg-[#f3efe6] text-[#7c7267] text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 border border-[#e6e2da]">
                          Status Terverifikasi ✓
                        </span>
                      </div>

                      <button 
                        onClick={() => { navigateTo('borrower-dashboard'); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4a463e] hover:bg-[#faf9f5] hover:text-[#e9a32c] flex items-center space-x-2.5"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#e9a32c]" />
                        <span className="font-semibold text-xs text-[#1e1c19]">Dashboard Peminjam</span>
                      </button>

                      <button 
                        onClick={() => { navigateTo('lender-dashboard'); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4a463e] hover:bg-[#faf9f5] hover:text-[#e9a32c] flex items-center space-x-2.5"
                      >
                        <PlusCircle className="w-4 h-4 text-[#e9a32c]" />
                        <span className="font-semibold text-xs text-[#1e1c19]">Dashboard Lender</span>
                      </button>

                      <div className="border-t border-[#e6e2da] my-1"></div>

                      <button 
                        onClick={() => { logout(); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2.5 font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs">Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setLoginModalOpen(true)}
                    className="px-4 py-2 text-sm font-bold text-[#1e1c19] hover:text-[#e9a32c] border-2 border-[#e6e2da] hover:border-[#e9a32c] rounded-xl transition-all cursor-pointer bg-[#faf9f5]"
                  >
                    Masuk
                  </button>
                  <button 
                    onClick={() => navigateTo('register')}
                    className="bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] text-sm font-black px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-[0_4px_14px_rgba(233,163,44,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#1e1c19]" />
                    <span>Daftar Gratis</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {user && (
                <div className="flex items-center bg-[#faf9f5] border border-[#e6e2da] px-2 py-1 rounded-full mr-1">
                  <img 
                    src={user.pfp} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-[#1e1c19] hover:bg-[#faf9f5] border border-[#e6e2da] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fcfbfa] border-t border-[#e6e2da] py-4 px-4 space-y-3.5 shadow-xl">
            <button 
              onClick={() => { navigateTo('landing'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3.5 py-2 rounded-xl font-bold text-[#1e1c19] hover:bg-[#faf9f5] hover:text-[#e9a32c]"
            >
              Beranda
            </button>
            <button 
              onClick={() => { navigateTo('browse'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3.5 py-2 rounded-xl font-bold text-[#1e1c19] hover:bg-[#faf9f5] hover:text-[#e9a32c]"
            >
              Jelajahi
            </button>
            <button 
              onClick={() => { handleCaraKerjaClick(); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3.5 py-2 rounded-xl font-bold text-[#1e1c19] hover:bg-[#faf9f5] hover:text-[#e9a32c]"
            >
              Cara Kerja
            </button>
            
            {user ? (
              <>
                <button 
                  onClick={() => { navigateTo('borrower-dashboard'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3.5 py-2 rounded-xl font-bold text-[#1e1c19] hover:bg-[#faf9f5]"
                >
                  Peminjaman Saya
                </button>
                <button 
                  onClick={() => { navigateTo('lender-dashboard'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3.5 py-2 rounded-xl font-bold text-[#1e1c19] hover:bg-[#faf9f5]"
                >
                  Lender Panel
                </button>
                <div className="border-t border-[#e6e2da] my-2 pt-2"></div>
                <p className="px-3.5 text-xs text-[#7c7267] font-mono leading-none">NIM: {user.nim}</p>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3.5 py-2 rounded-xl font-black text-red-650 text-red-650 text-red-600 hover:bg-red-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full text-center px-4 py-2 border border-[#e6e2da] rounded-xl text-xs font-bold bg-[#faf9f5] text-[#1e1c19]"
                >
                  Masuk SSO
                </button>
                <button 
                  onClick={() => { navigateTo('register'); setMobileMenuOpen(false); }}
                  className="w-full text-center px-4 py-2 bg-[#e9a32c] text-[#1e1c19] rounded-xl text-xs font-black shadow"
                >
                  Daftar Gratis
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* 🔐 UNSOED SINGLE SIGN-ON DYNAMIC LOGIN MODAL */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e6e2da] w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-left" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black p-1 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-[#e9a32c] text-[#1e1c19] p-1.5 rounded-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#1e1c19] uppercase tracking-wide">Single Sign-On UNSOED</h3>
                  <p className="text-[10px] text-[#7c7267] font-semibold">Portal Masuk Terpadu Mahasiswa</p>
                </div>
              </div>
              
              <h4 className="text-sm font-extrabold text-[#111111] border-b border-[#e6e2da] pb-2">Masuk ke PinjamIn</h4>
              
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#7c7267]">Email Mahasiswa / Civitas</label>
                  <input 
                    type="email"
                    required
                    placeholder="e.g. aldirio@mhs.unsoed.ac.id"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#faf9f6]/90 border border-[#e6e2da] text-xs font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-[#e9a32c] text-[#1e1c19]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#7c7267]">Kata Sandi</label>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#faf9f6]/90 border border-[#e6e2da] text-xs font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-[#e9a32c] text-[#1e1c19]"
                  />
                </div>

                {loginError && (
                  <p className="text-[10px] text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 font-bold leading-relaxed">{loginError}</p>
                )}

                <div className="bg-[#faf9f5] border border-yellow-200/50 p-3 rounded-2xl text-[10px] text-[#7c7267] leading-relaxed">
                  <span className="font-extrabold text-[#e29c1e] block mb-0.5">💡 DEMO CREDENTIAL AUTOFIL:</span>
                  Klik pintasan di bawah untuk mengisi akun mahasiswa uji UNSOED otomatis:<br />
                  <button 
                    type="button"
                    onClick={() => {
                      setLoginEmail("aldirio@mhs.unsoed.ac.id");
                      setLoginPassword("unsoed123");
                      setLoginError('');
                    }}
                    className="mt-1.5 inline-block text-[9px] font-black uppercase bg-[#1e1c19] hover:bg-black text-[#e9a32c] px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-sm"
                  >
                    🔑 Isi Akun Aldi Prabowo
                  </button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#e9a32c] hover:bg-[#da921a] text-[#1e1c19] text-xs font-black py-3 rounded-xl transition-colors shadow-lg shadow-yellow-500/10 cursor-pointer"
                >
                  Otentikasi Akun UNSOED Masuk
                </button>
              </form>
              
              <div className="text-center pt-1 border-t border-[#f4f3ef]">
                <p className="text-[10px] text-[#7c7267] font-semibold">
                  Belum memiliki akun?{' '}
                  <button 
                    onClick={() => { setLoginModalOpen(false); navigateTo('register'); }} 
                    className="text-[#e29c1e] font-black hover:underline cursor-pointer"
                  >
                    Registrasi KTM (Buka 24 Jam)
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
