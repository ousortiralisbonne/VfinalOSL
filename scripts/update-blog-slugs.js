// Script pour ajouter des slugs aux articles de blog existants
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Vous devrez ajouter votre token
})

// Fonction pour générer un slug à partir d'un titre
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function updateBlogSlugs() {
  try {
    console.log('Fetching existing blog posts...')
    
    const query = `*[_type == "blogPosts"] {
      _id,
      id,
      title,
      slug
    }`
    
    const posts = await client.fetch(query)
    
    console.log(`Found ${posts.length} blog posts to update`)
    
    for (const post of posts) {
      // Générer un slug à partir du titre français ou anglais
      const titleForSlug = post.title?.fr || post.title?.en || post.id
      const newSlug = generateSlug(titleForSlug)
      
      console.log(`Updating post ${post.id}:`)
      console.log(`  Title: ${titleForSlug}`)
      console.log(`  New slug: ${newSlug}`)
      
      // Mettre à jour le post avec le nouveau slug
      await client
        .patch(post._id)
        .set({
          slug: {
            _type: 'slug',
            current: newSlug
          }
        })
        .commit()
      
      console.log(`  ✅ Updated successfully`)
      console.log('---')
    }
    
    console.log('All blog posts updated with slugs!')
    
  } catch (error) {
    console.error('Error updating blog posts:', error)
  }
}

updateBlogSlugs()
