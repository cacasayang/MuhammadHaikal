import { Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useExperiences, useStats } from "@/hooks/usePortfolioData";
import { getStatIcon } from "@/lib/iconHelpers";

export default function Pengalaman() {
  const { data: experiences = [] } = useExperiences();
  const { data: stats = [] } = useStats();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-4">
          Beranda <span className="mx-1.5">/</span> <span className="text-foreground">Pengalaman</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black mb-2">
              PENGA<span className="text-primary">LAMAN</span>
            </h1>
            <div className="w-16 h-1 rounded-full mb-3" style={{ background: "var(--gradient-purple)" }} />
            <p className="text-sm text-muted-foreground max-w-lg">
              Berbagai pengalaman kerja yang telah saya jalani dan kontribusi yang telah saya berikan.
            </p>
          </div>
          <div className="w-28 h-28 lg:w-36 lg:h-36 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Briefcase size={48} className="text-primary animate-float" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-5 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative pl-12 lg:pl-14">
                {/* Dot */}
                <div className="absolute left-[11px] lg:left-[13px] top-5 w-4 h-4 rounded-full border-2 border-primary bg-background glow-dot z-10" />

                <div className="bg-card border border-border rounded-2xl p-5 lg:p-6 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                        <Briefcase size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary mb-0.5 bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                          {exp.period}
                        </p>
                        <h3 className="text-base lg:text-lg font-black text-foreground">{exp.title}</h3>
                        <p className="text-xs font-semibold text-primary/80">{exp.company}</p>
                      </div>
                    </div>
                    {exp.task_count > 0 && (
                      <div className="flex items-center gap-1.5 bg-secondary/60 rounded-lg px-3 py-1.5 shrink-0 self-start">
                        <Briefcase size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">{exp.task_count} Tugas Utama</span>
                      </div>
                    )}
                  </div>

                  {exp.tasks && (exp.tasks as string[]).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Deskripsi Pekerjaan :</p>
                      <ul className="space-y-1.5">
                        {(exp.tasks as string[]).map((task, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 font-bold shrink-0">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Pengalaman Secara Keseluruhan
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(stat => {
              const Icon = getStatIcon(stat.icon);
              return (
                <div key={stat.id} className="text-center p-4 rounded-xl bg-secondary/40 border border-border">
                  <Icon size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-xl font-black text-foreground">{stat.value}</p>
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
