import React, { useState, useRef } from 'react';
import { usePinjamIn } from '../context/PinjamInContext';
import { 
  User, Check, ChevronRight, ChevronLeft, Upload, FileText, 
  BookOpen, Phone, MapPin, Sparkles, Building2, Eye, EyeOff
} from 'lucide-react';

export const RegistrationFlow: React.FC = () => {
  const { registerUser, navigateTo } = usePinjamIn();
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nim, setNim] = useState('');
  const [campus, setCampus] = useState('Universitas Jenderal Soedirman');
  const [faculty, setFaculty] = useState('Fakultas Teknik');
  const [department, setDepartment] = useState('Teknik Informatika');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'peminjam' | 'pinjamkan' | 'keduanya'>('keduanya');
  const [ktmFile, setKtmFile] = useState<File | null>(null);
  const [ktmFileName, setKtmFileName] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [pfpUrl, setPfpUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDObWXmXsPR7xkSxfg_XUEe_lvmh_smtdbbgXI50tbLjCzaTZSEXH5AS7Vc_fp5tqPBNDsqX1hubDuYAnGpy-AL58XNQSi6qNs5P7MtvGfu5HZqW7-L-yqtPAiKLYxKeOH1UiDjyHvVdvN4bVy_e4WdqMb833TZS6C62pQOrLlgA37OnofyHfzXwOaCEe0gtDEuajTyz5BfVgcOI876Z1lKATdsWuijpos-jgCw7FVV8DN9M1CDL_0cbZZnei9OWOhHt7vwFWEkl2k'); // default demo smart pfp

  // Errors validation states
  const [emailValidError, setEmailValidError ] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop files upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setKtmFile(file);
      setKtmFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setKtmFile(file);
      setKtmFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Validations & Handlers
  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    
    // Support campus email domain checking specifically for UNSOED domain
    if (!email.toLowerCase().endsWith('.unsoed.ac.id')) {
      setEmailValidError("Mohon gunakan email mahasiswa resmi UNSOED (@mhs.unsoed.ac.id atau @unsoed.ac.id) sebagai prasyarat eksklusif portal.");
      return;
    } else {
      setEmailValidError('');
    }

    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!nim || !campus) {
      return;
    }
    setStep(3);
  };

  const handleCompleteSignUp = () => {
    if (!phone) {
      return;
    }

    // Register user to main Context
    registerUser({
      name,
      email,
      campus,
      nim,
      faculty,
      department,
      phone,
      role,
      pfp: pfpUrl
    });
  };

  // Skip options for easy demo experience
  const handleFillDemoValues = () => {
    setName("Arief Rachman Soedirman");
    setEmail("arief.rachman@mhs.unsoed.ac.id");
    setPassword("UNSOEDHebat123!");
    setNim("H1D021002");
    setCampus("Universitas Jenderal Soedirman");
    setFaculty("Fakultas Teknik");
    setDepartment("Teknik Informatika");
    setPhone("081395874122");
    setKtmFileName("ktm_arief_rachman.pdf");
    setRole("keduanya");
  };

  return (
    <div className="bg-[#f7f6f3] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center text-[#23201d]">
      <div className="w-full max-w-xl bg-white border border-[#e6e2da] rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-lg text-left">
        
        {/* Floating background decorations */}
        <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-[#e9a32c]/5 rounded-full filter blur-xl"></div>
        
        {/* Step-by-step Progress Tracker */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e1c19]">Daftar Akun PinjamIn 👥</h2>
            <button 
              onClick={handleFillDemoValues}
              className="text-[10px] bg-[#fbefd8] hover:bg-[#ebd5a7] text-[#da921a] border border-[#f3ddb3] font-black px-3 py-1.5 rounded-lg transition-colors font-mono cursor-pointer"
            >
              🪄 ISI DATA DEMO CEPAT
            </button>
          </div>
          
          <div className="flex items-center space-x-2.5">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border select-none transition-all ${
                    step >= s 
                      ? 'bg-[#1e1c19] text-[#e9a32c] border-[#1e1c19] shadow' 
                      : 'bg-[#faf9f6]/95 text-zinc-400 border-[#e6e2da]'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4 stroke-[3]" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1.5 rounded-full transition-all ${step > s ? 'bg-[#1e1c19]' : 'bg-[#e6e2da]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-[10px] text-[#7c7267] font-black font-mono tracking-widest uppercase mt-1">
            {step === 1 && "Langkah 1: Detail Akun Dasar"}
            {step === 2 && "Langkah 2: Verifikasi Mahasiswa & KTM"}
            {step === 3 && "Langkah 3: Formalitas Profil Terakhir"}
          </p>
        </div>

        {/* ================= STEP 1: ACCOUNT DETAIL ================= */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px] block">Nama Lengkap</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Arief Rachman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#e9a32c] outline-none shadow-inner"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px] block">Email Kampus Resmi</label>
              <input 
                type="email" 
                required
                placeholder="e.g. aldirio@mhs.unsoed.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#e9a32c] outline-none shadow-inner"
              />
              {emailValidError ? (
                <p className="text-[10px] text-red-700 font-bold bg-red-50 p-2 rounded-xl border border-red-250 mt-2">{emailValidError}</p>
              ) : (
                <p className="text-[9px] text-[#7c7267] italic mt-1 font-mono">Wajib menggunakan domain resmi mahasiswa UNSOED (@mhs.unsoed.ac.id atau @unsoed.ac.id) sebagai syarat verifikasi eksklusif.</p>
              )}
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px] block">Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#e9a32c] outline-none pr-10 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-[#1e1c19]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] font-black px-6 py-3 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow"
              >
                <span>Sertifikasi Mahasiswa</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-xs text-[#7c7267] font-semibold">
                Sudah punya akun?{' '}
                <button type="button" onClick={() => navigateTo('landing')} className="text-[#e29c1e] font-black hover:underline cursor-pointer">
                  Mulai Masuk Aplikasi
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ================= STEP 2: VERIFICATION & KTM ================= */}
        {step === 2 && (
          <div className="space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Pilih Kampus</label>
                <select 
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none text-left cursor-pointer"
                >
                  <option value="Universitas Jenderal Soedirman (FT Purbalingga)">UNSOED Blater (Fakultas Teknik)</option>
                  <option value="Universitas Jenderal Soedirman (Grendeng)">UNSOED Grendeng (FEB / FH / FISIP)</option>
                  <option value="Universitas Jenderal Soedirman (Karangwangkal)">UNSOED Karangwangkal (MIPA / FPIK / FP / FK)</option>
                  <option value="Universitas Jenderal Soedirman (Margono)">UNSOED Margono (FK & RSU Margono)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Nomor Induk Mahasiswa (NIM)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 21/476839/TI/22100"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none text-left shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Fakultas</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ilmu Komputer"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none text-left shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Departemen/Prodi</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sistem Informasi"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none text-left shadow-inner"
                />
              </div>
            </div>

            {/* Drag & Drop KTM Upload box */}
            <div className="space-y-1">
              <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Upload Kartu Tanda Mahasiswa (KTM)</label>
              
              <div 
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors max-h-40 overflow-hidden flex flex-col justify-center items-center ${
                  isDragActive 
                    ? 'border-[#e9a32c] bg-[#e9a32c]/10' 
                    : ktmFileName 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-[#e6e2da] hover:border-[#1e1c19] bg-[#faf9f6]'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />

                {ktmFileName ? (
                  <div className="space-y-2">
                    <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full inline-block border border-emerald-250">
                      <FileText className="w-5 h-5 animate-pulse text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1e1c19] truncate max-w-xs">{ktmFileName}</p>
                      <p className="text-[10px] text-emerald-700 font-bold font-mono">FILE KTM TERIMPOR DENGAN SEHAT ✓</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-5 h-5 text-zinc-400 animate-bounce mx-auto" />
                    <div>
                      <p className="text-xs font-bold text-[#23201d]">Tarik file KTM Anda ke sini atau <span className="text-[#e29c1e] hover:underline">Pilih File</span></p>
                      <p className="text-[10px] text-[#7c7267] font-mono mt-1">PDF, JPG, PNG Maksimal 5MB. Pastikan foto dan NIM terbaca jelas.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back & Next Navigation Button bar */}
            <div className="pt-2 flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="bg-white hover:bg-zinc-55 text-[#7c7267] font-bold px-4 py-2.5 rounded-xl border border-[#e6e2da] hover:border-[#1e1c19] flex items-center space-x-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button 
                onClick={handleNextStep2}
                className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] font-black px-6 py-2.5 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Langkah Terakhir</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: ROLE & PROFILE PICTURE ================= */}
        {step === 3 && (
          <div className="space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Profile Avatar Selection Box */}
              <div className="space-y-2.5 text-center flex flex-col items-center border border-[#e6e2da] p-4 rounded-2xl bg-[#faf9f5]">
                <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px]">Ganti Foto Mahasiswa</label>
                <div className="relative">
                  <img 
                    src={pfpUrl} 
                    alt="Pfp preview avatar" 
                    className="w-20 h-20 rounded-full border-2 border-[#e9a32c] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#e9a32c] p-1.5 rounded-full text-white cursor-pointer border-2 border-white shadow hover:scale-105"
                       onClick={() => {
                         const rId = Math.floor(Math.random() * 100);
                         setPfpUrl(`https://avatar.iran.liara.run/public/${rId}`);
                       }}>
                    <Sparkles className="w-3.5 h-3.5 text-[#1e1c19] stroke-[2.5]" />
                  </div>
                </div>
                <p className="text-[9px] text-[#7c7267] font-mono mt-0.5">Ketuk bintang untuk ganti avatar mahasiswa.</p>
              </div>

              {/* Whatsapp detail */}
              <div className="space-y-3 flex flex-col justify-center text-left">
                <div className="space-y-1">
                  <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px] flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-[#e9a32c]" />
                    <span>WhatsApp Aktif (COD)</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-[#e6e2da] text-[#1e1c19] rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none text-left focus:border-[#e9a32c] shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Role Options selector */}
            <div className="space-y-2 text-left">
              <label className="text-[#7c7267] font-bold uppercase tracking-wider font-mono text-[9px] block">Pilih peran utama Anda di platform</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Borrower option */}
                <div 
                  onClick={() => setRole('peminjam')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                    role === 'peminjam' 
                      ? 'border-[#e9a32c] bg-[#fbefd8] shadow-inner text-[#1e1c19]' 
                      : 'border-[#e6e2da] hover:border-zinc-300 bg-[#faf9f6]/80 text-[#5e584f]'
                  }`}
                >
                  <span className="text-xl">🎒</span>
                  <span className="font-extrabold text-xs leading-none">Peminjam</span>
                  <span className="text-[9px] text-[#7c7267] leading-tight">Saya hanya ingin mencari & menyewa barang.</span>
                </div>

                {/* Lender option */}
                <div 
                  onClick={() => setRole('pinjamkan')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                    role === 'pinjamkan' 
                      ? 'border-[#e9a32c] bg-[#fbefd8] shadow-inner text-[#1e1c19]' 
                      : 'border-[#e6e2da] hover:border-zinc-300 bg-[#faf9f6]/80 text-[#5e584f]'
                  }`}
                >
                  <span className="text-xl">🛡️</span>
                  <span className="font-extrabold text-xs leading-none">Penyewa</span>
                  <span className="text-[9px] text-[#7c7267] leading-tight">Saya ingin mendaftarkan barang saya.</span>
                </div>

                {/* Both option */}
                <div 
                  onClick={() => setRole('keduanya')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-1.5 ${
                    role === 'keduanya' 
                      ? 'border-[#e9a32c] bg-[#fbefd8] shadow-inner text-[#1e1c19]' 
                      : 'border-[#e6e2da] hover:border-zinc-300 bg-[#faf9f6]/80 text-[#5e584f]'
                  }`}
                >
                  <span className="text-xl">✨</span>
                  <span className="font-extrabold text-xs leading-none">Keduanya</span>
                  <span className="text-[9px] text-[#7c7267] leading-tight font-medium">Saya meminjam sekaligus menyewakan.</span>
                </div>
              </div>
            </div>

            {/* Back & Submit onboarding Buttons bar */}
            <div className="pt-2 flex justify-between">
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="bg-white hover:bg-zinc-55 text-[#7c7267] font-bold px-4 py-2.5 rounded-xl border border-[#e6e2da] hover:border-[#1e1c19] flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button 
                type="button"
                onClick={handleCompleteSignUp}
                className="bg-[#1e1c19] hover:bg-black text-[#e9a32c] font-black px-6 py-2.5 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Masuk Kampus Hub</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
