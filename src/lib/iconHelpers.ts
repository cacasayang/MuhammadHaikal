import type { LucideProps } from "lucide-react";
import {
  Briefcase, Calendar, Target, Star, Settings, Shield, Rocket, Users,
  Code, Code2, FileText, Globe, Mail, BarChart2, Zap, Award, BookOpen,
  CheckCircle, Clock, TrendingUp, Heart, Database, Monitor, Laptop
} from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

export function getStatIcon(iconName: string) {
  const icons: Record<string, IconComponent> = {
    Briefcase, Calendar, Target, Star, Settings, Shield, Rocket, Users,
    Code, Code2, FileText, Globe, Mail, BarChart2, Zap, Award, BookOpen,
    CheckCircle, Clock, TrendingUp, Heart, Database, Monitor, Laptop
  };
  return icons[iconName] || Star;
}

export function getTraitColor(color: string) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    green: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
    red: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
    teal: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  };
  return colors[color] || colors.blue;
}
