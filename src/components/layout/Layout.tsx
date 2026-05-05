import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import MobileHeader from "./MobileHeader";
import PageTransition from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileHeader />
      <main className="lg:ml-[168px] pb-24 lg:pb-0 pt-16 lg:pt-0">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <MobileNav />
    </div>
  );
}
