import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { BlogPost } from '../types';
import BlogModal from './BlogModal';

interface BlogGridProps {
  title: string;
  subtitle: string;
  posts: BlogPost[];
}

const BlogGrid = ({ title, subtitle, posts }: BlogGridProps) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2f2d69] text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
            {title}
          </h1>
          <p className="text-xl text-white/80">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={`${post.title} - Blog Où Sortir à Lisbonne`}
                  loading="lazy"
                  width="400"
                  height="192"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#37b7ab]/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-[#2a2765] mb-3 font-garage line-clamp-2 group-hover:text-[#37b7ab] transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <span className="mx-2">·</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <span className="mx-2">·</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group">
                    <span>Lire l'article</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
};

export default BlogGrid;