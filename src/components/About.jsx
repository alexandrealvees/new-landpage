import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiShield, FiTarget, FiEye, FiSmartphone,
  FiActivity, FiAward, FiBriefcase,
} from 'react-icons/fi'
import { SiAndroid, SiKalilinux, SiBurpsuite, SiOwasp } from 'react-icons/si'
import SectionWrapper from './SectionWrapper'

const highlights = [
  {
    icon: FiTarget,
    title: 'Red Team',
    desc: 'Simulações avançadas de adversários com TTPs reais, evasão de detecção e emulação de ameaças persistentes.',
    gradient: 'linear-gradient(135deg,#00d4ff,#3b82f6)',
  },
  {
    icon: FiShield,
    title: 'Pentest',
    desc: 'Testes de intrusão em Web, APIs REST/GraphQL e ambientes mobile Android/iOS com exploração em cenários reais.',
    gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
  },
  {
    icon: FiEye,
    title: 'Threat Intelligence',
    desc: 'Coleta e análise de inteligência de ameaças, atribuição de atores e suporte a operações de CTEM.',
    gradient: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Security',
    desc: 'Análise de segurança em aplicações Android e iOS — engenharia reversa, análise dinâmica e exploração.',
    gradient: 'linear-gradient(135deg,#ec4899,#00d4ff)',
  },
]

const tools = [
  { label: 'Kali Linux', icon: SiKalilinux },
  { label: 'Burp Suite', icon: SiBurpsuite },
  { label: 'OWASP', icon: SiOwasp },
  { label: 'Android', icon: SiAndroid },
]

const tags = [
  'Red Team', 'Pentest', 'AppSec', 'Threat Intel',
  'Mobile Security', 'CTEM', 'OWASP', 'REST/GraphQL',
  'Android / iOS', 'Pós-Exploração', 'Evasão', 'IA + CyberSec',
]

const stats = [
  { value: '10+', label: 'Anos de experiência' },
  { value: '50+', label: 'Testes executados' },
  { value: '∞', label: 'Vulnerabilidades críticas' },
]

export default function About() {
  const [tagsRef, tagsInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <SectionWrapper id="sobre">
      <div className="max-w-7xl mx-auto space-y-20">

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
            >
              Resumo Profissional
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.9rem,4vw,3rem)' }}
            >
              <span className="text-white">Especialista em </span>
              <span className="gradient-text">Segurança Ofensiva</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 mb-6"
            >
              <p className="text-gray-300 leading-relaxed text-sm md:text-[15px]">
                Especialista em{' '}
                <span className="text-neon-cyan font-semibold">Segurança Ofensiva</span>{' '}
                com mais de{' '}
                <span className="text-white font-semibold">10 anos de experiência</span>{' '}
                em TI, atuando em{' '}
                <span className="text-neon-purple font-medium">Red Team</span>,{' '}
                <span className="text-neon-purple font-medium">Pentest</span>,{' '}
                <span className="text-neon-purple font-medium">AppSec</span>,{' '}
                <span className="text-neon-purple font-medium">Threat Intelligence</span>{' '}
                e{' '}
                <span className="text-neon-purple font-medium">Mobile Security</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 text-gray-400 text-sm leading-relaxed"
            >
              <p>
                Executa simulações avançadas de adversários e testes de intrusão em
                aplicações <span className="text-white">Web</span>,{' '}
                APIs <span className="text-neon-cyan">(REST/GraphQL)</span> e ambientes
                mobile <span className="text-white">(Android/iOS)</span>, com foco na
                identificação de falhas críticas e exploração em cenários reais.
              </p>
              <p>
                Experiência completa no ciclo ofensivo:{' '}
                <span className="text-neon-cyan">reconhecimento</span>,{' '}
                <span className="text-neon-cyan">enumeração</span>,{' '}
                <span className="text-neon-cyan">exploração</span>,{' '}
                <span className="text-neon-cyan">pós-exploração</span> e{' '}
                <span className="text-neon-pink">evasão de detecção</span>.
              </p>
              <p>
                Pós-graduado em <span className="text-white font-medium">Segurança Ofensiva</span>,
                Atua em iniciativas de <span className="text-neon-cyan font-semibold">CTEM</span>,
                contribuindo para a identificação contínua de superfícies de ataque e
                fortalecimento da postura de segurança.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              {[
                { icon: FiAward, label: 'Pós-graduado em Segurança Ofensiva' },
                { icon: FiBriefcase, label: 'Especialização em IA aplicada à Cibersegurança' },
                { icon: FiActivity, label: 'Contribuições ativas em CTEM & Attack Surface Management' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <item.icon className="text-neon-cyan mt-0.5 flex-shrink-0" size={15} />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-6">

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="glass-card rounded-2xl p-5 text-center group"
                >
                  <p className="font-display font-bold gradient-text mb-1"
                    style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>
                    {s.value}
                  </p>
                  <p className="text-gray-500 text-[11px] uppercase tracking-wider leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="glass-card rounded-2xl p-5 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: item.gradient, padding: 1 }}
                  >
                    <div className="w-full h-full rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(10,10,26,0.85)' }}>
                      <item.icon className="text-white" size={17} />
                    </div>
                  </div>
                  <h3 className="text-white font-display font-semibold text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              ref={tagsRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={tagsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.04 }}
                  className="px-3 py-1.5 text-[11px] font-mono rounded-lg cursor-default transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00d4ff'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                    e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
