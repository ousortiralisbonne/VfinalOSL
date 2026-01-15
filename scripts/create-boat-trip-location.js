import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Vous devrez définir cette variable d'environnement
})

const newYearLocation = {
  _type: 'boatTriplocation',
  id: 'nouvel-an',
  name: {
    en: 'New Year',
    fr: 'Nouvel An',
    pt: 'Ano Novo'
  }
}

async function createNewYearLocation() {
  try {
    const result = await client.create(newYearLocation)
    console.log('Document "Nouvel An" créé avec succès:', result)
  } catch (error) {
    console.error('Erreur lors de la création du document:', error)
  }
}

createNewYearLocation()
