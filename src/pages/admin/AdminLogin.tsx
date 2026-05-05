import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ALLOWED_EMAIL = "namahaikal8@gmail.com";

export default function AdminLogin() {
  const [email, setEmail] = useState(ALLOWED_EMAIL);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().trim() !== ALLOWED_EMAIL) {
      toast({ title: "Akses ditolak", description: "Hanya administrator yang diizinkan masuk.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: ALLOWED_EMAIL, password });
      if (error) {
        toast({ title: "Login gagal", description: "Password salah. Coba lagi.", variant: "destructive" });
        return;
      }
      navigate("/admin");
    } catch (err: unknown) {
      toast({ title: "Terjadi kesalahan", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(265 85% 60% / 0.08) 0%, transparent 65%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-5xl font-black text-primary block"
          >MH.</motion.span>
          <p className="text-sm text-muted-foreground mt-2">Admin Panel</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black text-foreground">Masuk Admin</h1>
              <p className="text-xs text-muted-foreground">Akses terbatas untuk administrator</p>
            </div>
          </div>

          {/* Email restriction notice */}
          <div className="flex items-start gap-2 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2.5 mb-4">
            <ShieldAlert size={14} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-foreground/80">
              Panel ini hanya dapat diakses oleh administrator.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Email Admin</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary cursor-default"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ background: "var(--gradient-purple)" }}>
              {loading ? "Masuk..." : "Masuk ke Admin Panel"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
