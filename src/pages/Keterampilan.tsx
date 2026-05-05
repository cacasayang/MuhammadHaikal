import { BarChart2, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useSkillsTechnical, useSkillsSoft, useStats } from "@/hooks/usePortfolioData";
import { getStatIcon } from "@/lib/iconHelpers";

export default function Keterampilan() {
  const { data: techSkills = [] } = useSkillsTechnical();
  const { data: softSkills = [] } = useSkillsSoft();
  const { data: stats = [] } = useStats();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-4">
          Beranda <span className="mx-1.5">/</span> <span className="text-foreground">Keterampilan</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black mb-2">
              KETER<span className="text-primary">AMPILAN</span>
            </h1>
            <div className="w-16 h-1 rounded-full mb-3" style={{ background: "var(--gradient-purple)" }} />
            <p className="text-sm text-muted-foreground max-w-lg">
              Kemampuan yang saya kuasai untuk mendukung pekerjaan secara maksimal dan memberikan hasil terbaik.
            </p>
          </div>
          <div className="w-28 h-28 lg:w-36 lg:h-36 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <BarChart2 size={48} className="text-primary animate-float" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Technical Skills */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <BarChart2 size={16} /> Keterampilan Teknis
            </h2>
            <div className="space-y-4">
              {techSkills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full progress-bar transition-all duration-700"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Keterampilan Non Teknis
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 px-3 py-2 bg-secondary/60 border border-border rounded-xl text-sm text-foreground hover:border-primary/40 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            Ringkasan Kekuatan Saya
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(stat => {
              const Icon = getStatIcon(stat.icon);
              return (
                <div key={stat.id} className="text-center p-4 rounded-xl bg-secondary/40 border border-border">
                  <Icon size={26} className="text-primary mx-auto mb-2" />
                  <p className="text-xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote */}
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-6">
          <div className="shrink-0 text-5xl font-black text-primary opacity-40 leading-none self-start mt-1">"</div>
          <p className="text-base lg:text-lg text-foreground italic leading-relaxed flex-1">
            Selalu ingin belajar hal baru dan memberikan hasil terbaik di setiap pekerjaan yang saya lakukan.
          </p>
          <div className="shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-float">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
}
