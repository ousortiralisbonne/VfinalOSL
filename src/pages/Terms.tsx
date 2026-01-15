// project/src/pages/Terms.tsx
import { Mail, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2f2d69] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-garage text-center">
            {t("terms.hero.title")}
          </h1>
          <p className="text-white/90 text-center text-xl mb-4">
            {t("terms.hero.subtitle")}
          </p>
          <p className="text-white/70 text-center">
            {t("terms.hero.lastUpdated")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose max-w-none">
            {/* 1. Présentation */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage flex items-center">
                <Shield className="h-6 w-6 mr-2 text-[#37b7ab]" />
                {t("terms.content.presentation.title")}
              </h2>
              <p className="mb-4">{t("terms.content.presentation.text1")}</p>
              <p className="mb-2">{t("terms.content.presentation.text2")}</p>
              <p className="mb-4 font-medium">{t("terms.content.presentation.text3")}</p>
              <p className="mb-4">{t("terms.content.presentation.text4")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.presentation.text5")}</p>
              </div>
            </section>

            {/* 2. Objet du site */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.siteObject.title")}
              </h2>
              <p className="mb-4">{t("terms.content.siteObject.description")}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(t("terms.content.siteObject.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </section>

            {/* 3. Acceptation des conditions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.acceptance.title")}
              </h2>
              <p className="mb-4">{t("terms.content.acceptance.text1")}</p>
              <p className="mb-4">{t("terms.content.acceptance.text2")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.acceptance.text3")}</p>
              </div>
            </section>

            {/* 4. Utilisation du site */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.siteUsage.title")}
              </h2>
              <p className="mb-4">{t("terms.content.siteUsage.description")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.siteUsage.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-gray-700">{t("terms.content.siteUsage.consequence")}</p>
              </div>
            </section>

            {/* 5. Réservations et prestations */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.reservations.title")}
              </h2>

              <h3 className="text-lg font-semibold text-[#2a2765] mb-3">
                {t("terms.content.reservations.subtitle1")}
              </h3>
              <p className="mb-3">{t("terms.content.reservations.text1")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.reservations.list1", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg mb-6">
                <p>{t("terms.content.reservations.intermediary")}</p>
              </div>

              <h3 className="text-lg font-semibold text-[#2a2765] mb-3">
                {t("terms.content.reservations.subtitle2")}
              </h3>
              <p className="mb-3">{t("terms.content.reservations.text2")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {(t("terms.content.reservations.list2", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <h3 className="text-lg font-semibold text-[#2a2765] mb-3">
                {t("terms.content.reservations.subtitle3")}
              </h3>
              <p className="mb-3">{t("terms.content.reservations.text3")}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{t("terms.content.reservations.text4")}</p>
              </div>
            </section>

            {/* 6. Tarifs et paiement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.pricing.title")}
              </h2>
              <p className="mb-3">{t("terms.content.pricing.text1")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.pricing.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <p className="mb-3">{t("terms.content.pricing.text2")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.pricing.text3")}</p>
              </div>
            </section>

            {/* 7. Droit de rétractation */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.withdrawal.title")}
              </h2>
              <p className="mb-3">{t("terms.content.withdrawal.text1")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.withdrawal.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-gray-700">{t("terms.content.withdrawal.text2")}</p>
              </div>
            </section>

            {/* 8. Annulation et modification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.cancellation.title")}
              </h2>
              <p className="mb-4">{t("terms.content.cancellation.text1")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.cancellation.text2")}</p>
              </div>
            </section>

            {/* 9. Responsabilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.liability.title")}
              </h2>
              <p className="mb-3">{t("terms.content.liability.description")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.liability.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{t("terms.content.liability.note")}</p>
              </div>
            </section>

            {/* 10. Propriété intellectuelle */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.intellectualProperty.title")}
              </h2>
              <p className="mb-4">{t("terms.content.intellectualProperty.text1")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.intellectualProperty.text2")}</p>
              </div>
            </section>

            {/* 11. Données personnelles */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.personalData.title")}
              </h2>
              <p className="mb-4">{t("terms.content.personalData.text1")}</p>
              <p className="mb-3">{t("terms.content.personalData.text2")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.personalData.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2">{t("terms.content.personalData.contact")}</p>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#37b7ab]" />
                  <span className="text-[#37b7ab] font-medium">{t("terms.content.personalData.email")}</span>
                </div>
              </div>
            </section>

            {/* 12. Communications électroniques */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.electronicCommunications.title")}
              </h2>
              <p className="mb-3">{t("terms.content.electronicCommunications.text1")}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {(t("terms.content.electronicCommunications.list", { returnObjects: true }) as string[]).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.electronicCommunications.text2")}</p>
              </div>
            </section>

            {/* 13. Médiation et litiges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.mediation.title")}
              </h2>
              <p className="mb-4">{t("terms.content.mediation.text1")}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{t("terms.content.mediation.text2")}</p>
              </div>
            </section>

            {/* 14. Droit applicable */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage">
                {t("terms.content.applicableLaw.title")}
              </h2>
              <p className="mb-4">{t("terms.content.applicableLaw.text1")}</p>
              <div className="bg-[#37b7ab]/10 p-4 rounded-lg">
                <p>{t("terms.content.applicableLaw.text2")}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Terms;
