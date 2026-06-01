import { useState, useEffect } from "react";

// ========== DESIGN TOKENS ==========
const colors = {
  // Indonesian Batik palette
  emas: "#C9A84C",       // Emas keemasan
  emaSoft: "#E8C878",
  emasLight: "#F5E6BC",
  tenun: "#8B4513",      // Coklat tenun
  tenunDark: "#5C2D0A",
  batik: "#1A472A",      // Hijau batik
  batikLight: "#2D7A3E",
  krem: "#FAF3E8",       // Krem lembut
  kremDark: "#F0E2C8",
  ivory: "#FFFDF7",
  tua: "#2C1A0E",        // Coklat tua
  tuaMuted: "#6B4226",
  accent: "#C0392B",     // Merah saga
  accentLight: "#E57373",
  lavender: "#7B5EA7",   // Ungu batik
  textDark: "#1A0F05",
  textMid: "#4A2E1A",
  textLight: "#8B6345",
  surface: "#FEFCF8",
  surfaceCard: "#FFFEF9",
  border: "rgba(201,168,76,0.25)",
  borderStrong: "rgba(201,168,76,0.5)",
};

const motifBg = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.06'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const batikCorner = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.15'%3E%3Cpath d='M0 0Q40 0 40 40Q40 0 80 0'/%3E%3Ccircle cx='0' cy='0' r='20' fill='none' stroke='%23C9A84C' stroke-opacity='0.2' stroke-width='1'/%3E%3Ccircle cx='0' cy='0' r='35' fill='none' stroke='%23C9A84C' stroke-opacity='0.1' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`;

// ========== GLOBAL STYLES ==========
const injectStyles = () => {
  if (document.getElementById("undangan-styles")) return;
  const s = document.createElement("style");
  s.id = "undangan-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@300;400;500;600&display=swap');
    
    .undangan-root * { box-sizing: border-box; margin: 0; padding: 0; }
    .undangan-root { font-family: 'Nunito', sans-serif; background: ${colors.krem}; min-height: 100vh; color: ${colors.textDark}; }
    
    .batik-divider {
      width: 100%; height: 8px;
      background: repeating-linear-gradient(90deg, ${colors.emas} 0px, ${colors.emas} 4px, transparent 4px, transparent 12px, ${colors.emaSoft} 12px, ${colors.emaSoft} 16px, transparent 16px, transparent 24px);
      opacity: 0.6;
    }
    
    .btn-emas {
      background: linear-gradient(135deg, ${colors.emas}, ${colors.emaSoft});
      color: ${colors.tua}; border: none; padding: 10px 24px; border-radius: 4px;
      font-family: 'Nunito', sans-serif; font-weight: 600; font-size: 13px;
      cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(201,168,76,0.3);
    }
    .btn-emas:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(201,168,76,0.4); }
    
    .btn-ghost {
      background: transparent; color: ${colors.emas};
      border: 1px solid ${colors.borderStrong}; padding: 9px 20px; border-radius: 4px;
      font-family: 'Nunito', sans-serif; font-weight: 500; font-size: 13px;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-ghost:hover { background: ${colors.emasLight}; }
    
    .btn-danger {
      background: transparent; color: ${colors.accent};
      border: 1px solid rgba(192,57,43,0.3); padding: 7px 16px; border-radius: 4px;
      font-family: 'Nunito', sans-serif; font-weight: 500; font-size: 12px;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-danger:hover { background: rgba(192,57,43,0.08); }
    
    .card {
      background: ${colors.surfaceCard};
      border: 1px solid ${colors.border};
      border-radius: 8px;
      box-shadow: 0 2px 16px rgba(44,26,14,0.06);
    }
    
    .input-field {
      width: 100%; padding: 10px 14px; border: 1px solid ${colors.border};
      border-radius: 4px; background: ${colors.ivory}; font-family: 'Nunito', sans-serif;
      font-size: 13px; color: ${colors.textDark}; outline: none; transition: border 0.2s;
    }
    .input-field:focus { border-color: ${colors.emas}; }
    
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    }
    .badge-emas { background: ${colors.emasLight}; color: ${colors.tenunDark}; }
    .badge-batik { background: rgba(45,122,62,0.12); color: ${colors.batik}; }
    .badge-accent { background: rgba(192,57,43,0.1); color: ${colors.accent}; }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .fade-in { animation: fadeIn 0.35s ease forwards; }
    
    @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
    .shimmer { animation: shimmer 2s ease-in-out infinite; }
    
    .nav-item { 
      display: flex; align-items: center; gap: 8px; padding: 10px 16px;
      border-radius: 6px; cursor: pointer; transition: all 0.15s;
      font-size: 13px; font-weight: 500; color: ${colors.textLight};
      text-decoration: none;
    }
    .nav-item:hover { background: ${colors.emasLight}; color: ${colors.tenunDark}; }
    .nav-item.active { background: linear-gradient(135deg, ${colors.emas}22, ${colors.emasLight}); color: ${colors.tenunDark}; font-weight: 600; }
    
    .stat-card {
      background: ${colors.surfaceCard}; border: 1px solid ${colors.border};
      border-radius: 8px; padding: 20px; position: relative; overflow: hidden;
    }
    .stat-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, ${colors.emas}, ${colors.emaSoft});
    }
    
    .template-card {
      border-radius: 10px; overflow: hidden; cursor: pointer;
      transition: all 0.25s; border: 2px solid transparent;
      background: ${colors.surfaceCard};
      box-shadow: 0 2px 12px rgba(44,26,14,0.08);
    }
    .template-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(44,26,14,0.15); }
    .template-card.selected { border-color: ${colors.emas}; }
    
    .guest-row { 
      display: grid; grid-template-columns: 1fr 1fr auto auto; gap: 12px; 
      align-items: center; padding: 12px 16px;
      border-bottom: 1px solid ${colors.border};
    }
    .guest-row:last-child { border-bottom: none; }
    .guest-row:hover { background: ${colors.krem}; }
    
    .preview-modal {
      position: fixed; inset: 0; background: rgba(26,15,5,0.85);
      display: flex; align-items: center; justify-content: center; z-index: 1000;
      backdrop-filter: blur(4px);
    }
    
    .scroll-thin::-webkit-scrollbar { width: 4px; }
    .scroll-thin::-webkit-scrollbar-track { background: transparent; }
    .scroll-thin::-webkit-scrollbar-thumb { background: ${colors.borderStrong}; border-radius: 2px; }
    
    .topbar-link { color: ${colors.textLight}; font-size: 13px; font-weight: 500; cursor: pointer; transition: color 0.15s; }
    .topbar-link:hover { color: ${colors.emas}; }
  `;
  document.head.appendChild(s);
};

