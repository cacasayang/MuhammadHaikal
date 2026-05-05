import { ExternalLink, Code2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useProjects } from "@/hooks/usePortfolioData";

export default function Project() {
  const { data: projects = [] } = useProjects();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-4">
          Beranda <span className="mx-1.5">/</span> <span className="text-foreground">Project</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black mb-2">
              PROJECT <span className="text-primary">WEBSITE</span>
            </h1>
            <div className="w-16 h-1 rounded-full mb-3" style={{ background: "var(--gradient-purple)" }} />
            <p className="text-sm text-muted-foreground max-w-lg">
              Kumpulan project yang telah saya kerjakan dengan berbagai teknologi dan desain menarik.
            </p>
          </div>
          <div className="w-28 h-28 lg:w-36 lg:h-36 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Code2 size={48} className="text-primary animate-float" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                {proj.image_url ? (
                  <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code2 size={40} className="text-muted-foreground" />
                  </div>
                )}
                {proj.is_featured && (
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-black text-foreground mb-1">{proj.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{proj.description}</p>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-accent text-sm font-medium transition-all group/link">
                    <ExternalLink size={14} />
                    <span className="group-hover/link:underline">{proj.url.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Code2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>Belum ada project</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
