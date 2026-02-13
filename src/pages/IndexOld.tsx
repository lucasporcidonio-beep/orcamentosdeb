import { motion } from "framer-motion";
import photographerImg from "@/assets/photographer.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import event1 from "@/assets/gallery-1.jpg";
import aboutPhoto from "@/assets/photographer.jpg";
import servicesPhoto from "@/assets/contact-photo.jpg";
import gallery2 from "@/assets/gallery-1.jpg";
import constellation from "@/assets/gallery-1.jpg";
import moonImg from "@/assets/gallery-1.jpg";
import realtimeImg from "@/assets/realtime.jpg";
import albumImg from "@/assets/gallery-1.jpg";
import memoriesImg from "@/assets/gallery-1.jpg";
import portfolioImg from "@/assets/gallery-1.jpg";
import contactPhoto from "@/assets/contact-photo.jpg";
import { Star, Camera, Image, BookOpen, Frame, Instagram, Phone, Globe, Facebook } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Index = () => {
  return (
    <div className="min-h-screen gradient-navy stars-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-foreground tracking-wide mb-8">
            DEBUTANTES
          </h1>

          {/* Logo area */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center animate-float">
              <Camera className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-elegant text-foreground tracking-widest">
              Lucas Porcidonio
            </h2>
            <p className="text-sm font-body tracking-[0.3em] text-muted-foreground uppercase">
              Fotografia
            </p>
          </div>
        </motion.div>

        {/* Decorative stars */}
        {[...Array(6)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-primary/20 animate-twinkle"
            size={8 + i * 4}
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={photographerImg}
                  alt="Lucas Porcidonio"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="text-primary text-sm font-body tracking-wider">Fotógrafo</p>
                  <h2 className="text-2xl font-display font-bold text-foreground">LUCAS PORCIDONIO</h2>
                  <p className="text-primary text-sm">@lucasporcidonio.fotografia</p>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-display italic text-primary mb-4">
                DEBUTANTES
              </h3>
              <p className="text-2xl font-elegant italic text-foreground mb-6">
                Fotografia que Eterniza Momentos
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Especialista em capturar a beleza e a magia dos 15 anos, com foco em personalização e serviços exclusivos que transformam sonhos em memórias inesquecíveis.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <img
                src={aboutPhoto}
                alt="Fotografia de debutante"
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[gallery1, event1, gallery2, servicesPhoto, constellation, moonImg].map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="overflow-hidden rounded-lg aspect-[3/4]"
                >
                  <img
                    src={img}
                    alt={`Portfolio ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Importance Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display italic text-primary mb-8">
              A Importância de Registrar seus 15 Anos
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-body text-muted-foreground leading-relaxed mb-6">
              Faça um ensaio de 15 anos que vai marcar a sua vida. Não é só uma sessão de fotos; é uma forma de guardar a sua história, a sua felicidade, a sua beleza. Você vai se sentir especial, e vai ter fotos incríveis para sempre.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg font-body text-muted-foreground leading-relaxed">
              Sua família e seus amigos também vão amar ver o seu ensaio. É um presente que passa de geração em geração. Eternize os seus 15 anos com um ensaio mágico. Momentos assim merecem ser eternos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Transformando Sonhos */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display italic text-primary mb-8">
              Transformando sonhos em memórias
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-body text-foreground/80 leading-relaxed mb-10">
              Meu objetivo é capturar a alegria, a beleza e a magia dos seus 15 anos. Cada sessão de fotografia é cuidadosamente planejada para registrar os momentos mais especiais, como sorrisos e olhares, para que você possa eternizar essas lembranças únicas.
            </motion.p>
            <motion.div variants={fadeUp} className="bg-card/80 backdrop-blur p-6 rounded-lg inline-block">
              <p className="text-xl font-display font-bold text-foreground tracking-wider">
                "TUDO QUE É FEITO COM AMOR, COM AMOR SERÁ LEMBRADO"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display text-primary mb-12 text-center">
              Serviços que Eternizam a Magia dos 15 Anos
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Camera, title: "Ensaio de 15 Anos", desc: "Sessão de fotos pré-evento para capturar a debutante em locais de sua escolha, como parques, praia, estúdio, etc." },
                { icon: Star, title: "Cobertura da Festa", desc: "Fotografia durante a festa para documentar todos os momentos especiais, incluindo a entrada triunfal, a valsa, o parabéns e muito mais." },
                { icon: Image, title: "Fotografias Impressas", desc: "Opção de imprimir as fotos em diferentes tamanhos para lembranças físicas da celebração." },
                { icon: Frame, title: "Banner Personalizado", desc: "Criação de um banner decorativo com a foto mais deslumbrante do ensaio para uso na festa." },
                { icon: BookOpen, title: "Álbum Personalizado", desc: "Design de um álbum de fotos personalizado contendo as melhores imagens do ensaio e da festa." },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card/60 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-colors duration-300"
                >
                  <service.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Packages */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {/* Constelação */}
            <motion.div variants={fadeUp} className="bg-card/60 backdrop-blur border border-primary/30 rounded-2xl p-8 md:p-12 mb-12">
              <h3 className="text-3xl md:text-4xl font-display italic text-primary mb-4">
                PACOTE CONSTELAÇÃO
              </h3>
              <p className="font-elegant italic text-foreground/70 mb-8 text-lg">
                "A experiência completa para brilhar em cada momento dos seus 15 anos. Um pacote feito para quem deseja registrar cada detalhe com elegância e exclusividade."
              </p>
              <ul className="space-y-3 mb-8 font-body text-foreground/90">
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Cobertura fotográfica do evento com duração de até <strong>5 horas</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Edição e entrega de <strong>250 a 300 fotos digitais</strong> em alta resolução</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span><strong>Ensaio fotográfico</strong> pré-evento para criar memórias extras</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span><strong>Quadro 60x40</strong> com a foto mais bonita do ensaio</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span><strong>Álbum impresso</strong> Fotolivro 360° 20x20 com 30 páginas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>(BONUS) <strong>Vídeo Vida:</strong> Um emocionante vídeo que retrata a trajetória da aniversariante</span>
                </li>
              </ul>
              <div className="flex flex-wrap items-end gap-6">
                <div>
                  <span className="price-badge text-4xl px-6 py-3 rounded-lg inline-block">R$2499</span>
                  <p className="text-foreground font-body font-semibold mt-2">À Vista</p>
                </div>
                <div className="text-foreground/70 font-body">
                  <p>Ou <span className="text-primary font-bold text-xl">12x R$249</span> No Cartão</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-body">Fotógrafo adicional: <span className="text-primary font-semibold">R$599</span></p>
            </motion.div>

            {/* Lua Cheia + Estrela Cadente */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="bg-card/60 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h3 className="text-2xl md:text-3xl font-display italic text-primary mb-4">
                  PACOTE LUA CHEIA
                </h3>
                <p className="font-elegant italic text-foreground/70 mb-6 text-sm">
                  Capture a essência do grande dia com um pacote que equilibra o essencial e o encantador.
                </p>
                <ul className="space-y-2 mb-6 font-body text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span>Cobertura fotográfica até <strong>5 horas</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span><strong>200 a 250 fotos</strong> digitais em alta resolução</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span><strong>Ensaio fotográfico</strong> pré-evento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span>(BONUS) <strong>Banner personalizado</strong></span>
                  </li>
                </ul>
                <div>
                  <span className="price-badge text-3xl px-5 py-2 rounded-lg inline-block">R$1699</span>
                  <p className="text-foreground font-body text-sm font-semibold mt-2">À Vista ou <span className="text-primary">12x R$169</span></p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-card/60 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h3 className="text-2xl md:text-3xl font-display italic text-primary mb-4">
                  PACOTE ESTRELA CADENTE
                </h3>
                <p className="font-elegant italic text-foreground/70 mb-6 text-sm">
                  "Para quem deseja um registro encantador e acessível, sem deixar de lado a magia dos 15 anos."
                </p>
                <ul className="space-y-2 mb-6 font-body text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span>Cobertura fotográfica até <strong>4 horas</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-primary mt-1.5 shrink-0" />
                    <span><strong>150 a 200 fotos</strong> digitais em alta resolução</span>
                  </li>
                </ul>
                <div>
                  <span className="price-badge text-3xl px-5 py-2 rounded-lg inline-block">R$999</span>
                  <p className="text-foreground font-body text-sm font-semibold mt-2">À Vista ou <span className="text-primary">12x R$99</span></p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground font-body">Fotógrafo adicional: <span className="text-primary font-semibold">R$599</span></p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Diferencial - Cobertura em Tempo Real */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-display italic text-primary mb-1">Diferencial:</h3>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 uppercase tracking-wide">
                Cobertura de Eventos em Tempo Real
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-sm">
                Viva o seu evento de debutante de maneira única. Além da fotografia, oferecemos uma experiência interativa, permitindo que cada momento especial seja compartilhado instantaneamente nas redes sociais.
              </p>
              <div className="mb-6">
                <h4 className="text-primary font-elegant italic text-xl mb-3">O que Inclui:</h4>
                <ul className="space-y-2 font-body text-sm text-foreground/90">
                  <li>• Stories ilimitados</li>
                  <li>• Criação de Destaque no Perfil</li>
                  <li>• 1 Mini Vídeo Editado (Reels)</li>
                  <li>• Envio dos Registros via Link</li>
                </ul>
              </div>
              <div>
                <span className="price-badge text-3xl px-5 py-2 rounded-lg inline-block">R$599</span>
                <p className="text-muted-foreground font-body text-sm mt-2">Até 5h de evento</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <img src={realtimeImg} alt="Cobertura em tempo real" className="w-full rounded-xl shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Adicionais */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display italic text-primary text-center mb-12">
              ADICIONAIS
            </motion.h2>

            <motion.div variants={fadeUp} className="bg-card/60 backdrop-blur rounded-xl border border-border/50 overflow-hidden">
              {[
                { item: "Quadro 60x40", price: "R$349" },
                { item: "Banner 90x60", price: "R$189" },
                { item: "Fotos Impressas", price: "R$15 cada" },
                { item: "Pack 10 Fotos", price: "R$120" },
                { item: "Pack 30 Fotos", price: "R$300" },
                { item: "Álbum 25x25 (30 páginas)", price: "R$999" },
                { item: "Álbum 30x30 (30 páginas)", price: "R$1299" },
                { item: "Vídeo Vida (Até 10 Min)", price: "R$150" },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center px-6 py-4 font-body ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                  <span className="text-foreground">{row.item}</span>
                  <span className="text-primary font-bold text-lg">{row.price}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <img src={albumImg} alt="Álbum" className="w-full rounded-xl shadow-lg max-h-64 object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Formas de Pagamento */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-4">
              FORMAS DE PAGAMENTO
            </motion.h2>
            <motion.p variants={fadeUp} className="text-center text-muted-foreground font-body mb-4">
              Oferecemos opções de parcelamento flexíveis para atender às suas necessidades.
            </motion.p>
            <motion.p variants={fadeUp} className="text-center text-primary font-body font-semibold mb-10">
              Comece a criar memórias sem se preocupar com o orçamento.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { title: "Cartão de Crédito", desc: "Taxa adicional de 10% sobre o valor total. Juros calculados na maquininha." },
                { title: "Pix e Dinheiro à Vista", desc: "Sem taxas adicionais, proporcionando conveniência e economia." },
                { title: "Parcelamento sem Juros", desc: "Pague mensalmente até o dia da festa. Entre em contato para mais informações." },
              ].map((method, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-card/60 backdrop-blur border border-border/50 rounded-xl p-6">
                  <h4 className="font-display font-bold text-foreground mb-3 text-lg">{method.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{method.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
              <h4 className="text-2xl font-display font-bold text-primary mb-4">IMPORTANTE</h4>
              <ul className="font-body text-sm text-foreground/80 space-y-2">
                <li>*O pagamento será 20% no agendamento e o restante até o dia da festa.</li>
                <li>*Remarcação de datas com no máximo 7 dias de antecedência.</li>
                <li>*Cancelamento não será devolvido o valor pago.</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Memories / Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <p className="font-body text-foreground/80 leading-relaxed mb-6">
                Uma festa de 15 anos é um evento único, repleto de alegria, emoção e momentos que merecem ser preservados para sempre. Imagine poder reviver cada sorriso, cada abraço e cada lágrima de felicidade sempre que desejar.
              </p>
              <p className="font-body text-foreground/80 leading-relaxed">
                Nossas recordações profissionais não são apenas fotos e vídeos; são tesouros vivos que trazem de volta a alegria e a emoção desse dia especial. Elas são um investimento em sua felicidade presente e futura.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img src={memoriesImg} alt="Memórias" className="w-full rounded-xl shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Portfolio */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display italic text-primary text-center mb-12">
              ALGUNS TRABALHOS
            </motion.h2>
            <motion.div variants={fadeUp}>
              <img src={portfolioImg} alt="Portfólio" className="w-full rounded-xl shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Contact / Footer */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4 mb-8">
                <img src={photographerImg} alt="Lucas" className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
                <div>
                  <p className="text-primary text-xs font-body tracking-wider uppercase">Fotógrafo</p>
                  <h2 className="text-2xl font-display font-bold text-foreground">LUCAS PORCIDONIO</h2>
                  <p className="text-primary text-sm">@lucasporcidonio.fotografia</p>
                </div>
              </div>

              <p className="font-body text-foreground/80 leading-relaxed mb-8 text-sm">
                Você pode se perguntar por que algumas pessoas têm fotos melhores do que outras. A resposta é simples: a diferença está na entrega total de ambas as partes. Quando você se permite se entregar completamente ao momento, as lembranças se tornam mais verdadeiras e emocionantes.
              </p>

              <h3 className="text-xl font-display italic text-foreground mb-2">
                FICOU COM ALGUMA DÚVIDA?
              </h3>
              <p className="font-body text-muted-foreground text-sm mb-6">
                ENTRE EM CONTATO EM ALGUM DOS CANAIS DE COMUNICAÇÃO
              </p>

              <div className="bg-card/80 backdrop-blur border border-border/50 rounded-xl p-6">
                <h4 className="font-body font-bold text-foreground mb-4 tracking-wider text-sm">SIGA NAS REDES SOCIAIS</h4>
                <div className="space-y-3">
                  <a href="tel:+5515997485268" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-body">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>15 99748-5268</span>
                  </a>
                  <a href="https://www.lucasporcidonio.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary hover:text-gold-light transition-colors font-body text-sm">
                    <Globe className="w-5 h-5" />
                    <span>www.lucasporcidonio.com.br</span>
                  </a>
                  <div className="flex gap-4 mt-4">
                    <a href="https://www.instagram.com/lucasporcidonio.fotografia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                      <Instagram className="w-5 h-5 text-primary" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                      <Facebook className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <img src={contactPhoto} alt="Lucas Porcidonio" className="w-full rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/30">
        <p className="font-body text-sm text-muted-foreground">
          © 2025 Lucas Porcidonio Fotografia • Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