// ========== ICONS (inline SVG) ==========
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    template: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    rsvp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    music: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    gift: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    photo: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    analytics: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    flower: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/></svg>,
  };
  return icons[name] || null;
};

// ========== ORNAMENT COMPONENTS ==========
const BatikOrnament = ({ side = "left", style = {} }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" style={{ opacity: 0.2, ...style }}>
    {side === "left" ? (
      <>
        <path d="M5 40Q30 20 55 40Q30 60 5 40Z" fill={colors.emas} />
        <circle cx="30" cy="40" r="6" fill="none" stroke={colors.emas} strokeWidth="1.5" />
        <path d="M5 25Q30 10 55 25" fill="none" stroke={colors.emas} strokeWidth="1" />
        <path d="M5 55Q30 70 55 55" fill="none" stroke={colors.emas} strokeWidth="1" />
        <circle cx="5" cy="40" r="3" fill={colors.emas} />
        <circle cx="55" cy="40" r="3" fill={colors.emas} />
      </>
    ) : (
      <>
        <path d="M55 40Q30 20 5 40Q30 60 55 40Z" fill={colors.emas} />
        <circle cx="30" cy="40" r="6" fill="none" stroke={colors.emas} strokeWidth="1.5" />
        <path d="M55 25Q30 10 5 25" fill="none" stroke={colors.emas} strokeWidth="1" />
        <path d="M55 55Q30 70 5 55" fill="none" stroke={colors.emas} strokeWidth="1" />
        <circle cx="55" cy="40" r="3" fill={colors.emas} />
        <circle cx="5" cy="40" r="3" fill={colors.emas} />
      </>
    )}
  </svg>
);

const FloralDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${colors.emas}50)` }} />
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M16 4C16 4 20 8 16 12C12 8 16 4 16 4Z" fill={colors.emas} opacity="0.7" />
      <path d="M16 20C16 20 20 16 16 12C12 16 16 20 16 20Z" fill={colors.emas} opacity="0.7" />
      <path d="M4 16C4 16 8 12 12 16C8 20 4 16 4 16Z" fill={colors.emas} opacity="0.7" />
      <path d="M20 16C20 16 24 20 28 16C24 12 20 16 20 16Z" fill={colors.emas} opacity="0.7" />
      <circle cx="16" cy="16" r="3" fill={colors.emas} />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${colors.emas}50, transparent)` }} />
  </div>
);

