import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BlogPost } from "../types";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import PageBanner from "../components/PageBanner";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('blog', i18n.language);
  
  const { blogPosts, categories, isLoading, error } = useBlogPosts();

  const filteredPosts =
    selectedCategory?.toLocaleLowerCase() === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper isLoading={isLoading} error={error}>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <PageBanner
          pageId="blog"
          fallbackTitle={t("blog.hero.title")}
          fallbackSubtitle={t("blog.hero.subtitle")}
          fallbackImage="/src/images/newpics/sintra.jpg"
        />

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 py-3 sm:py-4">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2.5 min-h-[44px] rounded-full whitespace-nowrap transition-all text-sm sm:text-base touch-manipulation ${
                  selectedCategory === "all"
                    ? "bg-[#37b7ab] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {t("all")}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-full whitespace-nowrap transition-all text-sm sm:text-base touch-manipulation ${
                    selectedCategory === category.id
                      ? "bg-[#37b7ab] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/blog/${post.slug}`)}
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
                    {categories.find((cat) => cat.id === post.category)?.name}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-[#2a2765] mb-3 font-garage line-clamp-2 group-hover:text-[#37b7ab] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <button className="w-full bg-[#2f2d69] text-white px-6 py-3.5 min-h-[48px] rounded-full hover:bg-[#252157] active:bg-[#1a1840] transition font-garage tracking-wide text-sm sm:text-base flex items-center justify-center group mt-auto touch-manipulation">
                    <span>{t("blog.readArticle")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Blog;
