import React from 'react';
import { BlogPost } from '../../types';
import BlogGrid from '../../components/BlogGrid';

const Nightlife = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Les meilleurs clubs de Lisbonne",
      excerpt: "Guide complet des clubs et discothèques de Lisbonne : Lux Frágil, Urban Beach, B.Leza et plus encore. Ambiances, musiques et infos pratiques.",
      image: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "15 Mars 2024",
      readTime: "8 min",
      author: "Pedro Martins",
      category: "Vie Nocturne"
    },
    {
      id: 2,
      title: "Top 10 des bars à cocktails de Lisbonne",
      excerpt: "Découvrez notre sélection des meilleurs bars à cocktails : Red Frog, Double9, Foxtrot et d'autres pépites cachées de la ville.",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "12 Mars 2024",
      readTime: "10 min",
      author: "Ana Ferreira",
      category: "Vie Nocturne"
    },
    {
      id: 3,
      title: "Guide des bars avec vue sur Lisbonne",
      excerpt: "Les meilleurs rooftops et bars panoramiques pour admirer Lisbonne : Park, Sky Bar, Topo et d'autres spots avec vue imprenable.",
      image: "https://images.unsplash.com/photo-1515578706925-0dc1a7bfc8cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "10 Mars 2024",
      readTime: "7 min",
      author: "Miguel Costa",
      category: "Vie Nocturne"
    }
  ];

  return (
    <BlogGrid 
      title="Blog Vie Nocturne"
      subtitle="Clubs, Bars et Événements à Lisbonne"
      posts={posts}
    />
  );
};

export default Nightlife;