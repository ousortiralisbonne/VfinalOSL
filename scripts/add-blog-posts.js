// Script pour ajouter des articles de blog dans Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Vous devrez ajouter votre token
})

// Articles de blog à ajouter
const blogPosts = [
  {
    id: 'lisbonne-7-collines',
    title: {
      en: 'The 7 Hills of Lisbon: A Complete Guide',
      fr: 'Les 7 Collines de Lisbonne : Guide Complet',
      pt: 'As 7 Colinas de Lisboa: Guia Completo'
    },
    excerpt: {
      en: 'Discover the seven hills that define Lisbon\'s unique topography and learn about the neighborhoods, viewpoints, and hidden gems on each one.',
      fr: 'Découvrez les sept collines qui définissent la topographie unique de Lisbonne et apprenez-en plus sur les quartiers, points de vue et trésors cachés de chacune.',
      pt: 'Descubra as sete colinas que definem a topografia única de Lisboa e conheça os bairros, miradouros e tesouros escondidos de cada uma.'
    },
    content: {
      en: [
        {
          _type: 'block',
          _key: 'intro',
          children: [
            {
              _type: 'span',
              _key: 'intro-span',
              text: 'Lisbon, often called the "City of Seven Hills," is built on a series of hills that create its distinctive landscape and offer breathtaking views of the Tagus River and the Atlantic Ocean.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hills-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'hills-title-span',
              text: 'The Seven Hills of Lisbon'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill1',
          children: [
            {
              _type: 'span',
              _key: 'hill1-span',
              text: '1. São Jorge Hill (Castelo) - Home to the iconic São Jorge Castle, this hill offers panoramic views and a journey through medieval history.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill2',
          children: [
            {
              _type: 'span',
              _key: 'hill2-span',
              text: '2. São Vicente Hill - Known for the National Pantheon and the beautiful Alfama district with its narrow streets and Fado houses.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill3',
          children: [
            {
              _type: 'span',
              _key: 'hill3-span',
              text: '3. Sant\'Ana Hill - A quieter residential area with charming viewpoints and local restaurants.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill4',
          children: [
            {
              _type: 'span',
              _key: 'hill4-span',
              text: '4. Santo André Hill - Features the Graça neighborhood and the famous Miradouro da Graça viewpoint.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill5',
          children: [
            {
              _type: 'span',
              _key: 'hill5-span',
              text: '5. Chagas Hill - Home to the trendy Bairro Alto district, known for its nightlife and bohemian atmosphere.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill6',
          children: [
            {
              _type: 'span',
              _key: 'hill6-span',
              text: '6. Santa Catarina Hill - Features the Miradouro de Santa Catarina with stunning sunset views over the river.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill7',
          children: [
            {
              _type: 'span',
              _key: 'hill7-span',
              text: '7. Estrela Hill - Home to the beautiful Estrela Basilica and the peaceful Jardim da Estrela park.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tips-span',
              text: 'Tips for Exploring the Hills'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips-content',
          children: [
            {
              _type: 'span',
              _key: 'tips-content-span',
              text: '• Wear comfortable walking shoes as the streets can be steep\n• Take the historic trams (especially Tram 28) for a scenic route\n• Visit during sunset for the most spectacular views\n• Don\'t miss the local viewpoints (miradouros) for photo opportunities\n• Try the local pastéis de nata at the top of each hill as a reward!'
            }
          ]
        }
      ],
      fr: [
        {
          _type: 'block',
          _key: 'intro-fr',
          children: [
            {
              _type: 'span',
              _key: 'intro-fr-span',
              text: 'Lisbonne, souvent appelée la "Ville aux Sept Collines", est construite sur une série de collines qui créent son paysage distinctif et offrent des vues époustouflantes sur le Tage et l\'océan Atlantique.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hills-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'hills-title-fr-span',
              text: 'Les Sept Collines de Lisbonne'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill1-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill1-fr-span',
              text: '1. Colline de São Jorge (Castelo) - Abrite le château emblématique de São Jorge, cette colline offre des vues panoramiques et un voyage à travers l\'histoire médiévale.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill2-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill2-fr-span',
              text: '2. Colline de São Vicente - Connue pour le Panthéon national et le magnifique quartier de l\'Alfama avec ses rues étroites et ses maisons de Fado.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill3-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill3-fr-span',
              text: '3. Colline de Sant\'Ana - Une zone résidentielle plus calme avec des points de vue charmants et des restaurants locaux.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill4-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill4-fr-span',
              text: '4. Colline de Santo André - Comprend le quartier de Graça et le célèbre point de vue Miradouro da Graça.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill5-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill5-fr-span',
              text: '5. Colline de Chagas - Abrite le quartier branché de Bairro Alto, connu pour sa vie nocturne et son atmosphère bohème.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill6-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill6-fr-span',
              text: '6. Colline de Santa Catarina - Comprend le Miradouro de Santa Catarina avec des vues spectaculaires sur le coucher de soleil au-dessus de la rivière.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill7-fr',
          children: [
            {
              _type: 'span',
              _key: 'hill7-fr-span',
              text: '7. Colline d\'Estrela - Abrite la magnifique basilique d\'Estrela et le paisible parc Jardim da Estrela.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tips-fr-span',
              text: 'Conseils pour Explorer les Collines'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'tips-content-fr-span',
              text: '• Portez des chaussures confortables car les rues peuvent être raides\n• Prenez les tramways historiques (surtout le Tram 28) pour un parcours pittoresque\n• Visitez au coucher du soleil pour les vues les plus spectaculaires\n• Ne manquez pas les points de vue locaux (miradouros) pour les opportunités photos\n• Essayez les pastéis de nata locaux au sommet de chaque colline comme récompense !'
            }
          ]
        }
      ],
      pt: [
        {
          _type: 'block',
          _key: 'intro-pt',
          children: [
            {
              _type: 'span',
              _key: 'intro-pt-span',
              text: 'Lisboa, frequentemente chamada de "Cidade das Sete Colinas", é construída sobre uma série de colinas que criam sua paisagem distintiva e oferecem vistas deslumbrantes do Tejo e do Oceano Atlântico.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hills-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'hills-title-pt-span',
              text: 'As Sete Colinas de Lisboa'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill1-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill1-pt-span',
              text: '1. Colina de São Jorge (Castelo) - Lar do icônico Castelo de São Jorge, esta colina oferece vistas panorâmicas e uma jornada pela história medieval.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill2-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill2-pt-span',
              text: '2. Colina de São Vicente - Conhecida pelo Panteão Nacional e pelo belo bairro de Alfama com suas ruas estreitas e casas de Fado.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill3-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill3-pt-span',
              text: '3. Colina de Sant\'Ana - Uma área residencial mais tranquila com mirantes encantadores e restaurantes locais.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill4-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill4-pt-span',
              text: '4. Colina de Santo André - Inclui o bairro da Graça e o famoso miradouro da Graça.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill5-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill5-pt-span',
              text: '5. Colina de Chagas - Lar do bairro trendy do Bairro Alto, conhecido por sua vida noturna e atmosfera boêmia.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill6-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill6-pt-span',
              text: '6. Colina de Santa Catarina - Inclui o Miradouro de Santa Catarina com vistas espetaculares do pôr do sol sobre o rio.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'hill7-pt',
          children: [
            {
              _type: 'span',
              _key: 'hill7-pt-span',
              text: '7. Colina da Estrela - Lar da bela Basílica da Estrela e do pacífico Jardim da Estrela.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tips-pt-span',
              text: 'Dicas para Explorar as Colinas'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tips-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'tips-content-pt-span',
              text: '• Use sapatos confortáveis pois as ruas podem ser íngremes\n• Pegue os bondes históricos (especialmente o Bond 28) para uma rota pitoresca\n• Visite durante o pôr do sol para as vistas mais espetaculares\n• Não perca os mirantes locais para oportunidades de fotos\n• Experimente os pastéis de nata locais no topo de cada colina como recompensa!'
            }
          ]
        }
      ]
    },
    slug: {
      current: 'les-7-collines-de-lisbonne'
    },
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-7hills-lisbon'
      }
    },
    date: '2024-01-15',
    readTime: '8',
    author: 'Maria Silva',
    category: {
      _type: 'reference',
      _ref: 'category-activities'
    }
  },
  {
    id: 'fado-lisbonne-guide',
    title: {
      en: 'Fado in Lisbon: The Soul of Portuguese Music',
      fr: 'Le Fado à Lisbonne : L\'Âme de la Musique Portugaise',
      pt: 'Fado em Lisboa: A Alma da Música Portuguesa'
    },
    excerpt: {
      en: 'Immerse yourself in the melancholic beauty of Fado, Portugal\'s most iconic musical tradition, and discover the best places to experience it in Lisbon.',
      fr: 'Plongez dans la beauté mélancolique du Fado, la tradition musicale la plus emblématique du Portugal, et découvrez les meilleurs endroits pour l\'expérimenter à Lisbonne.',
      pt: 'Mergulhe na beleza melancólica do Fado, a tradição musical mais icônica de Portugal, e descubra os melhores lugares para experimentá-lo em Lisboa.'
    },
    content: {
      en: [
        {
          _type: 'block',
          _key: 'intro-fado',
          children: [
            {
              _type: 'span',
              _key: 'intro-fado-span',
              text: 'Fado, meaning "fate" or "destiny" in Portuguese, is more than just music—it\'s the emotional expression of the Portuguese soul. This UNESCO World Heritage art form tells stories of love, loss, longing, and the sea that has shaped Portugal\'s history.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-title-span',
              text: 'The History of Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content',
          children: [
            {
              _type: 'span',
              _key: 'history-content-span',
              text: 'Fado emerged in the early 19th century in the working-class neighborhoods of Lisbon, particularly in Alfama and Mouraria. It was born from the experiences of sailors, fishermen, and the urban poor, expressing their struggles, dreams, and saudade—a uniquely Portuguese feeling of melancholic longing.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'types-title-span',
              text: 'Types of Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-content',
          children: [
            {
              _type: 'span',
              _key: 'types-content-span',
              text: '• Fado de Lisboa - The most traditional form, characterized by its melancholic tone and themes of love and loss\n• Fado de Coimbra - Academic fado sung by university students, more refined and intellectual\n• Fado Vadio - "Vagabond fado" sung spontaneously in taverns and bars'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'venues-title-span',
              text: 'Best Fado Venues in Lisbon'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-content',
          children: [
            {
              _type: 'span',
              _key: 'venues-content-span',
              text: '1. Casa de Linhares - Authentic fado house in Alfama with intimate atmosphere\n2. Clube de Fado - Historic venue with excellent acoustics\n3. A Tasca do Chico - Popular spot for spontaneous fado performances\n4. O Faia - Traditional fado house with professional performers\n5. Tasca do Jaime - Local favorite with authentic atmosphere'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-title-span',
              text: 'Fado Etiquette'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-content',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-content-span',
              text: '• Arrive on time and stay for the entire performance\n• Keep conversations to a minimum during songs\n• Applaud after each song, not during\n• Order food and drinks to support the venue\n• Respect the intimate atmosphere and emotional nature of the music'
            }
          ]
        }
      ],
      fr: [
        {
          _type: 'block',
          _key: 'intro-fado-fr',
          children: [
            {
              _type: 'span',
              _key: 'intro-fado-fr-span',
              text: 'Le Fado, signifiant "destin" en portugais, est plus qu\'une simple musique—c\'est l\'expression émotionnelle de l\'âme portugaise. Cette forme d\'art du patrimoine mondial de l\'UNESCO raconte des histoires d\'amour, de perte, de nostalgie et de la mer qui a façonné l\'histoire du Portugal.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-title-fr-span',
              text: 'L\'Histoire du Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'history-content-fr-span',
              text: 'Le Fado a émergé au début du 19e siècle dans les quartiers ouvriers de Lisbonne, particulièrement dans l\'Alfama et Mouraria. Il est né des expériences des marins, pêcheurs et des pauvres urbains, exprimant leurs luttes, rêves et saudade—un sentiment portugais unique de nostalgie mélancolique.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'types-title-fr-span',
              text: 'Types de Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'types-content-fr-span',
              text: '• Fado de Lisboa - La forme la plus traditionnelle, caractérisée par son ton mélancolique et ses thèmes d\'amour et de perte\n• Fado de Coimbra - Fado académique chanté par les étudiants universitaires, plus raffiné et intellectuel\n• Fado Vadio - "Fado vagabond" chanté spontanément dans les tavernes et bars'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'venues-title-fr-span',
              text: 'Meilleurs Lieux de Fado à Lisbonne'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'venues-content-fr-span',
              text: '1. Casa de Linhares - Maison de fado authentique dans l\'Alfama avec une atmosphère intime\n2. Clube de Fado - Lieu historique avec une excellente acoustique\n3. A Tasca do Chico - Endroit populaire pour les performances spontanées de fado\n4. O Faia - Maison de fado traditionnelle avec des interprètes professionnels\n5. Tasca do Jaime - Favori local avec une atmosphère authentique'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-title-fr-span',
              text: 'Étiquette du Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-content-fr-span',
              text: '• Arrivez à l\'heure et restez pour toute la performance\n• Gardez les conversations au minimum pendant les chansons\n• Applaudissez après chaque chanson, pas pendant\n• Commandez de la nourriture et des boissons pour soutenir le lieu\n• Respectez l\'atmosphère intime et la nature émotionnelle de la musique'
            }
          ]
        }
      ],
      pt: [
        {
          _type: 'block',
          _key: 'intro-fado-pt',
          children: [
            {
              _type: 'span',
              _key: 'intro-fado-pt-span',
              text: 'O Fado, significando "destino" em português, é mais do que apenas música—é a expressão emocional da alma portuguesa. Esta forma de arte do patrimônio mundial da UNESCO conta histórias de amor, perda, saudade e do mar que moldou a história de Portugal.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-title-pt-span',
              text: 'A História do Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'history-content-pt-span',
              text: 'O Fado emergiu no início do século XIX nos bairros operários de Lisboa, particularmente na Alfama e Mouraria. Nasceu das experiências de marinheiros, pescadores e dos pobres urbanos, expressando suas lutas, sonhos e saudade—um sentimento português único de nostalgia melancólica.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'types-title-pt-span',
              text: 'Tipos de Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'types-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'types-content-pt-span',
              text: '• Fado de Lisboa - A forma mais tradicional, caracterizada por seu tom melancólico e temas de amor e perda\n• Fado de Coimbra - Fado acadêmico cantado por estudantes universitários, mais refinado e intelectual\n• Fado Vadio - "Fado vagabundo" cantado espontaneamente em tavernas e bares'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'venues-title-pt-span',
              text: 'Melhores Locais de Fado em Lisboa'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'venues-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'venues-content-pt-span',
              text: '1. Casa de Linhares - Casa de fado autêntica na Alfama com atmosfera íntima\n2. Clube de Fado - Local histórico com excelente acústica\n3. A Tasca do Chico - Local popular para performances espontâneas de fado\n4. O Faia - Casa de fado tradicional com intérpretes profissionais\n5. Tasca do Jaime - Favorito local com atmosfera autêntica'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-title-pt-span',
              text: 'Etiqueta do Fado'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'etiquette-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'etiquette-content-pt-span',
              text: '• Chegue na hora e fique para toda a performance\n• Mantenha conversas ao mínimo durante as canções\n• Aplauda após cada canção, não durante\n• Peça comida e bebidas para apoiar o local\n• Respeite a atmosfera íntima e a natureza emocional da música'
            }
          ]
        }
      ]
    },
    slug: {
      current: 'fado-lisbonne-guide'
    },
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-fado-lisbon'
      }
    },
    date: '2024-01-20',
    readTime: '6',
    author: 'Carlos Mendes',
    category: {
      _type: 'reference',
      _ref: 'category-culture'
    }
  },
  {
    id: 'pastel-nata-lisbonne',
    title: {
      en: 'Pastéis de Nata: The Sweet Soul of Lisbon',
      fr: 'Pastéis de Nata : L\'Âme Sucrée de Lisbonne',
      pt: 'Pastéis de Nata: A Alma Doce de Lisboa'
    },
    excerpt: {
      en: 'Discover the history, secrets, and best places to taste the iconic Portuguese custard tarts that have become a symbol of Lisbon\'s culinary heritage.',
      fr: 'Découvrez l\'histoire, les secrets et les meilleurs endroits pour déguster les tartes à la crème portugaises emblématiques qui sont devenues un symbole du patrimoine culinaire de Lisbonne.',
      pt: 'Descubra a história, segredos e melhores lugares para provar as emblemáticas tartes de nata portuguesas que se tornaram um símbolo do patrimônio culinário de Lisboa.'
    },
    content: {
      en: [
        {
          _type: 'block',
          _key: 'intro-pastel',
          children: [
            {
              _type: 'span',
              _key: 'intro-pastel-span',
              text: 'Pastéis de Nata, the iconic Portuguese custard tarts, are more than just a dessert—they\'re a cultural phenomenon that represents the sweet soul of Lisbon. These golden, flaky pastries filled with creamy custard have conquered hearts worldwide.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-pastel',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-pastel-span',
              text: 'The Legendary History'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content-pastel',
          children: [
            {
              _type: 'span',
              _key: 'history-content-pastel-span',
              text: 'The story begins in the 19th century at the Jerónimos Monastery in Belém. Monks used egg whites to starch their clothes, leaving them with an abundance of egg yolks. To avoid waste, they created these delicious custard tarts. When the monastery closed in 1834, the recipe was sold to a nearby sugar refinery, which became the famous Pastéis de Belém.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'secret-title-span',
              text: 'The Secret Recipe'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-content',
          children: [
            {
              _type: 'span',
              _key: 'secret-content-span',
              text: 'The original recipe remains a closely guarded secret, known only to a few master pastry chefs. However, we know that the perfect pastel de nata requires:\n\n• Crispy, flaky puff pastry\n• Rich custard made with egg yolks, sugar, and cream\n• A touch of cinnamon and lemon zest\n• High-temperature baking to achieve the characteristic caramelized top'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'best-places-title-span',
              text: 'Where to Find the Best Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-content',
          children: [
            {
              _type: 'span',
              _key: 'best-places-content-span',
              text: '1. Pastéis de Belém - The original and most famous, with the secret recipe\n2. Manteigaria - Modern take with excellent quality and multiple locations\n3. Fábrica da Nata - Traditional recipe with a contemporary twist\n4. Aloma - Local favorite with consistently good pastéis\n5. Pastelaria Versailles - Historic café with classic pastéis de nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-title',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-title-span',
              text: 'How to Enjoy Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-content',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-content-span',
              text: '• Eat them warm, preferably fresh from the oven\n• Sprinkle with cinnamon and powdered sugar\n• Pair with a strong Portuguese coffee (bica)\n• Don\'t be afraid to get messy—it\'s part of the experience!\n• Try different places to find your personal favorite'
            }
          ]
        }
      ],
      fr: [
        {
          _type: 'block',
          _key: 'intro-pastel-fr',
          children: [
            {
              _type: 'span',
              _key: 'intro-pastel-fr-span',
              text: 'Les Pastéis de Nata, les tartes à la crème portugaises emblématiques, sont plus qu\'un simple dessert—c\'est un phénomène culturel qui représente l\'âme sucrée de Lisbonne. Ces pâtisseries dorées et feuilletées remplies de crème pâtissière ont conquis les cœurs dans le monde entier.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-pastel-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-pastel-fr-span',
              text: 'L\'Histoire Légendaire'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content-pastel-fr',
          children: [
            {
              _type: 'span',
              _key: 'history-content-pastel-fr-span',
              text: 'L\'histoire commence au 19e siècle au monastère de Jerónimos à Belém. Les moines utilisaient les blancs d\'œufs pour amidonner leurs vêtements, leur laissant une abondance de jaunes d\'œufs. Pour éviter le gaspillage, ils ont créé ces délicieuses tartes à la crème. Quand le monastère a fermé en 1834, la recette a été vendue à une raffinerie de sucre voisine, qui est devenue la célèbre Pastéis de Belém.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'secret-title-fr-span',
              text: 'La Recette Secrète'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'secret-content-fr-span',
              text: 'La recette originale reste un secret bien gardé, connu seulement de quelques maîtres pâtissiers. Cependant, nous savons que le parfait pastel de nata nécessite :\n\n• Une pâte feuilletée croustillante et feuilletée\n• Une crème pâtissière riche faite avec des jaunes d\'œufs, du sucre et de la crème\n• Une touche de cannelle et de zeste de citron\n• Une cuisson à haute température pour obtenir le dessus caramélisé caractéristique'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'best-places-title-fr-span',
              text: 'Où Trouver les Meilleurs Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'best-places-content-fr-span',
              text: '1. Pastéis de Belém - L\'original et le plus célèbre, avec la recette secrète\n2. Manteigaria - Version moderne avec une excellente qualité et plusieurs emplacements\n3. Fábrica da Nata - Recette traditionnelle avec une touche contemporaine\n4. Aloma - Favori local avec des pastéis constamment bons\n5. Pastelaria Versailles - Café historique avec des pastéis de nata classiques'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-title-fr',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-title-fr-span',
              text: 'Comment Savourer les Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-content-fr',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-content-fr-span',
              text: '• Mangez-les chauds, de préférence frais du four\n• Saupoudrez de cannelle et de sucre en poudre\n• Accompagnez d\'un café portugais fort (bica)\n• N\'ayez pas peur de vous salir—c\'est partie de l\'expérience !\n• Essayez différents endroits pour trouver votre favori personnel'
            }
          ]
        }
      ],
      pt: [
        {
          _type: 'block',
          _key: 'intro-pastel-pt',
          children: [
            {
              _type: 'span',
              _key: 'intro-pastel-pt-span',
              text: 'Os Pastéis de Nata, as emblemáticas tartes de nata portuguesas, são mais do que apenas uma sobremesa—são um fenômeno cultural que representa a alma doce de Lisboa. Essas pastelarias douradas e folhadas recheadas com creme conquistaram corações em todo o mundo.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-pastel-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'history-pastel-pt-span',
              text: 'A História Lendária'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'history-content-pastel-pt',
          children: [
            {
              _type: 'span',
              _key: 'history-content-pastel-pt-span',
              text: 'A história começa no século XIX no Mosteiro dos Jerónimos em Belém. Os monges usavam claras de ovo para engomar suas roupas, deixando-os com uma abundância de gemas de ovo. Para evitar desperdício, eles criaram essas deliciosas tartes de nata. Quando o mosteiro fechou em 1834, a receita foi vendida para uma refinaria de açúcar próxima, que se tornou a famosa Pastéis de Belém.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'secret-title-pt-span',
              text: 'A Receita Secreta'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'secret-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'secret-content-pt-span',
              text: 'A receita original permanece um segredo bem guardado, conhecido apenas por alguns mestres pasteleiros. No entanto, sabemos que o pastel de nata perfeito requer:\n\n• Massa folhada crocante e folhada\n• Creme rico feito com gemas de ovo, açúcar e creme\n• Um toque de canela e raspas de limão\n• Cozimento em alta temperatura para obter o topo caramelizado característico'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'best-places-title-pt-span',
              text: 'Onde Encontrar os Melhores Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'best-places-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'best-places-content-pt-span',
              text: '1. Pastéis de Belém - O original e mais famoso, com a receita secreta\n2. Manteigaria - Versão moderna com excelente qualidade e múltiplas localizações\n3. Fábrica da Nata - Receita tradicional com um toque contemporâneo\n4. Aloma - Favorito local com pastéis consistentemente bons\n5. Pastelaria Versailles - Café histórico com pastéis de nata clássicos'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-title-pt',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-title-pt-span',
              text: 'Como Apreciar os Pastéis de Nata'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'tasting-tips-content-pt',
          children: [
            {
              _type: 'span',
              _key: 'tasting-tips-content-pt-span',
              text: '• Coma-os quentes, de preferência frescos do forno\n• Polvilhe com canela e açúcar em pó\n• Acompanhe com um café português forte (bica)\n• Não tenha medo de se sujar—é parte da experiência!\n• Experimente lugares diferentes para encontrar seu favorito pessoal'
            }
          ]
        }
      ]
    },
    slug: {
      current: 'pastel-nata-lisbonne'
    },
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-pastel-nata'
      }
    },
    date: '2024-01-25',
    readTime: '5',
    author: 'Ana Rodrigues',
    category: {
      _type: 'reference',
      _ref: 'category-food'
    }
  }
]

// Fonction pour ajouter les articles
async function addBlogPosts() {
  try {
    console.log('Adding blog posts to Sanity...')
    
    for (const post of blogPosts) {
      const result = await client.create({
        _type: 'blogPosts',
        ...post
      })
      console.log(`Created blog post: ${post.title.en} (ID: ${result._id})`)
    }
    
    console.log('All blog posts added successfully!')
  } catch (error) {
    console.error('Error adding blog posts:', error)
  }
}

// Exécuter le script
addBlogPosts()
