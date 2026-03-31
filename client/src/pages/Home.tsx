/**
 * Landing Page: Planilha de Gestão Financeira para Espetinhos
 * Design: "Brasa & Dados" — Industrial-Gastronômica
 * Paleta: Laranja-brasa (#E85D26), Verde-lucro (#22C55E), Carvão (#2D1810), Creme (#FAFAF9)
 * Tipografia: Poppins (display), Montserrat (body)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Clock,
  ShieldCheck,
  Smartphone,
  FileSpreadsheet,
  Gift,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "#comprar";

const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444745726/dnHEVqXutrHjcYmPxP9wwo/hero-espetinhos-kyT7aUaPrDg8ZtSMVzpNvN.webp",
  app: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444745726/dnHEVqXutrHjcYmPxP9wwo/app-mockup-Xbwnbav8ruKkagGKpeNiZv.webp",
  familia: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444745726/dnHEVqXutrHjcYmPxP9wwo/autoridade-real_0b2b30d8.png",
  planilha: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444745726/dnHEVqXutrHjcYmPxP9wwo/planilha-csv-VuuSQzV9Fe6oEGZBHkhB6X.webp",
  depoimento: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444745726/dnHEVqXutrHjcYmPxP9wwo/depoimento-lion-curto_988547f9.mp4",
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-['Poppins'] font-bold">
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-carvao-light/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-['Poppins'] text-lg md:text-xl font-medium text-carvao">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-brasa shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brasa shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-5 text-carvao/80 text-base md:text-lg leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

/* ─── CTA Button ─── */
function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={CHECKOUT_URL}>
      <Button
        size="lg"
        className={`bg-brasa hover:bg-brasa-dark text-white font-['Poppins'] text-sm md:text-base font-semibold uppercase tracking-wide px-6 py-3 md:px-8 md:py-4 rounded-lg pulse-brasa transition-all duration-300 hover:scale-105 shadow-lg shadow-brasa/30 ${className}`}
      >
        {children}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </a>
  );
}

