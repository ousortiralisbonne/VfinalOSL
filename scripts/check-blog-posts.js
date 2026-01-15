// Script pour vérifier les articles de blog existants dans Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z8eiwrv2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

async function checkBlogPosts() {
  try {
    console.log('Checking existing blog posts...')
    
    const query = `*[_type == "blogPosts"] {
      _id,
      id,
      title,
      slug,
      author,
      date,
      category->{id, name}
    }`
    
    const posts = await client.fetch(query)
    
    console.log(`Found ${posts.length} blog posts:`)
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post.id}`)
      console.log(`   Title (EN): ${post.title?.en || 'N/A'}`)
      console.log(`   Title (FR): ${post.title?.fr || 'N/A'}`)
      console.log(`   Slug: ${post.slug?.current || 'MISSING'}`)
      console.log(`   Author: ${post.author || 'N/A'}`)
      console.log(`   Date: ${post.date || 'N/A'}`)
      console.log(`   Category: ${post.category?.name?.en || 'N/A'}`)
      console.log('---')
    })
    
  } catch (error) {
    console.error('Error checking blog posts:', error)
  }
}

checkBlogPosts()