// ========== TOPBAR ==========
const Topbar = ({ onNavigate, activeView }) => (
  <div style={{
    height: 56, background: colors.tua,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
    borderBottom: `1px solid rgba(201,168,76,0.2)`
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 2L26 8V20L14 26L2 20V8Z" fill={colors.emas} opacity="0.9" />
          <path d="M14 6L22 10V18L14 22L6 18V10Z" fill={colors.tua} />
          <path d="M14 9C14 9 17 11 14 13C11 11 14 9 14 9Z" fill={colors.emas} />
          <path d="M14 17C14 17 17 15 14 13C11 15 14 17 14 17Z" fill={colors.emas} />
          <path d="M9 13C9 13 11 10 13 13C11 16 9 13 9 13Z" fill={colors.emas} />
          <path d="M15 13C15 13 17 16 19 13C17 10 15 13 15 13Z" fill={colors.emas} />
        </svg>
        <span style={{ fontFamily: "'Playfair Display', serif", color: colors.emas, fontSize: 18, fontWeight: 600, letterSpacing: 1 }}>Undangan.id</span>
      </div>
      <div style={{ width: 1, height: 20, background: `rgba(201,168,76,0.3)` }} />
      {["landing", "dashboard", "templates", "guests", "features"].map(view => (
        <span
          key={view}
          className="topbar-link"
          style={{ color: activeView === view ? colors.emas : undefined }}
          onClick={() => onNavigate(view)}
        >
          {view === "landing" ? "Beranda" : view === "dashboard" ? "Dashboard" : view === "templates" ? "Template" : view === "guests" ? "Tamu" : "Fitur"}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button className="btn-ghost" style={{ fontSize: 12, padding: "7px 16px" }}>Masuk</button>
      <button className="btn-emas" onClick={() => onNavigate("dashboard")}>Mulai Gratis</button>
    </div>
  </div>
);

// ========== LANDING PAGE ==========
const LandingPage = ({ onNavigate }) => {
  const [hoverCard, setHoverCard] = useState(null);

  const features = [
    { icon: "template", title: "100+ Template Cantik", desc: "Pilihan template dari berbagai tema: Jawa, Sunda, Bali, modern, dan minimalis.", color: colors.emas },
    { icon: "users", title: "Manajemen Tamu", desc: "Kelola daftar tamu undangan, kirim undangan digital, dan pantau konfirmasi hadir.", color: colors.batikLight },
    { icon: "rsvp", title: "RSVP Digital", desc: "Tamu konfirmasi kehadiran langsung dari undangan. Data tersimpan otomatis.", color: colors.lavender },
    { icon: "music", title: "Musik & Animasi", desc: "Tambahkan musik pengiring dan animasi cantik untuk kesan pertama yang memukau.", color: colors.accent },
    { icon: "map", title: "Integrasi Maps", desc: "Tampilkan lokasi akad & resepsi lengkap dengan navigasi Google Maps.", color: "#2980B9" },
    { icon: "gift", title: "Amplop Digital", desc: "Fitur transfer hadiah digital yang memudahkan tamu memberikan ucapan dan hadiah.", color: colors.tenun },
  ];

  const stats = [
    { num: "50K+", label: "Pasangan bahagia" },
    { num: "100+", label: "Template pilihan" },
    { num: "2M+", label: "Tamu terkirim" },
    { num: "4.9★", label: "Rating rata-rata" },
  ];

  return (
    <div style={{ background: colors.krem }}>
      {/* Hero */}
      <div style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "60px 24px", position: "relative", overflow: "hidden",
        background: `${motifBg}, linear-gradient(180deg, ${colors.tua} 0%, #3D1F08 60%, ${colors.krem} 100%)`,
      }}>
        {/* Top ornament */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <div className="batik-divider" style={{ opacity: 0.4 }} />
        </div>

        {/* Floating ornaments */}
        <div style={{ position: "absolute", left: 40, top: "30%" }}>
          <BatikOrnament side="left" style={{ opacity: 0.15, transform: "scale(1.5)" }} />
        </div>
        <div style={{ position: "absolute", right: 40, top: "30%" }}>
          <BatikOrnament side="right" style={{ opacity: 0.15, transform: "scale(1.5)" }} />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(201,168,76,0.15)", border: `1px solid rgba(201,168,76,0.3)`,
          borderRadius: 20, padding: "6px 16px", marginBottom: 28,
          color: colors.emaSoft, fontSize: 12, letterSpacing: 1,
        }}>
          <Icon name="flower" size={12} color={colors.emas} />
          Platform Undangan Pernikahan #1 di Indonesia
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 700, color: "#FFFDF0",
          lineHeight: 1.15, maxWidth: 720,
          marginBottom: 8,
        }}>
          Undangan Digital
        </h1>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 5vw, 60px)",
          fontWeight: 300, fontStyle: "italic",
          color: colors.emas, lineHeight: 1.2, maxWidth: 720, marginBottom: 28,
        }}>
          Dengan Sentuhan Budaya Nusantara
        </h1>

        <p style={{
          maxWidth: 540, color: "rgba(255,253,240,0.65)",
          fontSize: 16, lineHeight: 1.8, marginBottom: 40,
          fontFamily: "'Nunito', sans-serif", fontWeight: 300,
        }}>
          Buat undangan pernikahan yang memukau dengan ribuan ornamen batik, motif tenun, dan kaligrafi nusantara. Mudah, elegan, dan berkesan.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-emas" style={{ fontSize: 15, padding: "14px 32px", borderRadius: 6 }} onClick={() => onNavigate("templates")}>
            Lihat Template
          </button>
          <button className="btn-ghost" style={{ fontSize: 15, padding: "14px 32px", borderRadius: 6, borderColor: "rgba(201,168,76,0.4)", color: colors.emaSoft }} onClick={() => onNavigate("dashboard")}>
            Buat Undangan
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: colors.emas }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,253,240,0.5)", letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <div className="batik-divider" />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge badge-emas" style={{ marginBottom: 16 }}>Fitur Lengkap</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 600, color: colors.tenunDark, marginBottom: 12 }}>
            Semua yang Kamu Butuhkan
          </h2>
          <p style={{ color: colors.textLight, fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            Platform terlengkap untuk membuat undangan pernikahan digital yang berkesan
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{
                padding: 28, cursor: "pointer", transition: "all 0.25s",
                transform: hoverCard === i ? "translateY(-4px)" : "none",
                boxShadow: hoverCard === i ? `0 12px 32px rgba(44,26,14,0.12)` : undefined,
              }}
              onMouseEnter={() => setHoverCard(i)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <Icon name={f.icon} size={22} color={f.color} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: colors.tenunDark, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: colors.textLight, fontSize: 13.5, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        margin: "0 40px 80px",
        background: `${motifBg}, linear-gradient(135deg, ${colors.tua}, #3D1F08)`,
        borderRadius: 16, padding: "60px 40px", textAlign: "center",
        border: `1px solid rgba(201,168,76,0.2)`, position: "relative", overflow: "hidden",
      }}>
        <div className="batik-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#FFFDF0", marginBottom: 12 }}>
          Siap Membuat Undangan Impianmu?
        </h2>
        <p style={{ color: "rgba(255,253,240,0.6)", marginBottom: 32, fontSize: 15 }}>Gratis untuk 1 undangan. Premium mulai Rp 99.000</p>
        <button className="btn-emas" style={{ fontSize: 15, padding: "14px 40px", borderRadius: 6 }} onClick={() => onNavigate("dashboard")}>
          Mulai Sekarang — Gratis
        </button>
        <div className="batik-divider" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </div>
    </div>
  );
};

// ========== SIDEBAR ==========
const Sidebar = ({ active, onNavigate }) => {
  const navItems = [
    { id: "dashboard", icon: "home", label: "Dashboard" },
    { id: "templates", icon: "template", label: "Template" },
    { id: "guests", icon: "users", label: "Daftar Tamu" },
    { id: "features", icon: "flower", label: "Fitur Lainnya" },
    { id: "analytics", icon: "analytics", label: "Analitik" },
    { id: "settings", icon: "settings", label: "Pengaturan" },
  ];

  return (
    <div style={{
      width: 220, background: colors.surface,
      borderRight: `1px solid ${colors.border}`, display: "flex",
      flexDirection: "column", padding: "20px 12px",
      height: "calc(100vh - 56px)", position: "sticky", top: 56, overflow: "auto",
    }} className="scroll-thin">
      {/* Project indicator */}
      <div style={{
        background: colors.kremDark, border: `1px solid ${colors.border}`,
        borderRadius: 8, padding: "12px 14px", marginBottom: 20,
      }}>
        <div style={{ fontSize: 10, color: colors.textLight, letterSpacing: 0.5, marginBottom: 4 }}>UNDANGAN AKTIF</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.tenunDark, fontFamily: "'Playfair Display', serif" }}>Rizky & Amira</div>
        <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>12 Oktober 2025</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: colors.batikLight }} />
          <span style={{ fontSize: 11, color: colors.batikLight }}>Aktif · 284 tamu</span>
        </div>
      </div>

      {navItems.map(item => (
        <div
          key={item.id}
          className={`nav-item ${active === item.id ? "active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} size={15} color={active === item.id ? colors.tenunDark : colors.textLight} />
          {item.label}
        </div>
      ))}

      <div style={{ flex: 1 }} />

      {/* Plan indicator */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.emas}18, ${colors.emaSoft}10)`,
        border: `1px solid ${colors.borderStrong}`, borderRadius: 8, padding: "14px 14px",
      }}>
        <div style={{ fontSize: 11, color: colors.emas, fontWeight: 600, marginBottom: 4 }}>✦ PAKET GRATIS</div>
        <div style={{ fontSize: 12, color: colors.textMid, marginBottom: 10 }}>1/1 undangan terpakai</div>
        <button className="btn-emas" style={{ width: "100%", fontSize: 12, padding: "8px 0" }}>
          Upgrade Premium
        </button>
      </div>
    </div>
  );
};

