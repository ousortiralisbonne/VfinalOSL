import { Mail, Phone, Globe, MapPin, Building2, FileText, Link2, Scale, Gavel } from "lucide-react";
import { useTranslation } from "react-i18next";

const LegalNotice = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2f2d69] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage text-center">
            {t("legalNotice.hero.title")}
          </h1>
          <p className="text-xl text-center text-white/80">
            {t("legalNotice.hero.subtitle")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Édition du site */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.editor.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.editor.description")}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p className="font-semibold text-[#2a2765]">{t("legalNotice.content.editor.name")}</p>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#37b7ab] mt-0.5" />
                  <span>{t("legalNotice.content.editor.address")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#37b7ab]" />
                  <span>{t("legalNotice.content.editor.phone")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#37b7ab]" />
                  <span>{t("legalNotice.content.editor.email")}</span>
                </div>
                <p className="text-gray-600 italic mt-2">{t("legalNotice.content.editor.note")}</p>
              </div>
            </section>

            {/* Direction de la publication */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <Building2 className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.publicationResponsible.title")}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p className="font-semibold">
                  {t("legalNotice.content.publicationResponsible.director")}
                </p>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#37b7ab]" />
                  <span>
                    {t("legalNotice.content.publicationResponsible.contact")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#37b7ab]" />
                  <span>
                    {t("legalNotice.content.publicationResponsible.email")}
                  </span>
                </div>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <Globe className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.hosting.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.hosting.description")}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p className="font-semibold text-[#2a2765]">{t("legalNotice.content.hosting.name")}</p>
                <p className="text-gray-600">{t("legalNotice.content.hosting.type")}</p>
                <p className="text-gray-600">{t("legalNotice.content.hosting.siren")}</p>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#37b7ab] mt-0.5" />
                  <span>{t("legalNotice.content.hosting.address")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#37b7ab]" />
                  <span>{t("legalNotice.content.hosting.phone")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-[#37b7ab]" />
                  <a
                    href={t("legalNotice.content.hosting.website")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#37b7ab] hover:underline"
                  >
                    {t("legalNotice.content.hosting.website")}
                  </a>
                </div>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <Scale className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.intellectualProperty.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.intellectualProperty.intro")}
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                {(t("legalNotice.content.intellectualProperty.list", { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mb-4">
                {t("legalNotice.content.intellectualProperty.description1")}
              </p>
              <p className="mb-4">
                {t("legalNotice.content.intellectualProperty.description2")}
              </p>
              <p className="mb-4">
                {t("legalNotice.content.intellectualProperty.description3")}
              </p>
              <p className="text-gray-600 italic">
                {t("legalNotice.content.intellectualProperty.description4")}
              </p>
            </section>

            {/* Liens hypertextes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <Link2 className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.hypertextLinks.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.hypertextLinks.intro")}
              </p>
              <p className="mb-4">
                {t("legalNotice.content.hypertextLinks.disclaimer")}
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                {(t("legalNotice.content.hypertextLinks.list", { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-600 italic">
                {t("legalNotice.content.hypertextLinks.note")}
              </p>
            </section>

            {/* Responsabilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.liability.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.liability.description")}
              </p>
              <p className="text-gray-600 italic">
                {t("legalNotice.content.liability.note")}
              </p>
            </section>

            {/* Droit applicable */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center gap-2">
                <Gavel className="h-6 w-6 text-[#37b7ab]" />
                {t("legalNotice.content.applicableLaw.title")}
              </h2>
              <p className="mb-4">
                {t("legalNotice.content.applicableLaw.description")}
              </p>
              <p className="text-gray-600 italic">
                {t("legalNotice.content.applicableLaw.note")}
              </p>
            </section>

            {/* Contact */}
            <div className="bg-[#37b7ab]/10 p-6 rounded-lg text-center">
              <p className="text-[#2a2765] font-medium">
                {t("legalNotice.content.contact.title")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default LegalNotice;
