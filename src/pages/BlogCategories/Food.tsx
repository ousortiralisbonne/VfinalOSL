import React from 'react';
import { BlogPost } from '../../types';
import BlogGrid from '../../components/BlogGrid';

const Food = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Les meilleurs restaurants traditionnels de Lisbonne",
      excerpt: "Notre sélection des meilleures tables pour découvrir la cuisine portugaise authentique : tascas, restaurants historiques et adresses secrètes.",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "15 Mars 2024",
      readTime: "8 min",
      author: "Sofia Oliveira",
      category: "Gastronomie"
    },
    {
      id: 2,
      title: "Guide des meilleurs rooftops de Lisbonne",
      excerpt: "Les plus beaux rooftops pour dîner avec vue : restaurants panoramiques, bars tendance et terrasses secrètes.",
      image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "12 Mars 2024",
      readTime: "10 min",
      author: "João Martins",
      category: "Gastronomie"
    },
    {
      id: 3,
      title: "Les meilleures pâtisseries de Lisbonne",
      excerpt: "Où déguster les meilleurs pastéis de nata et autres douceurs portugaises : pâtisseries historiques et adresses confidentielles.",
      image: "https://images.unsplash.com/photo-1587889991604-a9a3c56c8e11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "10 Mars 2024",
      readTime: "6 min",
      author: "Maria Costa",
      category: "Gastronomie"
    }
  ];

  return (
    <BlogGrid 
      title="Blog Gastronomie"
      subtitle="Restaurants, Rooftops et Bonnes Adresses"
      posts={posts}
    />
  );
};

export default Food;