/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { 
  MessageCircle, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Instagram, 
  Phone,
  ChevronRight,
  ChevronLeft,
  Star
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const WHATSAPP_LINK = "https://wa.me/5554996833038?text=Olá!%20Gostaria%20de%20agendar%20minha%20avaliação%20gratuita.";

const SERVICES = [
  {
    title: "Clínica Geral",
    description: "Cuidados preventivos e tratamentos essenciais para manter sua saúde bucal em dia.",
    icon: <Stethoscope className="w-6 h-6 text-brand-gold" />
  },
  {
    title: "Implantes",
    description: "Recupere a funcionalidade e a estética do seu sorriso com tecnologia de ponta.",
    icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />
  },
  {
    title: "Endodontia",
    description: "Tratamentos de canal precisos e humanizados para salvar seus dentes naturais.",
    icon: <CheckCircle2 className="w-6 h-6 text-brand-gold" />
  },
  {
    title: "Estética",
    description: "Transforme seu sorriso com facetas, lentes de contato e clareamento profissional.",
    icon: <Sparkles className="w-6 h-6 text-brand-gold" />
  }
];

const GALLERY_IMAGES = [
  "https://i.imgur.com/G80KyOC.png",
  "https://i.imgur.com/GrE4fed.png",
  "https://i.imgur.com/7Cf5TC8.png",
  "https://i.imgur.com/3ebFxaB.png"
];

const FadeInWhenVisible = ({ children, delay = 0, y = 20 }: { children: React.ReactNode, delay?: number, y?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.45, 0.15, 1.0] }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);
  const scrollProgressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-gold/30 selection:text-brand-dark">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-5 rounded-full shadow-premium animate-pulse-soft flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.a>

      {/* Header / Logo */}
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.21, 0.45, 0.15, 1.0] }}
        style={{ opacity: headerOpacity }}
        className="py-3 flex flex-row items-center justify-between px-6 fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100/50 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-9 h-9 group"
          >
            <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-md group-hover:bg-brand-gold/20 transition-colors" />
            <img 
              src="https://i.imgur.com/Uq9SAdB.png" 
              alt="Logo Autence Odontologia" 
              className="relative w-full h-full object-contain rounded-full border border-brand-gold/10 p-0.5 bg-white shadow-soft transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base font-serif font-bold tracking-tight text-brand-dark"
          >
            Autence <span className="text-brand-gold italic">Odontologia</span>
          </motion.h1>
        </div>
        
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-dark text-white px-5 py-2 rounded-full text-[11px] font-bold shadow-soft flex items-center gap-2 hover:bg-brand-dark-soft transition-colors"
        >
          <Phone className="w-3 h-3" />
          Contato
        </motion.a>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="px-6 py-12 sm:py-20 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.21, 0.45, 0.15, 1.0] }}
          className="relative rounded-[3rem] overflow-hidden shadow-premium mb-12 aspect-[16/10] sm:aspect-[21/9] bg-gray-50 group"
        >
          {/* Nova Foto da Hero com Parallax Suave */}
          <motion.img 
            style={{ y: heroImageY }}
            src="https://i.imgur.com/jQqESwf.png" 
            alt="Dra. Eduarda Menegat - Autence Odontologia" 
            className="w-full h-full object-contain sm:object-cover object-center scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/60 via-transparent to-transparent" />
        </motion.div>

        <div className="text-center space-y-8">
          <FadeInWhenVisible delay={0.2} y={20}>
            <h2 className="text-4xl sm:text-7xl font-serif font-bold leading-[1.05] text-brand-dark tracking-tight">
              A arte de cuidar do seu <span className="text-gradient-gold italic">melhor sorriso</span>
            </h2>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.4} y={20}>
            <p className="text-gray-500 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-light tracking-tight">
              Tecnologia avançada e um olhar humanizado para transformar sua experiência odontológica em algo único e relaxante.
            </p>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.6} y={20}>
            <div className="pt-6">
              <motion.a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-4 bg-brand-dark text-white px-14 py-6 rounded-full font-bold text-xl shadow-premium transition-all w-full sm:w-auto group border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <MessageCircle className="w-7 h-7" />
                Agendar avaliação exclusiva
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-32 sm:py-48 px-6 mt-24 sm:mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInWhenVisible y={20}>
            <div className="inline-flex p-5 bg-brand-gold/5 rounded-[2rem] mb-10 border border-brand-gold/10">
              <CheckCircle2 className="w-10 h-10 text-brand-gold" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold mb-10 text-brand-dark tracking-tight">Excelência e Cuidado Humano</h3>
            <p className="text-gray-500 text-xl leading-relaxed mb-16 font-light tracking-tight">
              Liderada pela <span className="font-semibold text-brand-dark decoration-brand-gold/30 underline underline-offset-8">Dra. Eduarda Menegat</span> e pelo <span className="font-semibold text-brand-dark decoration-brand-gold/30 underline underline-offset-8">Dr. Kennedy Menegat</span>, a Autence nasceu do desejo de oferecer uma odontologia próxima e de alta qualidade. Aqui, cada detalhe é planejado para o seu bem-estar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-brand-light border border-gray-100 shadow-soft hover:shadow-elegant transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/10 group-hover:bg-brand-gold/30 transition-colors" />
                <p className="text-brand-gold font-bold text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">100%</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-bold">Humanizado</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-brand-light border border-gray-100 shadow-soft hover:shadow-elegant transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/10 group-hover:bg-brand-gold/30 transition-colors" />
                <p className="text-brand-gold font-bold text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">Premium</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] font-bold">Tecnologia</p>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 sm:py-48 px-6 max-w-4xl mx-auto">
        <FadeInWhenVisible y={20}>
          <div className="text-center mb-20">
            <span className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">Especialidades</span>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark tracking-tight">Tratamentos de Alta Performance</h3>
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.21, 0.45, 0.15, 1.0] }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] bg-white border border-gray-100 shadow-soft hover:shadow-elegant transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-gold/10 transition-colors" />
              <div className="p-6 bg-brand-light rounded-[2rem] w-fit mb-10 group-hover:bg-brand-gold/10 transition-colors relative z-10">
                {service.icon}
              </div>
              <h4 className="font-bold text-2xl text-brand-dark mb-5 tracking-tight relative z-10">{service.title}</h4>
              <p className="text-gray-400 text-base leading-relaxed font-light tracking-tight relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-32 sm:py-48 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[180px]" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[180px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeInWhenVisible y={20}>
            <div className="text-center mb-20">
              <span className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.5em] mb-4 block">Transformações</span>
              <h3 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">A Arte do Sorriso</h3>
            </div>
          </FadeInWhenVisible>
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12"
          >
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div 
                key={idx} 
                className="min-w-[90%] sm:min-w-[45%] aspect-[4/5] rounded-[3.5rem] overflow-hidden snap-center bg-brand-dark-soft shadow-2xl border border-white/5 group relative"
              >
                <img 
                  src={img} 
                  alt={`Resultado de tratamento Autence ${idx + 1}`} 
                  className="w-full h-full object-contain bg-brand-dark-soft transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-4">
            {GALLERY_IMAGES.map((_, idx) => (
              <motion.div 
                key={idx}
                animate={{ 
                  width: activeIndex === idx ? 40 : 8,
                  backgroundColor: activeIndex === idx ? "#C5A059" : "rgba(255,255,255,0.1)"
                }}
                className="h-1.5 rounded-full transition-all duration-500"
              />
            ))}
          </div>
          <motion.p 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center text-white/20 text-[11px] mt-12 uppercase tracking-[0.6em] font-bold"
          >
            Deslize para explorar
          </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center max-w-4xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <FadeInWhenVisible y={20}>
          <div className="space-y-16 relative z-10">
            <h3 className="text-5xl sm:text-7xl font-serif font-bold leading-[1.05] text-brand-dark tracking-tight">
              O seu novo sorriso <br /> <span className="text-gradient-gold italic">começa aqui.</span>
            </h3>
            <p className="text-gray-400 text-xl sm:text-2xl font-light leading-relaxed tracking-tight max-w-xl mx-auto">
              Agende agora sua avaliação e descubra o padrão Autence de excelência odontológica.
            </p>
            <motion.a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -8, boxShadow: "0 30px 60px -12px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-5 bg-green-500 text-white px-16 py-7 rounded-full font-bold text-2xl shadow-premium hover:bg-green-600 transition-all border-b-4 border-green-700/30 group"
            >
              <MessageCircle className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" />
              Agendar pelo WhatsApp
            </motion.a>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-gray-100 text-center bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-gold/10 to-transparent" />
        <div className="flex justify-center gap-12 mb-16">
          <motion.a 
            whileHover={{ y: -8, color: "#C5A059", scale: 1.2 }} 
            href="https://www.instagram.com/autenceodontologia/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 transition-all p-3 bg-gray-50 rounded-2xl hover:bg-brand-gold/5"
          >
            <Instagram className="w-7 h-7" />
          </motion.a>
          <motion.a 
            whileHover={{ y: -8, color: "#C5A059", scale: 1.2 }} 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 transition-all p-3 bg-gray-50 rounded-2xl hover:bg-brand-gold/5"
          >
            <Phone className="w-7 h-7" />
          </motion.a>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-px bg-gray-200" />
            <img src="https://i.imgur.com/Uq9SAdB.png" alt="Logo Small" className="w-6 h-6 grayscale opacity-30" />
            <div className="w-8 h-px bg-gray-200" />
          </div>
          <p className="text-gray-400 text-[12px] font-bold tracking-[0.3em] uppercase">
            © 2026 Autence Odontologia Integrada
          </p>
          <p className="text-gray-300 text-[11px] flex items-center justify-center gap-3 tracking-[0.2em] uppercase font-medium">
            <MapPin className="w-4 h-4 text-brand-gold/40" /> Farroupilha - RS
          </p>
        </div>
      </footer>
    </div>
  );
}
