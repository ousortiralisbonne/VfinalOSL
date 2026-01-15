import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useTranslation } from "react-i18next";
import { useBlogPost } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import SEO from "../components/SEO";
import { ArticleSchema } from "../components/StructuredData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { blogPost: post, isLoading, error } = useBlogPost(slug || '');
  
  
  // Early return if no slug
  if (!slug) {
    return (
      <Wrapper isLoading={false} error={t("blogPost.error.missingSlug")}>
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2a2765] mb-4">
              {t("blogPost.error.notFound")}
            </h1>
            <button
              onClick={() => navigate("/blog")}
              className="bg-[#37b7ab] text-white px-6 py-3 rounded-full hover:bg-[#2a2765] transition font-garage min-h-[48px]"
            >
              {t("blogPost.backToBlog")}
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  const myPortableTextComponents = {
    types: {
      htmlEmbed: ({ value }: any) => (
        <div className="my-8 p-4 bg-gray-50 rounded-lg border" dangerouslySetInnerHTML={{ __html: value.code }} />
      ),
      image: ({ value }: any) => (
        <div className="my-12">
          {value?.asset?._ref && (
            <div className="relative group">
              <img
                src={imgUrlBuilder(value).width(1000).height(600).url()}
                alt={value.alt || "Illustration article - Blog Où Sortir à Lisbonne"}
                loading="lazy"
                width="1000"
                height="600"
                className="w-full h-auto rounded-2xl shadow-lg mx-auto transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl"></div>
            </div>
          )}
        </div>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-[#2a2765] bg-[#37b7ab]/10 px-1 rounded">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-[#37b7ab]">{children}</em>
      ),
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#37b7ab] hover:text-[#2a2765] underline decoration-2 underline-offset-2 transition-colors font-medium"
        >
          {children}
        </a>
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold text-[#2a2765] mb-8 mt-12 font-garage border-b-2 border-[#37b7ab] pb-4">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-[#2a2765] mb-6 mt-10 font-garage">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-bold text-[#2a2765] mb-4 mt-8 font-garage">
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-bold text-[#2a2765] mb-3 mt-6 font-garage">
          {children}
        </h4>
      ),
      normal: ({ children }: any) => (
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[#37b7ab] pl-6 py-4 my-8 bg-[#37b7ab]/5 rounded-r-lg italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
    },
  };

  useEffect(() => {
    const updateLinks = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (
          href &&
          !href.startsWith(window.location.origin) &&
          !href.startsWith("/")
        ) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      });
    };

    updateLinks();
  }, [post]);

  if (isLoading) {
    return <Wrapper isLoading={true} error={null} />;
  }

  if (error || !post) {
    return (
      <Wrapper isLoading={false} error={error || t("blogPost.error.notFound")}>
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2a2765] mb-4">
              {t("blogPost.error.notFound")}
            </h1>
            <button
              onClick={() => navigate("/blog")}
              className="bg-[#37b7ab] text-white px-6 py-3 rounded-full hover:bg-[#2a2765] transition font-garage min-h-[48px]"
            >
              {t("blogPost.backToBlog")}
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <main id="main-content">
      <Wrapper isLoading={false} error={null}>
        <SEO
        title={`${post.title} | Blog Où Sortir à Lisbonne`}
        description={post.excerpt}
        keywords={`${post.categoryName}, Lisbonne, blog, ${post.title}`}
        image={post.image}
        type="article"
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.image}
        datePublished={post.date}
        author={post.author}
        slug={slug || ''}
        category={post.categoryName}
      />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navigation Bar */}
        <div className="sticky top-20 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/blog")}
                className="flex items-center text-[#37b7ab] hover:text-[#2a2765] transition-colors font-garage group min-h-[44px] px-3 -ml-3"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                {t("blogPost.backToBlog")}
              </button>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Hero Image */}
            <div className="relative h-[400px] lg:h-[500px]">
              <img
                src={post.image}
                alt={`${post.title} - Article Blog Où Sortir à Lisbonne`}
                loading="eager"
                fetchPriority="high"
                width="1200"
                height="500"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating Category Badge */}
              <div className="absolute top-6 left-6">
                <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-[#37b7ab] rounded-full text-sm font-semibold shadow-lg">
                  {post.categoryName}
                </div>
              </div>
            </div>

            {/* Article Meta */}
            <div className="p-8 lg:p-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center text-gray-600 text-xs bg-gray-50 px-3 py-1.5 rounded-full">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center text-gray-600 text-xs bg-gray-50 px-3 py-1.5 rounded-full">
                  <Clock className="h-3.5 w-3.5 mr-2" />
                  {post.readTime} {t("blogPost.minRead")}
                </div>
                <div className="flex items-center text-gray-600 text-xs bg-gray-50 px-3 py-1.5 rounded-full">
                  <User className="h-3.5 w-3.5 mr-2" />
                  {post.author}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-[#2a2765] mb-6 font-garage leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <div className="border-l-4 border-[#37b7ab] pl-6 mb-8">
                <p className="text-xl text-gray-600 leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none blog-content">
                <PortableText
                  value={post.content}
                  components={myPortableTextComponents}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
          <div className="bg-gradient-to-r from-[#37b7ab] to-[#2a2765] rounded-2xl p-8 lg:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4 font-garage">
                {t("blogPost.discoverMore")}
              </h3>
              <p className="text-white/90 mb-8 text-lg">
                {t("blogPost.discoverDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/blog")}
                  className="bg-white text-[#37b7ab] px-8 py-4 rounded-full hover:bg-gray-100 transition font-garage font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t("blogPost.viewAllArticles")}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-white/20 text-white px-8 py-4 rounded-full hover:bg-white/30 transition font-garage font-semibold border border-white/30"
                >
                  {t("blogPost.backToHome")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
    </main>
  );
};

export default BlogPost;
