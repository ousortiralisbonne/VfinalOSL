// project/src/pages/PrivacyPolicy.tsx
import React from "react";
import { Mail, Shield, Lock, Key, Cookie, Database, Users, FileText, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2f2d69] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage text-center">
            {t("privacyPolicy.hero.title")}
          </h1>
          <p className="text-xl text-white/90 text-center mb-2">
            {t("privacyPolicy.hero.subtitle")}
          </p>
          <p className="text-white/80 text-center">
            {t("privacyPolicy.hero.lastUpdated")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Section 1: Responsable du traitement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Shield className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.dataController.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.dataController.description")}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p className="font-semibold text-[#2a2765]">
                  {t("privacyPolicy.content.dataController.name")}
                </p>
                <p className="text-gray-600 italic">
                  {t("privacyPolicy.content.dataController.note")}
                </p>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#37b7ab]" />
                  <span>{t("privacyPolicy.content.dataController.email")}</span>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                {t("privacyPolicy.content.dataController.responsibility")}
              </p>
            </section>

            {/* Section 2: Objet de la politique */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <FileText className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.purpose.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.purpose.description")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {(
                  t("privacyPolicy.content.purpose.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("privacyPolicy.content.purpose.acceptance")}</p>
              </div>
            </section>

            {/* Section 3: Définitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Key className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.definitions.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-1">
                    {t("privacyPolicy.content.definitions.personalData.title")} :
                  </h3>
                  <p>
                    {t("privacyPolicy.content.definitions.personalData.description")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-1">
                    {t("privacyPolicy.content.definitions.user.title")} :
                  </h3>
                  <p>
                    {t("privacyPolicy.content.definitions.user.description")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-1">
                    {t("privacyPolicy.content.definitions.service.title")} :
                  </h3>
                  <p>
                    {t("privacyPolicy.content.definitions.service.description")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-1">
                    {t("privacyPolicy.content.definitions.dataController.title")} :
                  </h3>
                  <p>
                    {t("privacyPolicy.content.definitions.dataController.description")}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Données collectées */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Database className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.dataCollection.title")}
              </h2>

              <h3 className="text-xl font-bold text-[#2a2765] mb-3">
                {t("privacyPolicy.content.dataCollection.voluntary.title")}
              </h3>
              <p className="mb-4">
                {t("privacyPolicy.content.dataCollection.voluntary.description")}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {(
                  t("privacyPolicy.content.dataCollection.voluntary.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-[#2a2765] mb-3">
                {t("privacyPolicy.content.dataCollection.automatic.title")}
              </h3>
              <p className="mb-4">
                {t("privacyPolicy.content.dataCollection.automatic.description")}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {(
                  t("privacyPolicy.content.dataCollection.automatic.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 5: Finalités du traitement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.processingPurposes.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.processingPurposes.description")}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {(
                  t("privacyPolicy.content.processingPurposes.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 6: Base légale */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.legalBasis.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.legalBasis.description")}
              </p>
              <ul className="space-y-3 mb-6">
                {(
                  t("privacyPolicy.content.legalBasis.list", {
                    returnObjects: true,
                  }) as Array<{ title: string; description: string }>
                ).map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#37b7ab] font-bold">•</span>
                    <span>
                      <strong>{item.title}</strong>
                      {item.description && ` ${item.description}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 7: Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Cookie className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.cookies.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.cookies.description")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {(
                  t("privacyPolicy.content.cookies.purposeList", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="font-semibold text-[#2a2765] mb-2">
                  {t("privacyPolicy.content.cookies.types.title")}
                </h4>
                <ul className="space-y-2">
                  {(
                    t("privacyPolicy.content.cookies.types.list", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("privacyPolicy.content.cookies.manage")}</p>
              </div>
            </section>

            {/* Section 8: Conservation des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.dataRetention.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.dataRetention.description")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {(
                  t("privacyPolicy.content.dataRetention.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-600 italic">
                {t("privacyPolicy.content.dataRetention.note")}
              </p>
            </section>

            {/* Section 9: Communication des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.dataSharing.title")}
              </h2>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg mb-4">
                <p className="font-semibold">{t("privacyPolicy.content.dataSharing.noSale")}</p>
              </div>
              <p className="mb-4">
                {t("privacyPolicy.content.dataSharing.description")}
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {(
                  t("privacyPolicy.content.dataSharing.list", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 10: Sécurité des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Lock className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.dataSecurity.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.dataSecurity.description")}
              </p>
              <p className="text-gray-600 italic">
                {t("privacyPolicy.content.dataSecurity.note")}
              </p>
            </section>

            {/* Section 11: Vos droits */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Users className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.userRights.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.userRights.description")}
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {(
                  t("privacyPolicy.content.userRights.list", {
                    returnObjects: true,
                  }) as Array<{ title: string; description: string }>
                ).map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="flex items-center text-[#2a2765] font-semibold">
                      <span className="text-[#37b7ab] mr-2">•</span>
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg space-y-2">
                <p>{t("privacyPolicy.content.userRights.contact")}</p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 text-[#37b7ab] mr-2" />
                  <span className="font-semibold">{t("privacyPolicy.content.userRights.email")}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {t("privacyPolicy.content.userRights.authority")}
                </p>
              </div>
            </section>

            {/* Section 12: Données des mineurs */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("privacyPolicy.content.minors.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.minors.description")}
              </p>
              <p className="text-gray-600">
                {t("privacyPolicy.content.minors.note")}
              </p>
            </section>

            {/* Section 13: Modification de la politique */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.policyUpdates.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.policyUpdates.description")}
              </p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("privacyPolicy.content.policyUpdates.note")}</p>
              </div>
            </section>

            {/* Section 14: Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("privacyPolicy.content.contact.title")}
              </h2>
              <p className="mb-4">
                {t("privacyPolicy.content.contact.description")}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#37b7ab]" />
                  <span className="font-semibold">{t("privacyPolicy.content.contact.email")}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default PrivacyPolicy;
