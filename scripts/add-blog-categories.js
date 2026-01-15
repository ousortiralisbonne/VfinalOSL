// Script pour ajouter des catégories de blog dans Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Vous devrez ajouter votre token
})

// Catégories de blog à ajouter
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
  },
  {
    id: 'nightlife',
    name: {
      en: 'Nightlife',
      fr: 'Vie Nocturne',
      pt: 'Vida Noturna'
    }
  },
  {
    id: 'travel',
    name: {
      en: 'Travel Tips',
      fr: 'Conseils de Voyage',
      pt: 'Dicas de Viagem'
    }
  }
]

async function addBlogCategories() {
  try {
    console.log('Adding blog categories to Sanity...')
    
    for (const category of blogCategories) {
      // Vérifier si la catégorie existe déjà
      const existingCategory = await client.fetch(
        `*[_type == "blogCategories" && id == "${category.id}"][0]`
      )
      
      if (existingCategory) {
        console.log(`Category ${category.id} already exists, skipping...`)
        continue
      }
      
      const result = await client.create({
        _type: 'blogCategories',
        ...category
      })
      
      console.log(`Created category: ${category.name.en} (ID: ${result._id})`)
    }
    
    console.log('All blog categories added successfully!')
    
  } catch (error) {
    console.error('Error adding blog categories:', error)
  }
}

addBlogCategories()
