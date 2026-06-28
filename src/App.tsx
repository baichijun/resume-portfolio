import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

/** 应用根组件 / Application root composing all sections */
export default function App() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ThemeSwitcher />
    </>
  );
}
