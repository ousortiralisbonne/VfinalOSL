import { useEffect } from "react";
import { X } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import { sanitizeHTML } from "../utils/sanitize";
import type { SanityImage } from "../types";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: unknown[];
  image: string;
  categoryName?: string;
}

interface BlogModalProps {
  post: BlogPostData | null;
  onClose: () => void;
}

interface HtmlEmbedValue {
  code: string;
}

interface ImageValue extends SanityImage {
  alt?: string;
}

const BlogModal = ({ post, onClose }: BlogModalProps) => {
  const myPortableTextComponents: PortableTextComponents = {
    types: {
      htmlEmbed: ({ value }: { value: HtmlEmbedValue }) => (
        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(value.code) }} />
      ),
      image: ({ value }: { value: ImageValue }) => (
        <div className="my-[2rem]">
          {value?.asset?._ref && (
            <img
              src={imgUrlBuilder(value).width(800).height(500).url()}
              alt={value.alt || "Illustration article - Blog Où Sortir à Lisbonne"}
              loading="lazy"
              width="800"
              height="500"
              className="max-w-full w-full md:w-2/3 h-auto rounded-lg shadow-md my-4"
            />
          )}
        </div>
      ),
    },
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold">{children}</strong>
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

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96">
          <img
            src={post.image}
            alt={`${post.title} - Blog Où Sortir à Lisbonne`}
            loading="lazy"
            width="800"
            height="384"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        <div className="p-8">
          <div className="inline-block px-3 py-1 bg-[#37b7ab]/10 text-[#37b7ab] rounded-full text-sm font-medium mb-4">
            {post?.categoryName}
          </div>

          <h2 className="text-3xl font-bold text-[#2a2765] mb-6 font-garage">
            {post.title}
          </h2>

          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </div>

          <div className="prose max-w-none text-gray-600 text-lg leading-relaxed mb-6 blog-content">
            <PortableText
              value={post.content}
              components={myPortableTextComponents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
