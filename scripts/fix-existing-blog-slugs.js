// Script pour ajouter des slugs aux articles de blog existants
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  // Pas de token pour l'instant, on va juste générer les slugs
})

// Fonction pour générer un slug à partir d'un titre
function generateSlug(title) {
  if (!title) return 'untitled'
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function fixBlogSlugs() {
  try {
    console.log('🔧 Fixing blog post slugs...')
    
    // Récupérer tous les articles sans slug
    const query = `*[_type == "blogPosts" && !defined(slug)] {
      _id,
      id,
      title
    }`
    
    const posts = await client.fetch(query)
    
    console.log(`Found ${posts.length} posts without slugs`)
    
    for (const post of posts) {
      // Générer un slug à partir du titre français ou anglais
      const titleForSlug = post.title?.fr || post.title?.en || post.id
      const newSlug = generateSlug(titleForSlug)
      
      console.log(`\n📝 Post: ${post.id}`)
      console.log(`   Title: ${titleForSlug}`)
      console.log(`   Generated slug: ${newSlug}`)
      
      // Note: Pour mettre à jour, vous aurez besoin d'un token Sanity
      console.log(`   ⚠️  To update, run with SANITY_TOKEN in .env file`)
      console.log(`   Command: client.patch('${post._id}').set({slug: {_type: 'slug', current: '${newSlug}'}}).commit()`)
    }
    
    console.log('\n✅ Slug generation completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Add SANITY_TOKEN to your .env file')
    console.log('2. Run this script again to actually update the posts')
    console.log('3. Or manually update each post in Sanity Studio')
    
  } catch (error) {
    console.error('❌ Error fixing slugs:', error)
  }
}

fixBlogSlugs()
