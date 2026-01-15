import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturedEvent = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2a2765] mb-12 text-center font-garage tracking-tight relative">
          <span className="relative inline-block after:content-[''] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#37b7ab]">
            {t('featuredEvent.title')}
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Fado Festival */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1565035010268-a3816f98589a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            />
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-[#ea3e4e]/10 text-[#ea3e4e] rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                {t('featuredEvent.tag')}
              </div>
              <h3 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage tracking-tight leading-tight">
                {t('featuredEvent.title')}
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.date')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.time')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.location')}</span>
                </div>
              </div>
              <button className="w-full bg-[#ea3e4e] text-white px-6 py-2 rounded-full hover:bg-[#d63545] transition font-garage tracking-wide text-sm">
                {t('featuredEvent.button')}
              </button>
            </div>
          </div>

          {/* Wine Tasting */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            />
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-[#37b7ab]/10 text-[#37b7ab] rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                {t('popularExperiences.gastronomy.category')}
              </div>
              <h3 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage tracking-tight leading-tight">
                {t('popularExperiences.gastronomy.title')}
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.date')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.time')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.location')}</span>
                </div>
              </div>
              <button className="w-full bg-[#37b7ab] text-white px-6 py-2 rounded-full hover:bg-[#2d9d93] transition font-garage tracking-wide text-sm">
                {t('featuredEvent.button')}
              </button>
            </div>
          </div>

          {/* Sunset Cruise */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            />
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-[#2f2d69]/10 text-[#2f2d69] rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                {t('popularExperiences.cruise.category')}
              </div>
              <h3 className="text-2xl font-bold text-[#2a2765] mb-4 font-garage tracking-tight leading-tight">
                {t('popularExperiences.cruise.title')}
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.date')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.time')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('featuredEvent.location')}</span>
                </div>
              </div>
              <button className="w-full bg-[#2f2d69] text-white px-6 py-2 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm">
                {t('featuredEvent.button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;