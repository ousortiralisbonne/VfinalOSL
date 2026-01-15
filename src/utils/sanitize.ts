/**
 * HTML Sanitization utilities
 * Provides safe rendering of HTML content from external sources (Sanity CMS)
 */

// Allowed HTML tags for rich text content
const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "sub",
  "sup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "span",
  "div",
  "img",
]);

// Allowed attributes per tag
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height", "loading"]),
  "*": new Set(["class", "id"]),
};

// URL schemes that are allowed in href/src attributes
const ALLOWED_PROTOCOLS = new Set([
  "http:",
  "https:",
  "mailto:",
  "tel:",
]);

/**
 * Check if a URL is safe
 */
const isSafeUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.origin);
    return ALLOWED_PROTOCOLS.has(parsed.protocol);
  } catch {
    // Relative URLs are allowed
    return !url.startsWith("javascript:") && !url.startsWith("data:");
  }
};

/**
 * Sanitize an HTML attribute value
 */
const sanitizeAttribute = (
  tagName: string,
  attrName: string,
  attrValue: string
): string | null => {
  const normalizedTag = tagName.toLowerCase();
  const normalizedAttr = attrName.toLowerCase();

  // Check if attribute is allowed for this tag or globally
  const tagAllowed = ALLOWED_ATTRS[normalizedTag]?.has(normalizedAttr);
  const globalAllowed = ALLOWED_ATTRS["*"]?.has(normalizedAttr);

  if (!tagAllowed && !globalAllowed) {
    return null;
  }

  // Special handling for URLs
  if (normalizedAttr === "href" || normalizedAttr === "src") {
    if (!isSafeUrl(attrValue)) {
      return null;
    }
  }

  // Add security attributes for external links
  if (normalizedTag === "a" && normalizedAttr === "href") {
    return attrValue;
  }

  return attrValue;
};

/**
 * Sanitize HTML string to prevent XSS attacks
 * Uses the browser's DOMParser for safe parsing
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== "string") {
    return "";
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  const sanitizeNode = (node: Node): Node | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode(true);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as Element;
    const tagName = element.tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tagName)) {
      // If tag is not allowed, return just the text content
      const textNode = document.createTextNode(element.textContent || "");
      return textNode;
    }

    const newElement = document.createElement(tagName);

    // Copy allowed attributes
    for (const attr of Array.from(element.attributes)) {
      const sanitizedValue = sanitizeAttribute(tagName, attr.name, attr.value);
      if (sanitizedValue !== null) {
        newElement.setAttribute(attr.name, sanitizedValue);
      }
    }

    // Add security attributes for links
    if (tagName === "a" && newElement.hasAttribute("href")) {
      const href = newElement.getAttribute("href") || "";
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) {
          newElement.setAttribute("rel", "noopener noreferrer");
          if (!newElement.hasAttribute("target")) {
            newElement.setAttribute("target", "_blank");
          }
        }
      } catch {
        // Keep relative URLs as-is
      }
    }

    // Recursively sanitize children
    for (const child of Array.from(element.childNodes)) {
      const sanitizedChild = sanitizeNode(child);
      if (sanitizedChild) {
        newElement.appendChild(sanitizedChild);
      }
    }

    return newElement;
  };

  const fragment = document.createDocumentFragment();
  for (const child of Array.from(body.childNodes)) {
    const sanitizedChild = sanitizeNode(child);
    if (sanitizedChild) {
      fragment.appendChild(sanitizedChild);
    }
  }

  const container = document.createElement("div");
  container.appendChild(fragment);
  return container.innerHTML;
};

/**
 * Escape HTML entities for safe text display
 */
export const escapeHTML = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Strip all HTML tags, keeping only text content
 */
export const stripHTML = (html: string): string => {
  if (!html || typeof html !== "string") {
    return "";
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
