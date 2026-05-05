import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ExternalLink, ArrowRight, MessageCircle, Briefcase, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useProfile, useStats, useAboutTraits, useExperiences, useProjects, useSkillsTechnical, useSkillsSoft, useEducation } from "@/hooks/usePortfolioData";
import { getTraitColor, getStatIcon } from "@/lib/iconHelpers";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
});

const photoAnim = {
  initial: { opacity: 0, scale: 0.8, rotate: -6 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
};

export default function Beranda() {
  const { data: profile } = useProfile();
  const { data: stats = [] } = useStats();
  const { data: traits = [] } = useAboutTraits();
  const { data: experiences = [] } = useExperiences();
  const { data: projects = [] } = useProjects();
  const { data: techSkills = [] } = useSkillsTechnical();
  const { data: softSkills = [] } = useSkillsSoft();
  const { data: education = [] } = useEducation();

  const featuredProjects = projects.filter(p => p.is_featured).slice(0, 3);
  const recentExperiences = experiences.slice(0, 3);

  const whatsappUrl = `https://wa.me/${profile?.whatsapp_number || '6289677133285'}?text=Halo%20Haikal%2C%20saya%20ingin%20berkolaborasi%20dengan%20Anda!`;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden p-6 lg:p-10 mb-6 border border-border"
          style={{ background: "var(--gradient-hero)" }}>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-1.5 text-sm text-muted-foreground mb-4">
                <span className="text-base">👋</span> Halo, Saya
              </motion.div>
              <motion.h1 {...fadeUp(0.1)} className="text-3xl lg:text-5xl font-black mb-1 text-foreground leading-tight">
                MUHAMMAD{" "}
                <span className="text-primary">HAIKAL</span>
              </motion.h1>
              <motion.p {...fadeUp(0.15)} className="text-sm lg:text-base font-semibold tracking-[0.3em] text-muted-foreground uppercase mb-4">
                {profile?.title || "Akuntansi"}
              </motion.p>
              <motion.p {...fadeUp(0.2)} className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-lg mb-6">
                {profile?.bio}
              </motion.p>

              {/* Contact chips */}
              <motion.div {...fadeUp(0.25)} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground">
                  <MapPin size={12} className="text-primary shrink-0" />
                  <span>{profile?.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground">
                  <Phone size={12} className="text-primary shrink-0" />
                  <span>{profile?.phone}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground">
                  <Mail size={12} className="text-primary shrink-0" />
                  <span>{profile?.email}</span>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.3)}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ background: "var(--gradient-purple)" }}>
                  <MessageCircle size={16} />
                  Hubungi Saya
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div {...photoAnim} className="relative order-1 lg:order-2 shrink-0">
              {/* Glow ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-full"
                style={{ background: "radial-gradient(circle, hsl(265 85% 60% / 0.25) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary/40 shadow-purple relative">
                <div className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle at 50% 50%, hsl(265 85% 60% / 0.3), transparent 70%)" }} />
                {profile?.photo_url ? (
                  <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl font-black text-primary">MH</div>
                )}
              </div>
              {/* Decorative dots */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-accent"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = getStatIcon(stat.icon);
            return (
              <div key={stat.id} className="bg-card border border-border rounded-xl p-4 text-center card-hover">
                <Icon size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-1">{stat.label}</p>
              </div>
            );
          })}
        </section>

        {/* About + Experience + Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Tentang Saya */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Briefcase size={12} className="text-primary" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Tentang Saya</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{profile?.bio}</p>
            <div className="grid grid-cols-1 gap-2">
              {traits.slice(0, 4).map((trait) => {
                const color = getTraitColor(trait.color || "blue");
                return (
                  <div key={trait.id} className="flex items-start gap-3 p-2 rounded-lg bg-secondary/40">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${color.bg}`}>
                      <span className={`text-xs font-bold ${color.text}`}>
                        {trait.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${color.text}`}>{trait.title}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{trait.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pengalaman */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Briefcase size={12} className="text-primary" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Pengalaman</h2>
              </div>
              <Link to="/pengalaman" className="text-xs text-primary hover:text-accent flex items-center gap-1">
                Lihat Semua <ArrowRight size={10} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentExperiences.map((exp, i) => (
                <div key={exp.id} className="relative pl-4 border-l border-border pb-3 last:pb-0">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary glow-dot" />
                  <p className="text-[10px] font-semibold text-primary mb-0.5">{exp.period}</p>
                  <p className="text-sm font-bold text-foreground">{exp.title}</p>
                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                  {exp.tasks && exp.tasks.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {(exp.tasks as string[]).slice(0, 2).map((task, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-primary mt-0.5">•</span> {task}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <ExternalLink size={12} className="text-primary" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Project</h2>
              </div>
              <Link to="/project" className="text-xs text-primary hover:text-accent flex items-center gap-1">
                Lihat Semua <ArrowRight size={10} />
              </Link>
            </div>
            <div className="space-y-3">
              {featuredProjects.map((proj) => (
                <div key={proj.id} className="flex gap-3 p-2 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary">
                    {proj.image_url && <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{proj.title}</p>
                    <p className="text-xs text-muted-foreground leading-tight line-clamp-2">{proj.description}</p>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-primary hover:text-accent mt-1 flex items-center gap-1">
                        {proj.url.replace(/^https?:\/\//, '')} <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/project"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-secondary/40 hover:bg-secondary text-sm font-medium text-foreground transition-all mt-2">
                <span>Lihat Project Lainnya</span>
                <ArrowRight size={14} className="text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Skills + Education + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Keterampilan */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <BarChart2Icon /> Keterampilan
            </h2>
            <div className="mb-3">
              <p className="text-xs font-semibold text-primary mb-2">Keterampilan Teknis</p>
              <div className="space-y-2">
                {techSkills.slice(0, 4).map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full progress-bar" style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-2">Keterampilan Non Teknis</p>
              <div className="flex flex-wrap gap-1.5">
                {softSkills.map(s => (
                  <span key={s.id} className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-foreground border border-border">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pendidikan */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <GraduationIcon /> Pendidikan
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/40 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <BookIcon />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{edu.school}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{edu.major}</p>
                  <p className="text-xs text-primary font-medium mt-1">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kontak */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <ContactIcon /> Kontak Saya
            </h2>
            <p className="text-xs text-muted-foreground mb-3">Mari terhubung dan berkolaborasi!</p>
            <div className="space-y-2 mb-4">
              <a href={`tel:${profile?.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Phone size={14} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Telepon / WhatsApp</p>
                  <p className="text-xs font-semibold text-foreground">{profile?.phone}</p>
                </div>
              </a>
              <a href={`mailto:${profile?.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Mail size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Email</p>
                  <p className="text-xs font-semibold text-foreground">{profile?.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <MapPin size={14} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Lokasi</p>
                  <p className="text-xs font-semibold text-foreground leading-tight">{profile?.location}</p>
                </div>
              </div>
            </div>

            {/* Open to work banner */}
            <div className="rounded-xl p-4 border border-primary/30"
              style={{ background: "var(--gradient-purple)" }}>
              <p className="text-sm font-bold text-primary-foreground mb-1">{profile?.tagline}</p>
              <p className="text-xs text-primary-foreground/80 mb-3">{profile?.tagline_sub}</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                <MessageCircle size={13} />
                Hubungi Saya
                <ArrowRight size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="hidden lg:block text-center py-4 text-xs text-muted-foreground border-t border-border mt-6">
        Terima kasih sudah mengunjungi portfolio saya! &nbsp;•&nbsp; © 2025 Muhammad Haikal. All rights reserved.
      </div>
    </Layout>
  );
}

function BarChart2Icon() {
  return <BarChart2 size={14} className="text-primary" />;
}
function GraduationIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function BookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
}
function ContactIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