// ========== DASHBOARD ==========
const Dashboard = ({ onNavigate }) => {
  const stats = [
    { label: "Total Tamu", value: "284", sub: "+12 minggu ini", icon: "users", color: colors.emas },
    { label: "Sudah Konfirmasi", value: "201", sub: "70.8% dari total", icon: "check", color: colors.batikLight },
    { label: "Link Dibuka", value: "1,847", sub: "6.5x per tamu", icon: "eye", color: colors.lavender },
    { label: "Hari Menuju Nikah", value: "134", sub: "12 Oktober 2025", icon: "flower", color: colors.accent },
  ];

  const recentActivity = [
    { name: "Budi Santoso", action: "Konfirmasi hadir", time: "5 menit lalu", status: "hadir" },
    { name: "Siti Rahayu", action: "Membuka undangan", time: "12 menit lalu", status: "buka" },
    { name: "Ahmad Fauzi", action: "Konfirmasi tidak hadir", time: "1 jam lalu", status: "tidak" },
    { name: "Dewi Kusuma", action: "Konfirmasi hadir (2 orang)", time: "2 jam lalu", status: "hadir" },
    { name: "Randi Pratama", action: "Membuka undangan", time: "3 jam lalu", status: "buka" },
  ];

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark, fontWeight: 600 }}>
              Dashboard
            </h1>
            <p style={{ color: colors.textLight, fontSize: 14, marginTop: 4 }}>
              Undangan <em>Rizky & Amira</em> · Dibuat 3 hari lalu
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-ghost" onClick={() => onNavigate("preview")}>
              <Icon name="eye" size={14} /> Preview
            </button>
            <button className="btn-emas">
              <Icon name="share" size={14} /> Bagikan
            </button>
          </div>
        </div>
        <FloralDivider />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: colors.textLight, letterSpacing: 0.5, marginBottom: 8 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: colors.tenunDark }}>{s.value}</div>
                <div style={{ fontSize: 11, color: colors.textLight, marginTop: 4 }}>{s.sub}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={18} color={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        {/* Left: Quick edit + undangan info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Undangan info card */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: colors.tenunDark }}>Info Undangan</h3>
              <button className="btn-ghost" style={{ fontSize: 11, padding: "5px 12px" }}>
                <Icon name="edit" size={12} /> Edit
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Nama Mempelai Pria", value: "Rizky Pratama Putra, S.Kom." },
                { label: "Nama Mempelai Wanita", value: "Amira Khansa Dewi, S.Pd." },
                { label: "Tanggal Akad", value: "Sabtu, 12 Oktober 2025" },
                { label: "Tanggal Resepsi", value: "Sabtu, 12 Oktober 2025" },
                { label: "Lokasi Akad", value: "Masjid Agung Al-Azhar, Jakarta" },
                { label: "Lokasi Resepsi", value: "Grand Ballroom Mulia, Jakarta" },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: 12 }}>
                  <div style={{ fontSize: 10, color: colors.textLight, letterSpacing: 0.5, marginBottom: 3 }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: colors.textDark, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RSVP Stats */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: colors.tenunDark, marginBottom: 16 }}>Status Konfirmasi</h3>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Hadir", count: 201, color: colors.batikLight, pct: 70 },
                { label: "Tidak Hadir", count: 38, color: colors.accent, pct: 14 },
                { label: "Belum Konfirmasi", count: 45, color: colors.border, pct: 16 },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: 80, background: colors.kremDark, borderRadius: 6, display: "flex",
                    alignItems: "flex-end", overflow: "hidden", marginBottom: 8,
                  }}>
                    <div style={{
                      width: "100%", background: item.color, height: `${item.pct}%`,
                      transition: "height 0.5s ease", opacity: 0.85,
                    }} />
                  </div>
                  <div style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: colors.tenunDark }}>{item.count}</div>
                  <div style={{ fontSize: 10, color: colors.textLight }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button className="btn-ghost" style={{ width: "100%", fontSize: 12 }} onClick={() => onNavigate("guests")}>
              Lihat Semua Tamu →
            </button>
          </div>
        </div>

        {/* Right: Activity + Template preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Link share */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: colors.textLight, letterSpacing: 0.5, marginBottom: 8 }}>LINK UNDANGAN</div>
            <div style={{
              background: colors.kremDark, borderRadius: 6, padding: "10px 14px",
              fontSize: 12, color: colors.textMid, fontFamily: "monospace",
              border: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 12,
            }}>
              <span>undangan.id/rizky-amira</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <Icon name="link" size={13} color={colors.emas} />
              </button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" style={{ flex: 1, fontSize: 11, padding: "7px 0" }}>Salin Link</button>
              <button className="btn-emas" style={{ flex: 1, fontSize: 11, padding: "7px 0" }}>Bagikan</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card" style={{ padding: 20, flex: 1 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: colors.tenunDark, marginBottom: 16 }}>Aktivitas Terbaru</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentActivity.map((act, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: act.status === "hadir" ? `${colors.batikLight}20` : act.status === "tidak" ? `${colors.accent}15` : colors.kremDark,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    fontSize: 10, fontWeight: 700, color: act.status === "hadir" ? colors.batikLight : act.status === "tidak" ? colors.accent : colors.textLight,
                  }}>
                    {act.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: colors.textDark }}>{act.name}</div>
                    <div style={{ fontSize: 11, color: colors.textLight }}>{act.action}</div>
                  </div>
                  <div style={{ fontSize: 10, color: colors.textLight, whiteSpace: "nowrap" }}>{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== TEMPLATES PAGE ==========
const TemplatesPage = ({ onPreview }) => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const categories = ["semua", "jawa", "sunda", "bali", "modern", "islami", "minimalis"];
  const templates = [
    { id: 1, name: "Batik Jogja", category: "jawa", theme: "Tradisional", colors: [colors.emas, colors.tenun, colors.krem], popular: true, price: "Gratis" },
    { id: 2, name: "Parang Royal", category: "jawa", theme: "Mewah", colors: ["#1A3A5C", colors.emas, "#F5F0E8"], popular: false, price: "Rp 99K" },
    { id: 3, name: "Mega Mendung", category: "sunda", theme: "Elegan", colors: ["#C0392B", "#1A1A2E", colors.emas], popular: true, price: "Rp 99K" },
    { id: 4, name: "Ulam Sari", category: "bali", theme: "Tropis", colors: [colors.batikLight, "#FFF9C4", "#8B4513"], popular: false, price: "Rp 149K" },
    { id: 5, name: "Sakura Putih", category: "modern", theme: "Soft & Clean", colors: ["#FFC0CB", "#FFF", "#C9A84C"], popular: true, price: "Gratis" },
    { id: 6, name: "Kaligrafi Emas", category: "islami", theme: "Islami Mewah", colors: [colors.tua, colors.emas, "#FFF8E7"], popular: false, price: "Rp 149K" },
    { id: 7, name: "Linen Putih", category: "minimalis", theme: "Minimalis", colors: ["#FAF7F2", "#333", colors.emas], popular: false, price: "Rp 99K" },
    { id: 8, name: "Truntum Perak", category: "jawa", theme: "Klasik", colors: ["#2C3E50", "#BDC3C7", colors.emas], popular: false, price: "Rp 99K" },
    { id: 9, name: "Kawung Modern", category: "sunda", theme: "Kontemporer", colors: [colors.lavender, "#F8F0FF", colors.emas], popular: true, price: "Rp 149K" },
  ];

  const filtered = activeCategory === "semua" ? templates : templates.filter(t => t.category === activeCategory);

  const TemplatePreviewMini = ({ t }) => (
    <div style={{
      height: 180, borderRadius: "6px 6px 0 0", position: "relative", overflow: "hidden",
      background: `linear-gradient(160deg, ${t.colors[0]}ee, ${t.colors[1]}bb)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      {/* Ornament lines */}
      <div style={{ position: "absolute", inset: 8, border: `1px solid ${t.colors[2]}50`, borderRadius: 4 }} />
      <div style={{ position: "absolute", inset: 13, border: `0.5px solid ${t.colors[2]}30`, borderRadius: 3 }} />
      {/* Content */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: `${t.colors[2]}90`, letterSpacing: 2, marginBottom: 6 }}>~ Undangan Pernikahan ~</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: t.colors[2], textAlign: "center", lineHeight: 1.3 }}>Rizky<br />&<br />Amira</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, color: `${t.colors[2]}70`, marginTop: 6 }}>12 Oktober 2025</div>
      {/* Color swatches */}
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 3 }}>
        {t.colors.map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.4)" }} />)}
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark }}>Pilih Template</h1>
        <p style={{ color: colors.textLight, fontSize: 14, marginTop: 4 }}>100+ template cantik berinspirasikan budaya Nusantara</p>
        <FloralDivider />
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 18px", borderRadius: 20, border: `1px solid ${activeCategory === cat ? colors.emas : colors.border}`,
              background: activeCategory === cat ? colors.emas : "transparent",
              color: activeCategory === cat ? colors.tua : colors.textLight,
              fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer",
              textTransform: "capitalize", transition: "all 0.15s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 20 }}>
        {filtered.map(t => (
          <div
            key={t.id}
            className={`template-card ${selectedTemplate === t.id ? "selected" : ""}`}
            onClick={() => setSelectedTemplate(t.id)}
          >
            <TemplatePreviewMini t={t} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: colors.tenunDark }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>{t.theme}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  {t.popular && <span className="badge badge-emas">Populer</span>}
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.price === "Gratis" ? colors.batikLight : colors.tenunDark }}>{t.price}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="btn-ghost"
                  style={{ flex: 1, fontSize: 11, padding: "7px 0" }}
                  onClick={(e) => { e.stopPropagation(); onPreview(); }}
                >
                  <Icon name="eye" size={11} /> Preview
                </button>
                <button className="btn-emas" style={{ flex: 1, fontSize: 11, padding: "7px 0" }}>
                  Pakai
                </button>
              </div>
            </div>
            {selectedTemplate === t.id && (
              <div style={{
                position: "absolute", top: 10, right: 10,
                background: colors.emas, borderRadius: "50%",
                width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="check" size={12} color={colors.tua} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== GUESTS PAGE ==========
const GuestsPage = () => {
  const [guests, setGuests] = useState([
    { id: 1, name: "Budi Santoso", group: "Keluarga Pria", phone: "0812-xxxx-1234", status: "hadir", pax: 2 },
    { id: 2, name: "Siti Rahayu", group: "Keluarga Wanita", phone: "0813-xxxx-5678", status: "hadir", pax: 3 },
    { id: 3, name: "Ahmad Fauzi", group: "Sahabat Kuliah", phone: "0821-xxxx-9012", status: "tidak", pax: 1 },
    { id: 4, name: "Dewi Kusuma", group: "Rekan Kerja", phone: "0878-xxxx-3456", status: "hadir", pax: 2 },
    { id: 5, name: "Randi Pratama", group: "Sahabat Kuliah", phone: "0819-xxxx-7890", status: "belum", pax: 1 },
    { id: 6, name: "Rina Marlina", group: "Keluarga Wanita", phone: "0856-xxxx-2345", status: "belum", pax: 2 },
    { id: 7, name: "Hendra Wijaya", group: "Keluarga Pria", phone: "0811-xxxx-6789", status: "hadir", pax: 4 },
    { id: 8, name: "Lestari Putri", group: "Rekan Kerja", phone: "0822-xxxx-0123", status: "hadir", pax: 1 },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", group: "Keluarga Pria", phone: "", pax: 1 });
  const [filter, setFilter] = useState("semua");

  const groups = ["Keluarga Pria", "Keluarga Wanita", "Sahabat Kuliah", "Rekan Kerja", "Lainnya"];
  const statusConfig = {
    hadir: { label: "Hadir", bg: `${colors.batikLight}15`, color: colors.batikLight },
    tidak: { label: "Tidak Hadir", bg: `${colors.accent}12`, color: colors.accent },
    belum: { label: "Belum Konfirmasi", bg: colors.kremDark, color: colors.textLight },
  };

  const filtered = filter === "semua" ? guests : guests.filter(g => g.status === filter);

  const addGuest = () => {
    if (!newGuest.name.trim()) return;
    setGuests(prev => [...prev, { ...newGuest, id: Date.now(), status: "belum" }]);
    setNewGuest({ name: "", group: "Keluarga Pria", phone: "", pax: 1 });
    setShowAdd(false);
  };

  const deleteGuest = (id) => setGuests(prev => prev.filter(g => g.id !== id));

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark }}>Daftar Tamu</h1>
            <p style={{ color: colors.textLight, fontSize: 14, marginTop: 4 }}>
              {guests.length} tamu · {guests.filter(g => g.status === "hadir").reduce((s, g) => s + g.pax, 0)} pax terkonfirmasi
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-ghost" style={{ fontSize: 12 }}>Import Excel</button>
            <button className="btn-emas" onClick={() => setShowAdd(true)} style={{ fontSize: 12 }}>
              <Icon name="plus" size={13} /> Tambah Tamu
            </button>
          </div>
        </div>
        <FloralDivider />
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Undangan", val: guests.length, color: colors.emas },
          { label: "Hadir", val: guests.filter(g => g.status === "hadir").length, color: colors.batikLight },
          { label: "Tidak Hadir", val: guests.filter(g => g.status === "tidak").length, color: colors.accent },
          { label: "Belum Konfirmasi", val: guests.filter(g => g.status === "belum").length, color: colors.textLight },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: colors.surfaceCard, border: `1px solid ${colors.border}`,
            borderRadius: 8, padding: "14px 16px",
            borderLeft: `3px solid ${s.color}`,
          }}>
            <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: colors.tenunDark }}>{s.val}</div>
            <div style={{ fontSize: 11, color: colors.textLight, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["semua", "Semua"], ["hadir", "Hadir"], ["tidak", "Tidak Hadir"], ["belum", "Belum"]].map(([val, lab]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            style={{
              padding: "6px 16px", borderRadius: 20, border: `1px solid ${filter === val ? colors.emas : colors.border}`,
              background: filter === val ? colors.emas : "transparent",
              color: filter === val ? colors.tua : colors.textLight,
              fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 11, cursor: "pointer",
            }}
          >
            {lab}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="card fade-in" style={{ padding: 20, marginBottom: 20, border: `1px solid ${colors.emas}40` }}>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: colors.tenunDark, marginBottom: 16 }}>Tambah Tamu Baru</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 12, marginBottom: 14 }}>
            <input className="input-field" placeholder="Nama lengkap *" value={newGuest.name} onChange={e => setNewGuest(p => ({ ...p, name: e.target.value }))} />
            <select className="input-field" value={newGuest.group} onChange={e => setNewGuest(p => ({ ...p, group: e.target.value }))}>
              {groups.map(g => <option key={g}>{g}</option>)}
            </select>
            <input className="input-field" placeholder="No. WhatsApp" value={newGuest.phone} onChange={e => setNewGuest(p => ({ ...p, phone: e.target.value }))} />
            <input className="input-field" type="number" min={1} max={10} placeholder="Pax" value={newGuest.pax} onChange={e => setNewGuest(p => ({ ...p, pax: +e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-emas" onClick={addGuest}>Simpan</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Batal</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto",
          gap: 12, padding: "10px 16px",
          background: colors.kremDark, borderBottom: `1px solid ${colors.border}`,
          fontSize: 10, color: colors.textLight, letterSpacing: 0.5, fontWeight: 600,
        }}>
          <span>NAMA TAMU</span><span>GRUP</span><span>STATUS</span><span>PAX</span><span></span>
        </div>
        {filtered.map(g => (
          <div key={g.id} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto",
            gap: 12, padding: "13px 16px", borderBottom: `1px solid ${colors.border}`,
            alignItems: "center", transition: "background 0.1s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = colors.krem}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textDark }}>{g.name}</div>
              <div style={{ fontSize: 11, color: colors.textLight }}>{g.phone}</div>
            </div>
            <span style={{ fontSize: 12, color: colors.textMid }}>{g.group}</span>
            <span>
              <span style={{
                padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: statusConfig[g.status].bg, color: statusConfig[g.status].color,
              }}>
                {statusConfig[g.status].label}
              </span>
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, textAlign: "center" }}>{g.pax}</span>
            <button className="btn-danger" onClick={() => deleteGuest(g.id)} style={{ padding: "5px 10px" }}>
              <Icon name="trash" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== FEATURES PAGE ==========
const FeaturesPage = () => {
  const features = [
    {
      icon: "music", title: "Musik Pengiring", color: colors.lavender,
      desc: "Unggah lagu favorit kamu atau pilih dari koleksi lagu pernikahan kami. Musik otomatis berputar saat tamu membuka undangan.",
      status: "Aktif", actions: ["Ganti Lagu", "Atur Volume"]
    },
    {
      icon: "photo", title: "Galeri Foto", color: colors.batikLight,
      desc: "Tampilkan momen-momen berharga dalam galeri foto yang cantik. Support hingga 30 foto dan video.",
      status: "8 Foto", actions: ["Tambah Foto", "Atur Urutan"]
    },
    {
      icon: "map", title: "Lokasi & Navigasi", color: "#2980B9",
      desc: "Tampilkan peta interaktif lengkap dengan tombol navigasi ke lokasi akad dan resepsi.",
      status: "2 Lokasi", actions: ["Edit Lokasi", "Preview Peta"]
    },
    {
      icon: "gift", title: "Amplop Digital", color: colors.emas,
      desc: "Terima hadiah dan ucapan secara digital. Dukung transfer bank, OVO, GoPay, dan DANA.",
      status: "Tersedia", actions: ["Atur Rekening", "Lihat Ucapan"]
    },
    {
      icon: "rsvp", title: "RSVP Interaktif", color: colors.accent,
      desc: "Form konfirmasi kehadiran yang terintegrasi langsung dengan daftar tamu. Filter & export data mudah.",
      status: "201 Konfirmasi", actions: ["Edit Form", "Export Data"]
    },
    {
      icon: "flower", title: "Hitung Mundur", color: colors.tenun,
      desc: "Tampilkan countdown timer menuju hari pernikahan yang akan membuat tamu semakin antusias.",
      status: "134 Hari Lagi", actions: ["Atur Tanggal", "Gaya Tampilan"]
    },
  ];

  return (
    <div className="fade-in" style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark }}>Fitur Undangan</h1>
        <p style={{ color: colors.textLight, fontSize: 14, marginTop: 4 }}>Lengkapi undangan digitalmu dengan berbagai fitur menarik</p>
        <FloralDivider />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {features.map((f, i) => (
          <div key={i} className="card fade-in" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={f.icon} size={22} color={f.color} />
              </div>
              <span style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: `${f.color}15`, color: f.color,
              }}>
                {f.status}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: colors.tenunDark, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: colors.textLight, lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {f.actions.map((a, j) => (
                <button key={j} className={j === 0 ? "btn-emas" : "btn-ghost"} style={{ flex: 1, fontSize: 11, padding: "8px 0" }}>{a}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== INVITATION PREVIEW (Full template) ==========
const InvitationPreview = ({ onClose }) => {
  const [section, setSection] = useState("cover");

  const sections = ["cover", "pengantar", "mempelai", "acara", "galeri", "hadir"];

  return (
    <div className="preview-modal" onClick={onClose}>
      <div style={{
        width: "100%", maxWidth: 440, height: "85vh",
        borderRadius: 16, overflow: "hidden", position: "relative",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            background: "rgba(44,26,14,0.6)", border: "none", borderRadius: "50%",
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon name="x" size={14} color="#FFF" />
        </button>

        {/* Navigation dots */}
        <div style={{
          position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: 6, zIndex: 10,
        }}>
          {sections.map(s => (
            <div
              key={s}
              onClick={() => setSection(s)}
              style={{
                width: section === s ? 8 : 5, height: section === s ? 8 : 5,
                borderRadius: "50%", background: section === s ? colors.emas : "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        {/* Template content */}
        <div style={{
          height: "100%", overflow: "auto",
          background: `${motifBg}, linear-gradient(180deg, ${colors.tua} 0%, #2A1208 30%, ${colors.kremDark} 100%)`,
        }} className="scroll-thin">
          {section === "cover" && (
            <div style={{
              minHeight: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: "60px 30px",
              textAlign: "center", position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 20, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 8 }} />
              <div style={{ position: "absolute", inset: 26, border: `0.5px solid rgba(201,168,76,0.15)`, borderRadius: 6 }} />

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.emaSoft, letterSpacing: 3, marginBottom: 20, opacity: 0.8 }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </div>

              <BatikOrnament style={{ opacity: 0.3, marginBottom: 16 }} />

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "rgba(255,253,240,0.6)", letterSpacing: 2, marginBottom: 12 }}>
                ~ Undangan Pernikahan ~
              </div>

              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 48, color: colors.emas, lineHeight: 1, marginBottom: 4 }}>
                Rizky
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(255,253,240,0.7)", letterSpacing: 2 }}>& </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 48, color: colors.emas, lineHeight: 1, marginTop: 4 }}>
                Amira
              </div>

              <div style={{ width: 60, height: 1, background: colors.emas, opacity: 0.5, margin: "20px auto" }} />

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(255,253,240,0.7)", letterSpacing: 1 }}>
                Sabtu, 12 Oktober 2025
              </div>

              <div style={{ marginTop: 32 }}>
                <button
                  className="btn-emas"
                  onClick={() => setSection("pengantar")}
                  style={{ borderRadius: 4, letterSpacing: 1 }}
                >
                  Buka Undangan
                </button>
              </div>
            </div>
          )}

          {section === "pengantar" && (
            <div style={{ padding: "50px 30px", textAlign: "center", background: colors.kremDark, minHeight: "100%" }}>
              <div style={{ position: "absolute", inset: 16, border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 8, pointerEvents: "none" }} />
              <FloralDivider />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: colors.textMid, lineHeight: 2, marginBottom: 24 }}>
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
              </p>
              <div style={{ fontSize: 11, color: colors.textLight, letterSpacing: 1 }}>— QS. Ar-Rum: 21</div>
              <FloralDivider />
              <p style={{ fontSize: 13, color: colors.textMid, lineHeight: 2 }}>
                Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.
              </p>
            </div>
          )}

          {section === "mempelai" && (
            <div style={{ padding: "40px 28px", background: colors.kremDark, minHeight: "100%" }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.textLight, letterSpacing: 2, marginBottom: 8 }}>MEMPELAI</div>
                <FloralDivider />
              </div>
              {[
                { type: "Mempelai Pria", name: "Rizky Pratama Putra, S.Kom.", parent: "Putra dari Bpk. Hendra Wijaya & Ibu Sri Lestari", photo: "👨" },
                { type: "Mempelai Wanita", name: "Amira Khansa Dewi, S.Pd.", parent: "Putri dari Bpk. Darmawan Kusuma & Ibu Ratna Sari", photo: "👩" },
              ].map((m, i) => (
                <div key={i} style={{
                  background: colors.surface, borderRadius: 10, padding: "20px",
                  border: `1px solid ${colors.border}`, textAlign: "center", marginBottom: 16,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{m.photo}</div>
                  <div style={{ fontSize: 10, color: colors.textLight, letterSpacing: 1.5, marginBottom: 4 }}>{m.type.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, color: colors.tenunDark, marginBottom: 6 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: colors.textLight }}>{m.parent}</div>
                </div>
              ))}
            </div>
          )}

          {section === "acara" && (
            <div style={{ padding: "40px 28px", background: colors.kremDark, minHeight: "100%" }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.textLight, letterSpacing: 2, marginBottom: 8 }}>RANGKAIAN ACARA</div>
                <FloralDivider />
              </div>
              {[
                { title: "Akad Nikah", time: "08.00 – 10.00 WIB", venue: "Masjid Agung Al-Azhar", addr: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan" },
                { title: "Resepsi Pernikahan", time: "11.00 – 14.00 WIB", venue: "Grand Ballroom Hotel Mulia", addr: "Jl. Asia Afrika No.8, Senayan, Jakarta" },
              ].map((e, i) => (
                <div key={i} style={{
                  background: colors.surface, borderRadius: 10, padding: 20,
                  border: `1px solid ${colors.border}`, marginBottom: 16,
                  borderLeft: `3px solid ${colors.emas}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: colors.tenunDark }}>{e.title}</div>
                    <span className="badge badge-emas">{e.time}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: colors.textMid, marginBottom: 4 }}>{e.venue}</div>
                  <div style={{ fontSize: 12, color: colors.textLight, lineHeight: 1.5 }}>{e.addr}</div>
                  <button className="btn-ghost" style={{ marginTop: 12, fontSize: 11, padding: "6px 14px" }}>
                    <Icon name="map" size={11} /> Buka Maps
                  </button>
                </div>
              ))}

              {/* Countdown */}
              <div style={{
                background: `${motifBg}, linear-gradient(135deg, ${colors.tua}, #3D1F08)`,
                borderRadius: 10, padding: 20, textAlign: "center", marginTop: 8,
                border: `1px solid rgba(201,168,76,0.2)`,
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.emaSoft, letterSpacing: 2, marginBottom: 12 }}>HITUNG MUNDUR</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  {[{ val: "134", label: "Hari" }, { val: "03", label: "Jam" }, { val: "24", label: "Menit" }].map((t, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: colors.emas }}>{t.val}</div>
                      <div style={{ fontSize: 10, color: colors.emaSoft, opacity: 0.7 }}>{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === "galeri" && (
            <div style={{ padding: "40px 24px", background: colors.kremDark, minHeight: "100%" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.textLight, letterSpacing: 2, marginBottom: 8 }}>GALERI FOTO</div>
                <FloralDivider />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} style={{
                    aspectRatio: "1",
                    background: `linear-gradient(${135 + i * 30}deg, ${colors.kremDark}, ${colors.border})`,
                    borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${colors.border}`,
                  }}>
                    <Icon name="photo" size={18} color={colors.border} />
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", fontSize: 11, color: colors.textLight, marginTop: 16, fontStyle: "italic" }}>Swipe untuk melihat lebih banyak foto</p>
            </div>
          )}

          {section === "hadir" && (
            <div style={{ padding: "40px 28px", background: colors.kremDark, minHeight: "100%" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: colors.textLight, letterSpacing: 2, marginBottom: 8 }}>KONFIRMASI KEHADIRAN</div>
                <FloralDivider />
              </div>

              <div className="card" style={{ padding: 24 }}>
                <p style={{ fontSize: 13, color: colors.textMid, marginBottom: 20, textAlign: "center", lineHeight: 1.8 }}>
                  Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam acara pernikahan kami.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input className="input-field" placeholder="Nama Anda" />
                  <input className="input-field" placeholder="No. WhatsApp (opsional)" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["Hadir", "Tidak Hadir"].map((opt, i) => (
                      <button key={i} style={{
                        padding: "10px", borderRadius: 6,
                        border: `1px solid ${i === 0 ? colors.emas : colors.border}`,
                        background: i === 0 ? `${colors.emas}15` : "transparent",
                        color: i === 0 ? colors.tenunDark : colors.textLight,
                        fontFamily: "'Nunito', sans-serif", fontSize: 13, cursor: "pointer", fontWeight: 600,
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button className="btn-emas" style={{ width: "100%", padding: "12px", fontSize: 14 }}>
                    Kirim Konfirmasi
                  </button>
                </div>
              </div>

              {/* Gift section */}
              <div style={{
                marginTop: 20, background: `${motifBg}, linear-gradient(135deg, ${colors.tua}, #3D1F08)`,
                borderRadius: 10, padding: 20, border: `1px solid rgba(201,168,76,0.2)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Icon name="gift" size={18} color={colors.emas} />
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: colors.emaSoft }}>Hadiah & Ucapan</span>
                </div>
                <div style={{ background: "rgba(255,253,240,0.08)", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, color: colors.emaSoft, opacity: 0.7 }}>Bank BCA</div>
                  <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.emas, marginTop: 2 }}>1234-5678-9012</div>
                  <div style={{ fontSize: 11, color: colors.emaSoft, opacity: 0.6 }}>a.n. Rizky Pratama Putra</div>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,253,240,0.5)", textAlign: "center" }}>Doa & ucapan tulus dari Anda adalah hadiah terindah untuk kami</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        <div style={{
          position: "absolute", bottom: 20, left: 0, right: 0,
          display: "flex", justifyContent: "center", gap: 12,
        }}>
          {section !== "cover" && (
            <button
              onClick={() => setSection(sections[sections.indexOf(section) - 1])}
              style={{
                background: "rgba(44,26,14,0.7)", border: `1px solid rgba(201,168,76,0.3)`,
                borderRadius: 20, padding: "8px 20px", color: colors.emaSoft,
                fontFamily: "'Nunito', sans-serif", fontSize: 11, cursor: "pointer",
              }}
            >
              ← Kembali
            </button>
          )}
          {section !== "hadir" && (
            <button
              onClick={() => setSection(sections[sections.indexOf(section) + 1])}
              style={{
                background: colors.emas, border: "none",
                borderRadius: 20, padding: "8px 20px", color: colors.tua,
                fontFamily: "'Nunito', sans-serif", fontSize: 11, cursor: "pointer", fontWeight: 600,
              }}
            >
              Lanjut →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APP ==========
export default function App() {
  const [view, setView] = useState("landing");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  const isDashboardView = ["dashboard", "templates", "guests", "features", "analytics", "settings"].includes(view);

  return (
    <div className="undangan-root">
      <Topbar onNavigate={setView} activeView={view} />

      {view === "landing" && <LandingPage onNavigate={setView} />}

      {isDashboardView && (
        <div style={{ display: "flex" }}>
          <Sidebar active={view} onNavigate={setView} />
          <div style={{ flex: 1, overflow: "auto" }} className="scroll-thin">
            {view === "dashboard" && <Dashboard onNavigate={setView} />}
            {view === "templates" && <TemplatesPage onPreview={() => setShowPreview(true)} />}
            {view === "guests" && <GuestsPage />}
            {view === "features" && <FeaturesPage />}
            {view === "analytics" && (
              <div style={{ padding: 32 }} className="fade-in">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark }}>Analitik</h1>
                <FloralDivider />
                <div className="card" style={{ padding: 40, textAlign: "center", marginTop: 20 }}>
                  <Icon name="analytics" size={48} color={colors.emas} />
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: colors.tenunDark, marginTop: 16 }}>Analitik Mendalam</div>
                  <p style={{ color: colors.textLight, marginTop: 8 }}>Fitur tersedia pada paket Premium</p>
                  <button className="btn-emas" style={{ marginTop: 16 }}>Upgrade Sekarang</button>
                </div>
              </div>
            )}
            {view === "settings" && (
              <div style={{ padding: 32 }} className="fade-in">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: colors.tenunDark }}>Pengaturan</h1>
                <FloralDivider />
                {["Profil Akun", "Domain Kustom", "Notifikasi Email", "Keamanan", "Paket & Tagihan"].map((s, i) => (
                  <div key={i} className="card" style={{ padding: "16px 20px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = colors.krem}
                    onMouseLeave={e => e.currentTarget.style.background = colors.surfaceCard}
                  >
                    <span style={{ fontSize: 14, color: colors.textDark, fontWeight: 500 }}>{s}</span>
                    <span style={{ color: colors.textLight, fontSize: 18 }}>›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showPreview && <InvitationPreview onClose={() => setShowPreview(false)} />}
    </div>
  );
}
