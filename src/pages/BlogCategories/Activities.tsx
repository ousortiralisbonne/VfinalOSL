import React from 'react';
import { BlogPost } from '../../types';
import BlogGrid from '../../components/BlogGrid';

const Activities = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Les meilleures activités nautiques à Lisbonne",
      excerpt: "Découvrez les activités nautiques incontournables à faire à Lisbonne : croisières sur le Tage, surf à Costa da Caparica, kayak et bien plus encore.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "15 Mars 2024",
      readTime: "8 min",
      author: "Marie Santos",
      category: "Activités"
    },
    {
      id: 2,
      title: "Guide des visites guidées à Lisbonne",
      excerpt: "Notre sélection des meilleures visites guidées pour découvrir Lisbonne : tours à pied, en tuk-tuk, à vélo et visites thématiques.",
      image: "https://images.unsplash.com/photo-1584890131708-03d4fd92c51a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "12 Mars 2024",
      readTime: "10 min",
      author: "João Silva",
      category: "Activités"
    },
    {
      id: 3,
      title: "Les plus belles randonnées autour de Lisbonne",
      excerpt: "Explorez les sentiers de randonnée près de Lisbonne : Sintra, Arrábida, Costa da Caparica. Des parcours pour tous les niveaux.",
      image: "https://images.unsplash.com/photo-1591991264348-c1d53a62bac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      date: "10 Mars 2024",
      readTime: "12 min",
      author: "Sofia Costa",
      category: "Activités"
    }
  ];

  return (
    <BlogGrid 
      title="Blog Activités"
      subtitle="Découvrez les meilleures activités à faire à Lisbonne"
      posts={posts}
    />
  );
};

export default Activities;