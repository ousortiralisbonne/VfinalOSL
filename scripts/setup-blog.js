// Script principal pour configurer le blog complet
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Vous devrez ajouter votre token
})

// Fonction pour générer un slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Articles de blog complets
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
        _ref: 'image-lisbon-hills'
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
  }
]

// Catégories de blog
const blogCategories = [
  {
    id: 'activities',
    name: {
      en: 'Activities',
      fr: 'Activités',
      pt: 'Atividades'
    }
  },
  {
    id: 'culture',
    name: {
      en: 'Culture',
      fr: 'Culture',
      pt: 'Cultura'
    }
  },
  {
    id: 'food',
    name: {
      en: 'Food & Gastronomy',
      fr: 'Gastronomie',
      pt: 'Gastronomia'
    }
  }
]

async function setupBlog() {
  try {
    console.log('🚀 Setting up blog content...')
    
    // 1. Créer les catégories
    console.log('📁 Creating blog categories...')
    const categoryRefs = {}
    
    for (const category of blogCategories) {
      const existingCategory = await client.fetch(
        `*[_type == "blogCategories" && id == "${category.id}"][0]`
      )
      
      if (existingCategory) {
        console.log(`  ✅ Category ${category.id} already exists`)
        categoryRefs[category.id] = {
          _type: 'reference',
          _ref: existingCategory._id
        }
      } else {
        const result = await client.create({
          _type: 'blogCategories',
          ...category
        })
        console.log(`  ✅ Created category: ${category.name.en}`)
        categoryRefs[category.id] = {
          _type: 'reference',
          _ref: result._id
        }
      }
    }
    
    // 2. Créer les articles de blog
    console.log('📝 Creating blog posts...')
    
    for (const post of blogPosts) {
      // Vérifier si l'article existe déjà
      const existingPost = await client.fetch(
        `*[_type == "blogPosts" && id == "${post.id}"][0]`
      )
      
      if (existingPost) {
        console.log(`  ⚠️  Post ${post.id} already exists, updating...`)
        
        // Mettre à jour l'article existant avec le slug
        await client
          .patch(existingPost._id)
          .set({
            slug: post.slug,
            category: categoryRefs[post.category._ref.replace('category-', '')]
          })
          .commit()
        
        console.log(`  ✅ Updated post: ${post.title.en}`)
      } else {
        // Créer un nouvel article
        const postData = {
          ...post,
          category: categoryRefs[post.category._ref.replace('category-', '')]
        }
        
        const result = await client.create({
          _type: 'blogPosts',
          ...postData
        })
        
        console.log(`  ✅ Created post: ${post.title.en}`)
      }
    }
    
    console.log('🎉 Blog setup completed successfully!')
    console.log('📋 Next steps:')
    console.log('  1. Add images to your articles in Sanity Studio')
    console.log('  2. Visit your blog at /blog to see the articles')
    console.log('  3. Click on articles to view them in dedicated pages')
    
  } catch (error) {
    console.error('❌ Error setting up blog:', error)
  }
}

setupBlog()
