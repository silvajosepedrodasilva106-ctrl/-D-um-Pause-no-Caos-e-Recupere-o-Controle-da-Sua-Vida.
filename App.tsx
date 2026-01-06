
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Brain, 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Focus, 
  Wind, 
  BarChart3, 
  Smartphone,
  Quote,
  Clock,
  Menu,
  X,
  CreditCard,
  QrCode,
  Lock,
  ArrowLeft,
  ChevronRight,
  Star
} from 'lucide-react';

// --- Types ---
interface Testimonial {
  name: string;
  age: number;
  text: string;
  image: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

type ViewState = 'landing' | 'checkout';

// --- Data ---
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mariana Silva",
    age: 28,
    text: "Antes eu me sentia perdida e sobrecarregada com mil tarefas. Com o NeuroFlow, aprendi que microações salvam o meu dia. Hoje sou muito mais funcional.",
    image: "https://picsum.photos/seed/mariana/200/200"
  },
  {
    name: "Ricardo Mendes",
    age: 34,
    text: "Sempre lutei contra a procrastinação crônica. O app fala a minha língua. Não tem pressão, só progresso real e visual. Recomendo para todo TDAH.",
    image: "https://picsum.photos/seed/ricardo/200/200"
  },
  {
    name: "Beatriz Oliveira",
    age: 22,
    text: "A sensação de 'vencer o dia' é viciante. O NeuroFlow tirou o peso da minha consciência por não ser 'normal' e me deu as ferramentas certas.",
    image: "https://picsum.photos/seed/beatriz/200/200"
  }
];

const BENEFITS: Benefit[] = [
  {
    title: "Mais Foco e Clareza",
    description: "Tire o ruído mental e foque no que realmente importa em cada momento.",
    icon: <Focus className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Hábitos que Ficam",
    description: "Crie rotinas saudáveis sem o estresse de métodos rígidos e chatos.",
    icon: <Target className="w-6 h-6 text-green-600" />
  },
  {
    title: "Menos Ansiedade",
    description: "Reduza a sobrecarga mental e o sentimento de estar sempre atrasado.",
    icon: <Wind className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Autoestima Renovada",
    description: "Sinta o orgulho de concluir suas tarefas e ver seu progresso real.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />
  }
];

const STEPS = [
  {
    num: "01",
    title: "Escolha seu Foco",
    desc: "Ao acordar, defina sua prioridade principal com ajuda do nosso assistente intuitivo."
  },
  {
    num: "02",
    title: "Microações Rápidas",
    desc: "Receba orientações curtas e práticas de 2 a 5 minutos, desenhadas para o cérebro TDAH."
  },
  {
    num: "03",
    title: "Aplique no Fluxo",
    desc: "Execute sem paralisia por análise. O app guia você através do 'como fazer'."
  },
  {
    num: "04",
    title: "Acompanhe a Evolução",
    desc: "Visualize sua barra de progresso e desbloqueie conquistas por consistência."
  }
];

