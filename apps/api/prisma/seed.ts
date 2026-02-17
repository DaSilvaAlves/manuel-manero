import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data (optional)
  // await prisma.event.deleteMany({})
  // await prisma.testimonialVideo.deleteMany({})
  // await prisma.program.deleteMany({})
  // ... other tables

  // Seed Programs
  const primeProgram = await prisma.program.upsert({
    where: { slug: 'prime' },
    update: {},
    create: {
      name: 'PRIME',
      slug: 'prime',
      description: 'Fundamentos de Personal Branding',
      longDesc: 'O programa de entrada para quem quer construir uma marca pessoal forte desde zero.',
      price: 597,
      currency: 'EUR',
      duration: '4 semanas intensas',
      modules: 4,
      modulesDetail: {
        modules: [
          { title: 'Descoberta', description: 'Identifique seu diferencial único' },
          { title: 'Posicionamento', description: 'Defina exatamente como você quer ser percebido' },
          { title: 'Comunicação', description: 'Comunique com impacto e autenticidade' },
          { title: 'Execução', description: 'Implemente sua estratégia em tempo real' },
        ],
      },
      published: true,
    },
  })

  const masteryProgram = await prisma.program.upsert({
    where: { slug: 'mastery' },
    update: {},
    create: {
      name: 'MASTERY',
      slug: 'mastery',
      description: 'Escalação de Marca Pessoal',
      longDesc: 'Para quem já tem marca e quer escalar para se tornar referência e gerar vendas em escala.',
      price: 1997,
      currency: 'EUR',
      duration: '16 semanas + acesso vitalício',
      modules: 4,
      modulesDetail: {
        modules: [
          { title: 'Monetização', description: 'Estruture seus fluxos de receita' },
          { title: 'Autoridade', description: 'Torne-se incontestável no seu nicho' },
          { title: 'Comunidade', description: 'Construa seu ecossistema de clientes' },
          { title: 'Máquina de Crescimento', description: 'Automatize sua visibilidade' },
        ],
      },
      published: true,
    },
  })

  const mentoriasProgram = await prisma.program.upsert({
    where: { slug: 'mentorias' },
    update: {},
    create: {
      name: 'Mentorias',
      slug: 'mentorias',
      description: '1:1 e Mastermind Premium',
      longDesc: 'Acesso direto a Manuel para estratégia e mentoria personalizada.',
      currency: 'EUR',
      duration: 'Customizado (3-12 meses)',
      modules: 0,
      published: true,
    },
  })

  // Seed Testimonial Videos
  const testimonials = [
    {
      name: 'Carlos Mendes',
      role: 'Consultor Freelancer',
      quote: 'Em 4 semanas, minha presença online transformou completamente.',
      videoUrl: 'https://youtube.com/example1',
      programs: { connect: [{ id: primeProgram.id }] },
    },
    {
      name: 'Sofia Gonçalves',
      role: 'Coach de Vida',
      quote: 'MASTERY foi um game-changer. Em 6 meses, minha receita triplicou.',
      videoUrl: 'https://youtube.com/example2',
      programs: { connect: [{ id: masteryProgram.id }] },
    },
    {
      name: 'Pedro Alves',
      role: 'CEO de Startup',
      quote: 'Mentorias personalizadas transformação acelerada.',
      videoUrl: 'https://youtube.com/example3',
      programs: { connect: [{ id: mentoriasProgram.id }] },
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonialVideo.upsert({
      where: { name: testimonial.name },
      update: {
        programs: testimonial.programs,
      },
      create: {
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        videoUrl: testimonial.videoUrl,
        published: true,
        programs: testimonial.programs,
      },
    })
  }

  // Seed Content
  const contentItems = [
    {
      title: 'Como Construir uma Marca Pessoal Forte',
      slug: 'como-construir-marca-pessoal',
      type: 'blog',
      category: 'marca-pessoal',
      published: true,
    },
    {
      title: 'O Método de Comunicação Estratégica',
      slug: 'metodo-comunicacao-estrategica',
      type: 'blog',
      category: 'comunicacao',
      published: true,
    },
    {
      title: 'Mindset para Crescimento Exponencial',
      slug: 'mindset-crescimento',
      type: 'blog',
      category: 'mindset',
      published: true,
    },
  ]

  for (const content of contentItems) {
    await prisma.content.upsert({
      where: { slug: content.slug },
      update: {},
      create: {
        ...content,
        description: `Descubra insights sobre ${content.title}`,
        content: `<p>Conteúdo detalhado sobre ${content.title}...</p>`,
      },
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`📊 Programs created: ${primeProgram.name}, ${masteryProgram.name}, ${mentoriasProgram.name}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
