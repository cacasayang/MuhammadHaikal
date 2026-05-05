import { useState } from "react";
import { MapPin, Phone, Mail, Linkedin, Github, Instagram, Send, Handshake, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useProfile } from "@/hooks/usePortfolioData";

export default function Kontak() {
  const { data: profile } = useProfile();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const whatsappNumber = profile?.whatsapp_number || '6289677133285';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const text = `Halo ${profile?.name || 'Haikal'}!%0A%0A*Nama:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A*Subjek:* ${encodeURIComponent(form.subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(form.message)}`;
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(url, "_blank");
    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Halo%20${profile?.name || 'Haikal'}%2C%20saya%20ingin%20berkolaborasi%20dengan%20Anda!`;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-4">
          Beranda <span className="mx-1.5">/</span> <span className="text-foreground">Kontak</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black mb-2">
              KONTAK <span className="text-primary">SAYA</span>
            </h1>
            <div className="w-16 h-1 rounded-full mb-3" style={{ background: "var(--gradient-purple)" }} />
            <p className="text-sm lg:text-base text-muted-foreground max-w-lg">
              Mari terhubung dan berkolaborasi bersama saya! Saya terbuka untuk peluang kerja, freelance, maupun project menarik lainnya.
            </p>
          </div>
          <div className="w-28 h-28 lg:w-40 lg:h-40 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-float">
            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="text-primary">
              <rect x="15" y="25" width="70" height="50" rx="6" fill="hsl(265 85% 60% / 0.2)" stroke="hsl(265 85% 60%)" strokeWidth="2"/>
              <path d="M15 35 L50 58 L85 35" stroke="hsl(265 85% 60%)" strokeWidth="2" fill="none"/>
              <circle cx="75" cy="30" r="8" fill="hsl(265 85% 60%)"/>
              <path d="M71 30 L75 34 L81 26" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-black text-foreground mb-4">Informasi Kontak</h2>
            <div className="space-y-3 mb-6">
              <a href={`tel:${profile?.phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <Phone size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-primary font-semibold">Telepon / WhatsApp</p>
                  <p className="text-sm font-bold text-foreground">{profile?.phone}</p>
                </div>
              </a>
              <a href={`mailto:${profile?.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-primary font-semibold">Email</p>
                  <p className="text-sm font-bold text-foreground">{profile?.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-primary font-semibold">Lokasi</p>
                  <p className="text-sm font-bold text-foreground leading-tight">{profile?.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Temukan saya di</h3>
              <p className="text-xs text-muted-foreground mb-3">Ikuti saya di platform berikut</p>
              <div className="flex gap-3">
                {profile?.linkedin_url && profile.linkedin_url !== '#' && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center hover:bg-[#0A66C2]/30 transition-all">
                    <Linkedin size={20} className="text-[#0A66C2]" />
                  </a>
                )}
                {profile?.github_url && profile.github_url !== '#' && (
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center hover:bg-secondary/60 transition-all">
                    <Github size={20} className="text-foreground" />
                  </a>
                )}
                {profile?.instagram_url && profile.instagram_url !== '#' && (
                  <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center hover:bg-pink-500/30 transition-all">
                    <Instagram size={20} className="text-pink-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Message Form → WhatsApp */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-black text-foreground mb-1">Kirim Pesan</h2>
            <p className="text-xs text-muted-foreground mb-4">Isi form di bawah ini dan pesan akan dikirim via WhatsApp.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Masukkan email Anda"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Subjek</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Tulis subjek pesan"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Pesan</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>
              <button type="submit" disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
                style={{ background: "var(--gradient-purple)" }}>
                <Send size={16} />
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-4 bg-card border border-primary/20 rounded-2xl p-5 lg:p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Handshake size={24} className="text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-base font-black text-foreground">Tertarik untuk bekerja sama?</h3>
            <p className="text-sm text-muted-foreground">Saya siap berkontribusi untuk kemajuan perusahaan Anda dengan solusi terbaik.</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:opacity-90 shrink-0"
            style={{ background: "var(--gradient-purple)" }}>
            Hubungi Saya <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </Layout>
  );
}
