import { MapPin, Phone, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useProfile, useAboutTraits, useStats } from "@/hooks/usePortfolioData";
import { getTraitColor, getStatIcon } from "@/lib/iconHelpers";

export default function TentangSaya() {
  const { data: profile } = useProfile();
  const { data: traits = [] } = useAboutTraits();
  const { data: stats = [] } = useStats();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-4">
          Beranda <span className="mx-1.5">/</span> <span className="text-foreground">Tentang Saya</span>
        </div>

        {/* Hero */}
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-10 mb-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-5xl font-black mb-4">
                TENTANG <span className="text-primary">SAYA</span>
              </h1>
              <div className="w-16 h-1 rounded-full mb-4" style={{ background: "var(--gradient-purple)" }} />
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6">
                {profile?.bio}
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <MapPin size={15} className="text-orange-400" />
                  </div>
                  {profile?.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Phone size={15} className="text-green-400" />
                  </div>
                  {profile?.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Mail size={15} className="text-blue-400" />
                  </div>
                  {profile?.email}
                </div>
              </div>
            </div>
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-2xl overflow-hidden border-4 border-primary/20"
                style={{ boxShadow: "var(--shadow-purple)" }}>
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: "radial-gradient(circle at 50% 30%, hsl(265 85% 60% / 0.4), transparent 70%)" }} />
                {profile?.photo_url ? (
                  <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-6xl font-black text-primary">MH</div>
                )}
              </div>
              <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-primary animate-float" />
              <div className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-accent animate-float" style={{ animationDelay: "1.5s" }} />
            </div>
          </div>
        </div>

        {/* Informasi Singkat */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-black uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Informasi Singkat
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Saya memiliki pengalaman kerja di berbagai bidang seperti administrasi, layanan pelanggan, operasional, hingga dekorasi acara. Saya terbisa bekerja di lingkungan yang dinamis dan selalu berusaha memberikan hasil terbaik.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {traits.map((trait) => {
              const color = getTraitColor(trait.color || "blue");
              return (
                <div key={trait.id} className="bg-secondary/40 border border-border rounded-xl p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${color.bg}`}>
                    <span className={`font-black text-lg ${color.text}`}>{trait.title.charAt(0)}</span>
                  </div>
                  <p className={`text-sm font-bold mb-1 ${color.text}`}>{trait.title}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{trait.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan Diri */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-black uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Ringkasan Diri
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(stat => {
              const Icon = getStatIcon(stat.icon);
              return (
                <div key={stat.id} className="text-center p-4 rounded-xl bg-secondary/40 border border-border">
                  <Icon size={28} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