/* ─── Section Wrapper with Scroll Animation ─── */
function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Benefit Card ─── */
function BenefitCard({ icon: Icon, title, description, delay }: {
  icon: any; title: string; description: string; delay: number;
}) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-b-4 border-brasa/0 hover:border-brasa group h-full">
        <div className="w-14 h-14 rounded-xl bg-brasa/10 flex items-center justify-center mb-5 group-hover:bg-brasa/20 transition-colors">
          <Icon className="w-7 h-7 text-brasa" />
        </div>
        <h3 className="font-['Poppins'] text-xl font-semibold text-carvao mb-3">{title}</h3>
        <p className="text-carvao/70 leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-creme overflow-x-hidden">

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Espetinhos na churrasqueira"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carvao/95 via-carvao/80 to-carvao/50" />
        </div>

        <div className="relative z-10 container py-20 md:py-0">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brasa/20 border border-brasa/40 rounded-full px-4 py-2 mb-6"
            >
              <Flame className="w-4 h-4 text-brasa" />
              <span className="text-brasa-light text-sm font-medium uppercase tracking-wider">
                Feita por quem vive do espetinho
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6"
            >
              Chega de{" "}
              <span className="text-brasa">Perder Dinheiro!</span>
              <br />
              Descubra o Lucro{" "}
              <span className="text-lucro">REAL</span>{" "}
              do Seu Espetinho.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
            >
              A planilha + aplicativo de gestão financeira criada por uma família que fatura{" "}
              <strong className="text-ouro">R$30 mil/mês</strong> com espetinhos.
              Controle seus custos, saiba seu lucro real e tome decisões inteligentes — mesmo que você odeie números.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <CtaButton>Quero Lucrar Mais</CtaButton>
              <div className="flex items-center gap-2 text-white/60 text-sm mt-2 sm:mt-auto">
                <ShieldCheck className="w-4 h-4" />
                <span>7 dias de garantia incondicional</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Diagonal cut bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-creme" style={{
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }} />
      </section>

      {/* ─── PAIN SECTION ─── */}
      <section className="py-16 md:py-24 bg-creme">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-carvao mb-6">
                Você sabe quanto seu espetinho{" "}
                <span className="text-brasa">realmente lucra?</span>
              </h2>
              <p className="text-lg md:text-xl text-carvao/70 leading-relaxed">
                Você trabalha duro, vende muito, mas o dinheiro parece sumir? A maioria dos donos de espetinhos
                enfrenta o mesmo problema: <strong className="text-carvao">a falta de controle financeiro</strong>.
                Sem saber seus custos, seu lucro real e para onde o dinheiro está indo, é impossível crescer e ter tranquilidade.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-brasa mb-2">
                  <AnimatedCounter target={78} suffix="%" />
                </div>
                <p className="text-carvao/70 text-sm">dos vendedores de rua não sabem seu lucro real</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-brasa mb-2">
                  <AnimatedCounter target={10} suffix="+" />
                </div>
                <p className="text-carvao/70 text-sm">anos de experiência condensados nesta ferramenta</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-lucro-dark mb-2">
                  <AnimatedCounter target={7000} prefix="R$" />
                </div>
                <p className="text-carvao/70 text-sm">lucro mensal possível com controle financeiro</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SECTION ─── */}
      <section className="bg-carvao diagonal-top py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block bg-brasa/20 text-brasa-light text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                O que você vai receber
              </span>
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-white mb-4">
                Tenha o Controle Total do Seu Negócio
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Ao adquirir a Planilha de Gestão Financeira Vendendo e Lucrando, você receberá:
              </p>
            </div>
          </AnimatedSection>

          {/* Product 1: Planilha CSV */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-4 bg-brasa/10 rounded-3xl blur-2xl" />
                <img
                  src={IMAGES.planilha}
                  alt="Planilha de Gestão Financeira"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <div className="inline-flex items-center gap-2 bg-brasa text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                  <FileSpreadsheet className="w-4 h-4" />
                  Produto Principal
                </div>
                <h3 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-4">
                  Planilha Mestra <span className="text-ouro">(Formato CSV)</span>
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Uma ferramenta completa e intuitiva para registrar suas vendas, custos, despesas e lucros.
                  Totalmente editável e compatível com Excel, Google Sheets e outros programas de planilha.
                </p>
                <div className="bg-carvao-light/50 rounded-xl p-5 border border-white/10">
                  <p className="text-ouro font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Esta é a sua ferramenta principal, que você terá para sempre!
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Registre vendas, custos e despesas facilmente",
                    "Visualize seu lucro real em tempo real",
                    "Compatível com Excel e Google Sheets",
                    "Acompanha vídeo explicativo detalhado",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-lucro shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Product 2: App Lovable */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1} className="order-2 lg:order-1">
              <div>
                <div className="inline-flex items-center gap-2 bg-lucro text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                  <Gift className="w-4 h-4" />
                  Bônus Exclusivo
                </div>
                <h3 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-4">
                  Acesso ao <span className="text-lucro">Aplicativo</span>
                </h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Transformamos a planilha em um aplicativo moderno e fácil de usar, para você lançar seus dados
                  e acompanhar seus resultados de qualquer lugar, direto do seu celular!
                </p>
                <div className="bg-lucro/10 rounded-xl p-5 border border-lucro/30 mb-6">
                  <p className="text-lucro font-semibold text-lg mb-2">
                    1 ano de acesso garantido ao app!
                  </p>
                  <p className="text-white/60 text-sm">
                    E a melhor parte: enquanto o projeto perdurar, o aplicativo continuará no ar para seu uso
                    indeterminadamente, sem custos adicionais!
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Acesse de qualquer lugar pelo celular",
                    "Interface moderna e intuitiva",
                    "Funciona em Android e iOS (via navegador)",
                    "Atualizações incluídas durante o acesso",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-lucro shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <div className="relative flex justify-center">
                <div className="absolute -inset-4 bg-lucro/10 rounded-3xl blur-2xl" />
                <img
                  src={IMAGES.app}
                  alt="App de Gestão Financeira"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS SECTION ─── */}
      <section className="py-16 md:py-24 bg-creme diagonal-top">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-carvao mb-4">
                Com a Planilha + App, <span className="text-brasa">você vai:</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <BenefitCard
              icon={DollarSign}
              title="Saber o Lucro Real"
              description="Acabe com as dúvidas e saiba exatamente quanto dinheiro seu espetinho está gerando. Sem achismos, só dados reais."
              delay={0.1}
            />
            <BenefitCard
              icon={TrendingUp}
              title="Controlar Custos"
              description="Identifique onde você pode economizar e aumente sua margem de lucro. Cada centavo conta quando você vende na rua."
              delay={0.15}
            />
            <BenefitCard
              icon={BarChart3}
              title="Tomar Decisões Inteligentes"
              description="Baseie suas escolhas em dados concretos. Saiba quais dias vendem mais, quais produtos dão mais lucro."
              delay={0.2}
            />
            <BenefitCard
              icon={FileSpreadsheet}
              title="Organizar suas Finanças"
              description="Separe o dinheiro do negócio do seu dinheiro pessoal de uma vez por todas. Profissionalize sua gestão."
              delay={0.25}
            />
            <BenefitCard
              icon={TrendingUp}
              title="Planejar o Crescimento"
              description="Tenha a visão clara para investir e expandir seu negócio com segurança. Saia de um ponto para um trailer."
              delay={0.3}
            />
            <BenefitCard
              icon={Clock}
              title="Menos Estresse"
              description="Automatize o controle e foque no que você ama fazer: preparar espetinhos incríveis e atender seus clientes!"
              delay={0.35}
            />
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <CtaButton>Garantir Minha Planilha</CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── AUTHORITY SECTION ─── */}
      <section className="bg-carvao diagonal-both py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-4 bg-ouro/5 rounded-3xl blur-2xl" />
                <img
                  src={IMAGES.familia}
                  alt="Família empreendedora"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <span className="inline-block bg-ouro/20 text-ouro text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                  Quem está por trás
                </span>
                <h2 className="font-['Poppins'] text-3xl md:text-4xl font-bold text-white mb-6">
                  A experiência de <span className="text-ouro">10+ anos</span> que você precisa
                </h2>
                <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                  <p>
                    "Nossa família vive do negócio de espetinhos há mais de 10 anos. No começo, era um caos financeiro.
                    Não sabíamos se estávamos lucrando ou apenas trocando dinheiro."
                  </p>
                  <p>
                    "Foi essa necessidade que nos levou a criar a Planilha Vendendo e Lucrando. Uma ferramenta testada
                    e aprovada no campo de batalha, que nos ajudou a faturar mais de{" "}
                    <strong className="text-ouro">R$30 mil por mês</strong> com apenas um trailer."
                  </p>
                  <p className="text-white font-semibold">
                    "Agora, queremos compartilhar essa solução com você!"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-ouro fill-ouro" />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">Validada por mais de uma década de resultados reais</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL SECTION ─── */}
      <section className="py-16 md:py-24 bg-creme">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block bg-lucro/10 text-lucro text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                Prova Real
              </span>
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-carvao mb-4">
                Quem usa, <span className="text-brasa">recomenda!</span>
              </h2>
              <p className="text-carvao/70 text-lg max-w-2xl mx-auto">
                Veja o que nossos clientes estão dizendo sobre a Planilha de Gestão Financeira.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Video */}
                <div className="aspect-[9/16] max-h-[600px] mx-auto bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                    poster=""
                  >
                    <source src={IMAGES.depoimento} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>

                {/* Caption */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-ouro fill-ouro" />
                      ))}
                    </div>
                    <span className="text-carvao/50 text-sm">Cliente verificado</span>
                  </div>
                  <p className="text-carvao/80 text-base leading-relaxed italic">
                    "A planilha mudou completamente a forma como eu controlo meu negócio de espetinhos. Agora sei exatamente quanto estou lucrando!"
                  </p>
                </div>
              </div>

              {/* More testimonials coming soon */}
              <div className="mt-8 text-center">
                <p className="text-carvao/40 text-sm">
                  Mais depoimentos em breve...
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── BONUS SECTION ─── */}
      <section className="py-16 md:py-24 bg-creme">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-carvao mb-4">
                E para você lucrar <span className="text-brasa">ainda mais...</span>
              </h2>
              <p className="text-carvao/70 text-lg max-w-2xl mx-auto">
                Para que você possa usar sua nova Planilha de Gestão Financeira com o máximo potencial,
                vamos te dar de presente:
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-carvao to-carvao-light rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative flame */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brasa/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-ouro/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-ouro/20 text-ouro text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                  <Gift className="w-4 h-4" />
                  Bônus Especial Incluso
                </div>

                <h3 className="font-['Poppins'] text-2xl md:text-4xl font-bold text-white mb-4">
                  Protocolo "Do Zero aos 2 Mil por Semana"
                </h3>

                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
                  O guia completo com <strong className="text-ouro">10 passos simples</strong> e validados
                  para você começar a vender espetinhos e lucrar alto em até 7 dias, mesmo sem experiência.
                  Tudo o que você precisa para encher sua planilha de números positivos!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Receitas de tempero testadas por 10 anos",
                    "Técnicas de preparo profissional",
                    "Estratégias de ponto de venda",
                    "Como fidelizar clientes desde o dia 1",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-ouro shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-carvao mb-4">
                Dúvidas <span className="text-brasa">Frequentes</span>
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <FaqItem
                question="Como recebo a planilha e o acesso ao app?"
                answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para download da planilha CSV e as instruções para acessar o aplicativo. É rápido e simples!"
              />
              <FaqItem
                question="Preciso ter conhecimento avançado em Excel?"
                answer="Não! A planilha é intuitiva e acompanha um vídeo explicativo detalhado. O app é ainda mais fácil de usar — se você sabe usar o WhatsApp, vai saber usar o app."
              />
              <FaqItem
                question="O aplicativo funciona em qualquer celular?"
                answer="Sim! O aplicativo é acessível via navegador e compatível com a maioria dos smartphones Android e iOS. Não precisa baixar nada na loja, é só acessar pelo link."
              />
              <FaqItem
                question="Por quanto tempo terei acesso ao aplicativo?"
                answer="Garantimos 1 ano de acesso ao app. E enquanto o projeto perdurar, o aplicativo continuará no ar para seu uso indeterminadamente, sem custos adicionais! A planilha CSV é sua para sempre."
              />
              <FaqItem
                question="E se eu não gostar?"
                answer="Você tem 7 dias de garantia incondicional. Se não gostar ou não se adaptar, devolvemos 100% do seu dinheiro, sem perguntas. O risco é todo nosso!"
              />
              <FaqItem
                question="Serve para quem já vende espetinhos?"
                answer="Com certeza! Se você já vende mas não tem controle financeiro, essa ferramenta vai transformar seu negócio. Muitos vendedores experientes descobrem que estavam perdendo dinheiro sem saber."
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="relative py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-carvao/90" />
        </div>

        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <h2 className="font-['Poppins'] text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sua Decisão <span className="text-brasa">HOJE</span>,<br />
              Seu Lucro <span className="text-lucro">AMANHÃ</span>!
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Não deixe seu lucro escapar por falta de controle. Invista no seu negócio e na sua tranquilidade.
              Clique no botão abaixo e comece a transformar a gestão financeira do seu espetinho agora mesmo!
            </p>

            {/* Value Stack */}
            <div className="max-w-lg mx-auto mb-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="space-y-3 text-left mb-6">
                {[
                  { item: "Planilha de Gestão Financeira (CSV)", value: "R$ 97" },
                  { item: "Aplicativo de Gestão (1 ano)", value: "R$ 197" },
                  { item: "Vídeo-aula explicativa", value: "R$ 47" },
                  { item: "Protocolo Do Zero aos 2 Mil", value: "R$ 147" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-white/70 border-b border-white/10 pb-2">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lucro shrink-0" />
                      {row.item}
                    </span>
                    <span className="line-through text-white/40 font-['Poppins']">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-white/50 text-sm mb-1">Tudo isso por apenas:</p>
                <p className="font-['Poppins'] text-5xl md:text-6xl font-bold text-lucro">
                  R$ 67<span className="text-3xl">,00</span>
                </p>
                <p className="text-white/60 text-sm mt-2">ou <strong className="text-lucro">9x de R$ 8,76</strong></p>
              </div>
            </div>

            <CtaButton>
              Comprar Agora
            </CtaButton>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-lucro" />
                <span>7 dias de garantia</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-brasa" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-ouro" />
                <span>Planilha CSV + App</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-carvao py-8 border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Vendendo e Lucrando. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-white/70 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white/70 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white/70 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