// --- Sub-Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  primary?: boolean;
}> = ({ children, className, onClick, primary = true }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
      primary 
      ? "bg-blue-600 text-white hover:bg-blue-700" 
      : "bg-green-500 text-white hover:bg-green-600"
    } ${className}`}
  >
    {children}
  </button>
);

const SectionHeading: React.FC<{ 
  title: string; 
  subtitle?: string; 
  light?: boolean;
  centered?: boolean;
}> = ({ title, subtitle, light, centered = true }) => (
  <div className={`mb-16 ${centered ? "text-center" : ""}`}>
    <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${light ? "text-white" : "text-slate-900"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-blue-100" : "text-slate-600"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const goToCheckout = () => {
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Render Views ---

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Checkout */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={() => setView('landing')}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para a página inicial
            </button>
            <div className="flex items-center gap-2">
              <Brain className="text-blue-600 w-6 h-6" />
              <span className="font-bold text-slate-800">NeuroFlow TDAH</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Coluna de Dados */}
            <div className="lg:col-span-3 space-y-8">
              {/* Passo 1: Planos */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</div>
                  Escolha seu Plano
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setSelectedPlan('monthly')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${selectedPlan === 'monthly' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-slate-900">Mensal</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-blue-600' : 'border-slate-300'}`}>
                        {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-900">R$ 29,90<span className="text-sm font-medium text-slate-500">/mês</span></p>
                    <p className="text-sm text-slate-500 mt-2">Cancele quando quiser.</p>
                  </div>
                  <div 
                    onClick={() => setSelectedPlan('annual')}
                    className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all ${selectedPlan === 'annual' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="absolute -top-3 right-4 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">Melhor Valor</div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-slate-900">Anual</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'annual' ? 'border-blue-600' : 'border-slate-300'}`}>
                        {selectedPlan === 'annual' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-900">R$ 19,90<span className="text-sm font-medium text-slate-500">/mês</span></p>
                    <p className="text-sm text-green-600 font-bold mt-2">Economize 33%</p>
                  </div>
                </div>
              </div>

              {/* Passo 2: Informações */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</div>
                  Seus Dados
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                    <input type="text" placeholder="Como no seu RG" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">E-mail para acesso</label>
                    <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                    <p className="text-[11px] text-slate-400 mt-2">Enviaremos os dados de acesso do app para este e-mail.</p>
                  </div>
                </div>
              </div>

              {/* Passo 3: Pagamento */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</div>
                  Pagamento
                </h3>
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all font-bold ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                  >
                    <CreditCard className="w-5 h-5" />
                    Cartão
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all font-bold ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                  >
                    <QrCode className="w-5 h-5" />
                    PIX
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <input type="text" placeholder="Número do Cartão" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Validade (MM/AA)" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                        <input type="text" placeholder="CVV" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                      </div>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white">
                        <option>1x de R$ {selectedPlan === 'annual' ? '238,80' : '29,90'}</option>
                        {selectedPlan === 'annual' && <option>12x de R$ 19,90</option>}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <QrCode className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="font-bold text-slate-800">O QR Code será gerado após o clique no botão.</p>
                    <p className="text-sm text-slate-500">Aprovação imediata e acesso liberado na hora.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-sm justify-center">
                <Lock className="w-4 h-4" />
                Pagamento processado em ambiente 100% seguro.
              </div>
            </div>

            {/* Coluna de Resumo */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 space-y-6">
                <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl"></div>
                  <h4 className="text-lg font-bold mb-6 pb-6 border-b border-white/10">Resumo da Compra</h4>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Plano NeuroFlow {selectedPlan === 'annual' ? 'Anual' : 'Mensal'}</span>
                      <span className="font-bold">R$ {selectedPlan === 'annual' ? '238,80' : '29,90'}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-400 font-bold">
                      <span>Acesso Imediato</span>
                      <span>GRÁTIS</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-between items-end mb-8">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Total hoje</p>
                      <p className="text-3xl font-black">R$ {selectedPlan === 'annual' ? '238,80' : '29,90'}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-5 text-lg bg-green-500 hover:bg-green-600 shadow-green-900/40"
                    onClick={() => alert('Parabéns! Seu acesso será enviado para o e-mail cadastrado.')}
                  >
                    FINALIZAR PAGAMENTO
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 7 dias de garantia incondicional
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Acesso vitalício aos dados históricos
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-blue-900">Suporte Prioritário</span>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Assinantes NeuroFlow têm canal direto via WhatsApp para dúvidas e orientações sobre o app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Landing View ---
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">NeuroFlow <span className="text-blue-600">TDAH</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToId('benefits')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Benefícios</button>
            <button onClick={() => scrollToId('how-it-works')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Como funciona</button>
            <button onClick={() => scrollToId('testimonials')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Depoimentos</button>
            <Button onClick={goToCheckout} className="py-2.5 px-6 text-sm" primary>Começar Agora</Button>
          </div>

          <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 p-6 shadow-xl border-t flex flex-col gap-4 animate-in slide-in-from-top">
            <button onClick={() => scrollToId('benefits')} className="py-2 text-left text-slate-700 font-medium border-b border-slate-100">Benefícios</button>
            <button onClick={() => scrollToId('how-it-works')} className="py-2 text-left text-slate-700 font-medium border-b border-slate-100">Como funciona</button>
            <button onClick={() => scrollToId('testimonials')} className="py-2 text-left text-slate-700 font-medium border-b border-slate-100">Depoimentos</button>
            <Button onClick={goToCheckout} className="mt-2">Quero Meu Foco de Volta</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 gradient-bg">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>Feito para o cérebro TDAH</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Dê um 'Pause' no Caos e <span className="text-blue-600">Recupere o Controle</span> da Sua Vida.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Foco, calma e organização mental sem complicação. O NeuroFlow transforma sua rotina com microações práticas de poucos minutos por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={goToCheckout} className="text-lg shadow-blue-200">
                COMEÇAR AGORA COM O NEUROFLOW
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-slate-500 text-sm font-medium">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
                ))}
              </div>
              <span>+10.000 usuários ativos hoje</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 glass-card p-4 md:p-8 rounded-[40px] shadow-2xl rotate-3">
              <img 
                src="https://picsum.photos/seed/app-mockup/600/800" 
                alt="NeuroFlow App Mockup" 
                className="rounded-[32px] w-full h-auto object-cover shadow-inner"
              />
              <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-lg border animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tarefa do Dia</p>
                    <p className="text-slate-800 font-bold">Foco atingido!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Conexão Emocional */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading 
            title="Você sente que sua mente tem 50 abas abertas ao mesmo tempo?"
            subtitle="Nós sabemos exatamente como é. O TDAH não é falta de vontade, é uma forma diferente de processar o mundo. E você não precisa lutar contra si mesmo."
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              "Sensação constante de sobrecarga",
              "Procrastinação que gera culpa",
              "Dificuldade em manter o foco",
              "Ansiedade pelo que ficou para trás",
              "Falta de organização mental",
              "Sentimento de potencial desperdiçado"
            ].map((pain, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que é e Diferenciais */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                centered={false}
                title="Conheça o NeuroFlow: O guia prático para sua mente TDAH"
                subtitle="Diferente de aplicativos complexos de produtividade que só aumentam seu estresse, o NeuroFlow foi desenhado para ser o seu porto seguro."
              />
              <div className="space-y-6">
                {[
                  { t: "Prático e Direto", d: "Sem textos longos ou aulas cansativas. Vá direto ao que importa." },
                  { t: "Microações Diárias", d: "Passos tão pequenos que é impossível o seu cérebro dar 'erro'." },
                  { t: "Sem Pressão", d: "Evolua no seu ritmo. Perdeu um dia? A gente te ajuda a recomeçar sem julgamentos." },
                  { t: "Acompanhamento Visual", d: "Veja seu progresso de forma clara, satisfatória e motivadora." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.t}</h4>
                      <p className="text-slate-600">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                  <Smartphone className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-bold text-lg">Uso Rápido</h3>
                  <p className="text-sm text-slate-500">Desenvolvido para caber em qualquer rotina corrida.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                  <Clock className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="font-bold text-lg">Efeito Imediato</h3>
                  <p className="text-sm text-slate-500">Sinta a clareza mental logo após a primeira ação.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                  <Zap className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="font-bold text-lg">Gamificado</h3>
                  <p className="text-sm text-slate-500">Mantenha a dopamina no lugar certo com conquistas.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                  <ShieldCheck className="w-10 h-10 text-teal-500 mb-4" />
                  <h3 className="font-bold text-lg">Seguro</h3>
                  <p className="text-sm text-slate-500">Baseado em princípios comportamentais validados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios (ID: benefits) */}
      <section id="benefits" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Sua transformação começa com pequenos passos"
            subtitle="O NeuroFlow não muda quem você é, ele apenas ajuda você a ser a sua melhor versão."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona (ID: how-it-works) */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative scroll-mt-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading 
            light
            title="Como o NeuroFlow funciona na prática"
            subtitle="Um método pensado para a jornada TDAH: simples, visual e livre de culpa."
          />
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-blue-600/20 absolute -top-8 -left-4 select-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 border-t border-dashed border-slate-700"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Button onClick={goToCheckout} className="bg-white text-slate-900 hover:bg-slate-100 shadow-white/10">
              Quero experimentar esse método
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos (ID: testimonials) */}
      <section id="testimonials" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="O que dizem quem já vive o Flow"
            subtitle="Pessoas reais que transformaram sua relação com o TDAH."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-6 relative">
                <Quote className="absolute top-6 right-8 text-blue-200 w-12 h-12" />
                <p className="text-slate-700 leading-relaxed relative z-10 italic">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}, {t.age} anos</h4>
                    <div className="flex text-yellow-400 text-xs">
                      {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div className="bg-white p-10 rounded-[40px] shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-green-500 w-8 h-8" />
              Isso é para você se:
            </h3>
            <ul className="space-y-4 text-slate-700">
              <li>• Você tem TDAH ou se identifica com os sintomas.</li>
              <li>• Sente que o dia passa e você não fez o que deveria.</li>
              <li>• Está cansado de se sentir 'preguiçoso'.</li>
              <li>• Busca uma solução que entenda como seu cérebro funciona.</li>
              <li>• Quer ter mais tempo livre e menos culpa.</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <X className="text-red-500 w-8 h-8" />
              NÃO é para você se:
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li>• Você busca uma pílula mágica.</li>
              <li>• Não quer dedicar 5 minutos por dia.</li>
              <li>• Acredita que não precisa de mudanças.</li>
              <li>• Busca um substituto para terapia médica.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA (ID: cta-section) */}
      <section id="cta-section" className="py-24 bg-blue-600 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-300 blur-[100px] rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Pronto para transformar o seu caos em clareza?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Junte-se a milhares de pessoas que aprenderam a domar o TDAH e estão vivendo com muito mais foco e autoestima.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Button onClick={goToCheckout} className="text-xl px-12 py-6 bg-white text-blue-600 hover:bg-slate-100 shadow-xl shadow-blue-900/20">
              COMEÇAR AGORA COM O NEUROFLOW TDAH
              <ArrowRight className="w-6 h-6" />
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Cancelamento fácil</span>
              <span className="hidden sm:inline opacity-30">|</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Teste grátis por 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">NeuroFlow <span className="text-blue-600">TDAH</span></span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Nossa missão é ajudar pessoas com TDAH a viverem de forma mais plena e organizada através da tecnologia e psicologia comportamental.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navegação</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => scrollToId('benefits')} className="hover:text-blue-400 transition-colors">Benefícios</button></li>
                <li><button onClick={() => scrollToId('how-it-works')} className="hover:text-blue-400 transition-colors">Como funciona</button></li>
                <li><button onClick={() => scrollToId('testimonials')} className="hover:text-blue-400 transition-colors">Depoimentos</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NeuroFlow TDAH. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1 text-center">Feito com <span className="text-red-500">❤️</span> para a comunidade TDAH.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
