// Script pour vérifier le contenu existant sans token
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // Mode lecture seule
})

async function checkExistingContent() {
  try {
    console.log('🔍 Checking existing blog content...')
    
    // Vérifier les catégories
    console.log('\n📁 Blog Categories:')
    const categories = await client.fetch(`*[_type == "blogCategories"] {
      _id,
      id,
      name
    }`)
    
    if (categories.length === 0) {
      console.log('  ❌ No categories found')
    } else {
      categories.forEach(cat => {
        console.log(`  ✅ ${cat.id}: ${cat.name?.en || 'N/A'}`)
      })
    }
    
    // Vérifier les articles
    console.log('\n📝 Blog Posts:')
    const posts = await client.fetch(`*[_type == "blogPosts"] {
      _id,
      id,
      title,
      slug,
      author,
      date
    }`)
    
    if (posts.length === 0) {
      console.log('  ❌ No blog posts found')
    } else {
      posts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.id}`)
        console.log(`     Title: ${post.title?.en || post.title?.fr || 'N/A'}`)
        console.log(`     Slug: ${post.slug?.current || 'MISSING'}`)
        console.log(`     Author: ${post.author || 'N/A'}`)
        console.log(`     Date: ${post.date || 'N/A'}`)
        console.log('     ---')
      })
    }
    
    console.log(`\n📊 Summary:`)
    console.log(`  Categories: ${categories.length}`)
    console.log(`  Blog Posts: ${posts.length}`)
    
    if (posts.length > 0 && posts.some(p => !p.slug?.current)) {
      console.log(`\n⚠️  Some posts are missing slugs. Run update-blog-slugs.js to fix this.`)
    }
    
  } catch (error) {
    console.error('❌ Error checking content:', error)
  }
}

checkExistingContent()
