import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import SkipToContent from "./components/SkipToContent";
import ErrorBoundary from "./components/ErrorBoundary";
import { pixelEvents } from "./utils/analytics";

// Import direct des composants de la page d'accueil pour éviter les problèmes de lazy loading
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import VideoSection from "./components/VideoSection";
import PopularExperiences from "./components/PopularExperiences";
import Testimonials from "./components/Testimonials";
import CommunitySection from "./components/CommunitySection";
import IntegrationSection from "./components/IntegrationSection";
import Studio from "./components/Studio";

// Lazy loading des pages uniquement
const Events = React.lazy(() => import("./pages/Events"));
const Restaurants = React.lazy(() => import("./pages/Restaurants"));
const Bars = React.lazy(() => import("./pages/Bars"));
const Clubs = React.lazy(() => import("./pages/Clubs"));
const Hotels = React.lazy(() => import("./pages/Hotels"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const Activities = React.lazy(
  () => import("./pages/BlogCategories/Activities")
);
const Nightlife = React.lazy(() => import("./pages/BlogCategories/Nightlife"));
const Food = React.lazy(() => import("./pages/BlogCategories/Food"));
const CustomTours = React.lazy(() => import("./pages/CustomTours"));
const GuidedTours = React.lazy(() => import("./pages/GuidedTours"));
const BoatTrips = React.lazy(() => import("./pages/BoatTrips"));
const MoreActivities = React.lazy(() => import("./pages/MoreActivities"));
const MoreExplore = React.lazy(() => import("./pages/MoreExplore"));
const Transfers = React.lazy(() => import("./pages/Transfers"));
const Sports = React.lazy(() => import("./pages/Sports"));
const About = React.lazy(() => import("./pages/About"));
const LegalNotice = React.lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const Terms = React.lazy(() => import("./pages/Terms"));

function App() {
  useEffect(() => {
    // Track la vue de page
    pixelEvents.viewContent("page", window.location.pathname);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen">
          <SkipToContent />
          <Navbar />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
            <Route
              path="/"
              element={
                <main id="main-content">
                  <Hero />
                  <FeaturedCategories />
                  <VideoSection />
                  <PopularExperiences />
                  <Testimonials />
                  <CommunitySection />
                  <IntegrationSection />
                </main>
              }
            />
            <Route path="/studio" element={<Studio />} />
            <Route path="/events" element={<Events />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/bars" element={<Bars />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/activites" element={<Activities />} />
            <Route path="/blog/vie-nocturne" element={<Nightlife />} />
            <Route path="/blog/gastronomie" element={<Food />} />
            <Route path="/sur-mesure" element={<CustomTours />} />
            <Route path="/visites-guidees" element={<GuidedTours />} />
            <Route path="/bateaux-lisbonne" element={<BoatTrips />} />
            <Route path="/more-activities" element={<MoreActivities />} />
            <Route path="/explore-more" element={<MoreExplore />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/activities/sports" element={<Sports />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route
              path="/politique-confidentialite"
              element={<PrivacyPolicy />}
            />
            <Route path="/cgv" element={<Terms />} />
            </Routes>
          </Suspense>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
