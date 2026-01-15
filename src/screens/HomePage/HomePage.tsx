import React from 'react';
import Hero from '../../components/Hero';
import FeaturedCategories from '../../components/FeaturedCategories';
import VideoSection from '../../components/VideoSection';
import PopularExperiences from '../../components/PopularExperiences';
import Testimonials from '../../components/Testimonials';
import CommunitySection from '../../components/CommunitySection';
import IntegrationSection from '../../components/IntegrationSection';
import SEO from '../../components/SEO';
import AnimatedSection from '../../components/AnimatedSection';

const HomePage = () => {
  return (
    <>
      <SEO
        title="Où sortir à Lisbonne | Guide des meilleures expériences"
        description="Découvrez les meilleurs restaurants, bars, clubs, événements et activités à Lisbonne. Guide local authentique avec visites guidées, croisières et expériences uniques."
        keywords="Lisbonne, restaurants Lisbonne, bars Lisbonne, clubs Lisbonne, événements Lisbonne, activités Lisbonne, guide local, tourisme Portugal, visites guidées, croisières Lisbonne, sorties Lisbonne"
      />
      <Hero />
      <AnimatedSection animation="fade-up">
        <FeaturedCategories />
      </AnimatedSection>
      <AnimatedSection animation="fade-up" delay={100}>
        <VideoSection />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <PopularExperiences />
      </AnimatedSection>
      <AnimatedSection animation="fade-left" delay={100}>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <CommunitySection />
      </AnimatedSection>
      <AnimatedSection animation="fade-right" delay={100}>
        <IntegrationSection />
      </AnimatedSection>
    </>
  );
};

export default HomePage;
