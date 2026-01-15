// SEO Content Section Component with FAQ
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQSchema } from './StructuredData';

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOContentProps {
  title: string;
  titleHighlight?: string;
  intro: string;
  introHighlight?: string;
  sections?: {
    title: string;
    content: string;
    titleHighlight?: string;
    contentHighlight?: string;
  }[];
  faqs?: FAQItem[];
  faqTitle?: string;
  faqAnswerHighlights?: string[];
  pageId: string;
}

const SEOContent = ({
  title,
  titleHighlight,
  intro,
  introHighlight,
  sections = [],
  faqs = [],
  faqTitle = "Questions Fréquentes",
  faqAnswerHighlights = [],
  pageId,
}: SEOContentProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Fonction pour rendre le texte avec un mot en surbrillance
  const renderHighlightedText = (text: string, highlight?: string) => {
    if (!highlight || !text.includes(highlight)) {
      return text;
    }
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  // Fonction pour rendre le texte avec plusieurs mots en surbrillance (prend le premier trouvé)
  const renderMultiHighlightedText = (text: string, highlights: string[]) => {
    if (!highlights || highlights.length === 0) {
      return text;
    }
    // Trouve le premier mot qui existe dans le texte
    const foundHighlight = highlights.find(h => text.includes(h));
    if (!foundHighlight) {
      return text;
    }
    return renderHighlightedText(text, foundHighlight);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* FAQ Schema for Google */}
      {faqs.length > 0 && <FAQSchema faqs={faqs} pageId={pageId} />}

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2a2765] font-garage mb-3">
              {renderHighlightedText(title, titleHighlight)}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {renderHighlightedText(intro, introHighlight)}
            </p>
          </div>

          {/* Two Column Layout: Text Left + FAQ Right */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Left Column - Thematic Sections */}
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#37b7ab] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#2a2765] mb-1.5 font-garage">
                        {renderHighlightedText(section.title, section.titleHighlight)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {renderHighlightedText(section.content, section.contentHighlight)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - FAQ Accordion */}
            {faqs.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* FAQ Header */}
                <div className="bg-[#2a2765] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#37b7ab]" />
                    <h3 className="text-lg font-semibold text-white font-garage">
                      {faqTitle}
                    </h3>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="divide-y divide-gray-100">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors gap-3"
                        aria-expanded={openFaq === index}
                      >
                        <span className="font-medium text-[#2a2765] text-sm flex-1">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-[#37b7ab] flex-shrink-0 transition-transform duration-200 ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <div className="px-5 pb-4">
                          <div className="border-l-2 border-[#37b7ab] pl-3">
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {renderMultiHighlightedText(faq.answer, faqAnswerHighlights)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SEOContent;
