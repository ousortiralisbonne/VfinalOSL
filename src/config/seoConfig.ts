// SEO Configuration for all pages

export interface PageSEO {
  title: {
    fr: string;
    en: string;
    pt: string;
  };
  description: {
    fr: string;
    en: string;
    pt: string;
  };
  keywords: {
    fr: string;
    en: string;
    pt: string;
  };
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: {
      fr: 'Où Sortir à Lisbonne 2025 | Guide Local des Meilleures Expériences',
      en: 'Where to Go in Lisbon 2025 | Local Guide to Best Experiences',
      pt: 'Onde Sair em Lisboa 2025 | Guia Local das Melhores Experiências'
    },
    description: {
      fr: 'Découvrez les meilleurs restaurants, bars, clubs, événements et activités à Lisbonne. Guide local authentique avec visites guidées en français, croisières sur le Tage et expériences uniques.',
      en: 'Discover the best restaurants, bars, clubs, events and activities in Lisbon. Authentic local guide with guided tours, Tagus cruises and unique experiences.',
      pt: 'Descubra os melhores restaurantes, bares, clubes, eventos e atividades em Lisboa. Guia local autêntico com visitas guiadas, cruzeiros no Tejo e experiências únicas.'
    },
    keywords: {
      fr: 'Lisbonne, que faire Lisbonne, restaurants Lisbonne, bars Lisbonne, clubs Lisbonne, événements Lisbonne, activités Lisbonne, guide local, tourisme Portugal, visites guidées français, croisières Lisbonne',
      en: 'Lisbon, what to do Lisbon, Lisbon restaurants, Lisbon bars, Lisbon clubs, Lisbon events, Lisbon activities, local guide, Portugal tourism, guided tours, Lisbon cruises',
      pt: 'Lisboa, o que fazer Lisboa, restaurantes Lisboa, bares Lisboa, clubes Lisboa, eventos Lisboa, atividades Lisboa, guia local, turismo Portugal, visitas guiadas, cruzeiros Lisboa'
    }
  },
  restaurants: {
    title: {
      fr: 'Meilleurs Restaurants à Lisbonne 2025 | Guide Local Cuisine Portugaise',
      en: 'Best Restaurants in Lisbon 2025 | Local Portuguese Cuisine Guide',
      pt: 'Melhores Restaurantes em Lisboa 2025 | Guia Local Gastronomia Portuguesa'
    },
    description: {
      fr: 'Découvrez les meilleurs restaurants de Lisbonne : cuisine portugaise traditionnelle, restaurants gastronomiques, adresses avec vue sur le Tage. Guide local expert avec réservations.',
      en: 'Discover the best restaurants in Lisbon: traditional Portuguese cuisine, gourmet restaurants, addresses with Tagus views. Expert local guide with reservations.',
      pt: 'Descubra os melhores restaurantes de Lisboa: cozinha portuguesa tradicional, restaurantes gastronómicos, endereços com vista para o Tejo. Guia local especialista com reservas.'
    },
    keywords: {
      fr: 'restaurants Lisbonne, où manger Lisbonne, gastronomie portugaise, cuisine Lisbonne, meilleurs restaurants, restaurant Lisbonne pas cher, restaurant vue Tage, bacalhau, pasteis nata',
      en: 'Lisbon restaurants, where to eat Lisbon, Portuguese gastronomy, Lisbon cuisine, best restaurants, cheap restaurant Lisbon, Tagus view restaurant, bacalhau, pasteis nata',
      pt: 'restaurantes Lisboa, onde comer Lisboa, gastronomia portuguesa, cozinha Lisboa, melhores restaurantes, restaurante Lisboa barato, restaurante vista Tejo, bacalhau, pasteis nata'
    }
  },
  bars: {
    title: {
      fr: 'Meilleurs Bars à Lisbonne 2025 | Rooftops, Cocktails & Vie Nocturne',
      en: 'Best Bars in Lisbon 2025 | Rooftops, Cocktails & Nightlife',
      pt: 'Melhores Bares em Lisboa 2025 | Rooftops, Cocktails & Vida Noturna'
    },
    description: {
      fr: 'Découvrez les meilleurs bars de Lisbonne : rooftops avec vue panoramique, bars à cocktails branchés, bars authentiques du Bairro Alto. Guide local des meilleures adresses nocturnes.',
      en: 'Discover the best bars in Lisbon: rooftops with panoramic views, trendy cocktail bars, authentic Bairro Alto bars. Local guide to the best nightlife spots.',
      pt: 'Descubra os melhores bares de Lisboa: rooftops com vista panorâmica, bares de cocktails modernos, bares autênticos do Bairro Alto. Guia local dos melhores spots noturnos.'
    },
    keywords: {
      fr: 'bars Lisbonne, rooftop Lisbonne, bars cocktails Lisbonne, vie nocturne Lisbonne, Bairro Alto bars, meilleurs bars, sortir Lisbonne soir, bars vue Lisbonne',
      en: 'Lisbon bars, Lisbon rooftop, Lisbon cocktail bars, Lisbon nightlife, Bairro Alto bars, best bars, Lisbon night out, Lisbon bars with view',
      pt: 'bares Lisboa, rooftop Lisboa, bares cocktails Lisboa, vida noturna Lisboa, Bairro Alto bares, melhores bares, sair Lisboa noite, bares vista Lisboa'
    }
  },
  clubs: {
    title: {
      fr: 'Meilleurs Clubs à Lisbonne 2025 | Discothèques & Vie Nocturne',
      en: 'Best Clubs in Lisbon 2025 | Nightclubs & Nightlife',
      pt: 'Melhores Clubes em Lisboa 2025 | Discotecas & Vida Noturna'
    },
    description: {
      fr: 'Découvrez les meilleurs clubs et discothèques de Lisbonne. LuxFrágil, Lust in Rio, musique électronique, techno et fêtes dans les quartiers branchés de Lisbonne.',
      en: 'Discover the best clubs and nightclubs in Lisbon. LuxFrágil, Lust in Rio, electronic music, techno and parties in trendy Lisbon neighborhoods.',
      pt: 'Descubra os melhores clubes e discotecas de Lisboa. LuxFrágil, Lust in Rio, música eletrônica, techno e festas nos bairros modernos de Lisboa.'
    },
    keywords: {
      fr: 'clubs Lisbonne, discothèques Lisbonne, vie nocturne Lisbonne, LuxFragil, techno Lisbonne, fêtes Lisbonne, nightlife Lisbonne, sortir Lisbonne nuit',
      en: 'Lisbon clubs, Lisbon nightclubs, Lisbon nightlife, LuxFragil, techno Lisbon, Lisbon parties, Lisbon nightlife, Lisbon night out',
      pt: 'clubes Lisboa, discotecas Lisboa, vida noturna Lisboa, LuxFragil, techno Lisboa, festas Lisboa, nightlife Lisboa, sair Lisboa noite'
    }
  },
  events: {
    title: {
      fr: 'Événements à Lisbonne 2025 | Concerts, Festivals & Agenda Culturel',
      en: 'Events in Lisbon 2025 | Concerts, Festivals & Cultural Agenda',
      pt: 'Eventos em Lisboa 2025 | Concertos, Festivais & Agenda Cultural'
    },
    description: {
      fr: 'Ne manquez aucun événement à Lisbonne ! Concerts, festivals, spectacles de fado, expositions et événements culturels. Agenda complet avec billetterie et réservations.',
      en: 'Don\'t miss any event in Lisbon! Concerts, festivals, fado shows, exhibitions and cultural events. Complete agenda with tickets and reservations.',
      pt: 'Não perca nenhum evento em Lisboa! Concertos, festivais, espetáculos de fado, exposições e eventos culturais. Agenda completa com bilhetes e reservas.'
    },
    keywords: {
      fr: 'événements Lisbonne, concerts Lisbonne, festivals Lisbonne 2025, fado Lisbonne, agenda culturel, expositions Lisbonne, spectacles Lisbonne, que faire Lisbonne ce weekend',
      en: 'Lisbon events, Lisbon concerts, Lisbon festivals 2025, Lisbon fado, cultural agenda, Lisbon exhibitions, Lisbon shows, what to do Lisbon this weekend',
      pt: 'eventos Lisboa, concertos Lisboa, festivais Lisboa 2025, fado Lisboa, agenda cultural, exposições Lisboa, espetáculos Lisboa, o que fazer Lisboa fim semana'
    }
  },
  guidedTours: {
    title: {
      fr: 'Visites Guidées à Lisbonne en Français 2025 | Tours Privés & Groupes',
      en: 'Guided Tours in Lisbon 2025 | Private & Group Tours',
      pt: 'Visitas Guiadas em Lisboa 2025 | Tours Privados & Grupos'
    },
    description: {
      fr: 'Réservez vos visites guidées à Lisbonne en français avec guides locaux experts. Sintra, Belém, Alfama, tuk-tuk, vélo. Tours privés et excursions journée depuis Lisbonne.',
      en: 'Book your guided tours in Lisbon with expert local guides. Sintra, Belém, Alfama, tuk-tuk, bike. Private tours and day trips from Lisbon.',
      pt: 'Reserve as suas visitas guiadas em Lisboa com guias locais especialistas. Sintra, Belém, Alfama, tuk-tuk, bicicleta. Tours privados e excursões dia desde Lisboa.'
    },
    keywords: {
      fr: 'visites guidées Lisbonne français, tours Lisbonne, excursions Lisbonne, visite Sintra, visite Belém, Alfama tour, tuk-tuk Lisbonne, guide français Lisbonne, excursion journée Lisbonne',
      en: 'Lisbon guided tours, Lisbon tours, Lisbon excursions, Sintra tour, Belém tour, Alfama tour, tuk-tuk Lisbon, Lisbon day trips, private tour Lisbon',
      pt: 'visitas guiadas Lisboa, tours Lisboa, excursões Lisboa, visita Sintra, visita Belém, Alfama tour, tuk-tuk Lisboa, excursão dia Lisboa, tour privado Lisboa'
    }
  },
  boatTrips: {
    title: {
      fr: 'Croisières Lisbonne 2025 | Bateaux sur le Tage, Sunset & Privées',
      en: 'Lisbon Cruises 2025 | Tagus Boats, Sunset & Private Cruises',
      pt: 'Cruzeiros Lisboa 2025 | Barcos no Tejo, Pôr do Sol & Privados'
    },
    description: {
      fr: 'Vivez une croisière inoubliable sur le Tage à Lisbonne. Sunset cruises, bateaux privés, croisières romantiques, voile et sorties en mer depuis Lisbonne et Cascais.',
      en: 'Experience an unforgettable cruise on the Tagus in Lisbon. Sunset cruises, private boats, romantic cruises, sailing and sea trips from Lisbon and Cascais.',
      pt: 'Viva um cruzeiro inesquecível no Tejo em Lisboa. Cruzeiros pôr do sol, barcos privados, cruzeiros românticos, vela e passeios marítimos desde Lisboa e Cascais.'
    },
    keywords: {
      fr: 'croisières Lisbonne, bateaux Tage, sunset cruise Lisbonne, croisière romantique, bateau privé Lisbonne, voile Lisbonne, Cascais bateau, sortie mer Lisbonne',
      en: 'Lisbon cruises, Tagus boats, Lisbon sunset cruise, romantic cruise, private boat Lisbon, sailing Lisbon, Cascais boat, Lisbon sea trip',
      pt: 'cruzeiros Lisboa, barcos Tejo, cruzeiro pôr do sol Lisboa, cruzeiro romântico, barco privado Lisboa, vela Lisboa, Cascais barco, passeio mar Lisboa'
    }
  },
  hotels: {
    title: {
      fr: 'Meilleurs Hôtels à Lisbonne 2025 | Où Dormir - Guide Complet',
      en: 'Best Hotels in Lisbon 2025 | Where to Stay - Complete Guide',
      pt: 'Melhores Hotéis em Lisboa 2025 | Onde Ficar - Guia Completo'
    },
    description: {
      fr: 'Trouvez les meilleurs hôtels de Lisbonne par quartier. Hôtels de luxe, boutique hotels Alfama, hébergements Bairro Alto. Guide expert pour choisir où dormir à Lisbonne.',
      en: 'Find the best hotels in Lisbon by neighborhood. Luxury hotels, Alfama boutique hotels, Bairro Alto accommodations. Expert guide to choosing where to stay in Lisbon.',
      pt: 'Encontre os melhores hotéis de Lisboa por bairro. Hotéis de luxo, boutique hotels Alfama, alojamentos Bairro Alto. Guia especialista para escolher onde ficar em Lisboa.'
    },
    keywords: {
      fr: 'hôtels Lisbonne, où dormir Lisbonne, hôtel Alfama, hôtel Bairro Alto, hôtel centre Lisbonne, boutique hotel Lisbonne, hôtel pas cher Lisbonne, meilleur quartier Lisbonne',
      en: 'Lisbon hotels, where to stay Lisbon, Alfama hotel, Bairro Alto hotel, Lisbon center hotel, Lisbon boutique hotel, cheap hotel Lisbon, best neighborhood Lisbon',
      pt: 'hotéis Lisboa, onde ficar Lisboa, hotel Alfama, hotel Bairro Alto, hotel centro Lisboa, boutique hotel Lisboa, hotel barato Lisboa, melhor bairro Lisboa'
    }
  },
  sports: {
    title: {
      fr: 'Activités Sportives à Lisbonne 2025 | Surf, Golf, Paddle & Plus',
      en: 'Sports Activities in Lisbon 2025 | Surf, Golf, Paddle & More',
      pt: 'Atividades Desportivas em Lisboa 2025 | Surf, Golfe, Paddle & Mais'
    },
    description: {
      fr: 'Découvrez les meilleures activités sportives à Lisbonne et ses environs. Surf à Cascais, golf, paddle, randonnées et sports nautiques avec réservation en ligne.',
      en: 'Discover the best sports activities in Lisbon and surroundings. Surfing in Cascais, golf, paddle, hiking and water sports with online booking.',
      pt: 'Descubra as melhores atividades desportivas em Lisboa e arredores. Surf em Cascais, golfe, paddle, caminhadas e desportos náuticos com reserva online.'
    },
    keywords: {
      fr: 'sport Lisbonne, surf Lisbonne, surf Cascais, golf Lisbonne, paddle Lisbonne, activités nautiques, randonnée Sintra, sport Portugal',
      en: 'Lisbon sports, Lisbon surf, Cascais surf, Lisbon golf, Lisbon paddle, water activities, Sintra hiking, Portugal sports',
      pt: 'desporto Lisboa, surf Lisboa, surf Cascais, golfe Lisboa, paddle Lisboa, atividades náuticas, caminhada Sintra, desporto Portugal'
    }
  },
  moreActivities: {
    title: {
      fr: 'Autres Activités à Lisbonne 2025 | Expériences Uniques',
      en: 'More Activities in Lisbon 2025 | Unique Experiences',
      pt: 'Mais Atividades em Lisboa 2025 | Experiências Únicas'
    },
    description: {
      fr: 'Explorez des activités uniques à Lisbonne : ateliers de cuisine, dégustations de vins, cours de fado, experiences insolites. Réservez vos expériences authentiques.',
      en: 'Explore unique activities in Lisbon: cooking workshops, wine tastings, fado lessons, unusual experiences. Book your authentic experiences.',
      pt: 'Explore atividades únicas em Lisboa: workshops de cozinha, degustações de vinhos, aulas de fado, experiências invulgares. Reserve as suas experiências autênticas.'
    },
    keywords: {
      fr: 'activités Lisbonne, expériences Lisbonne, atelier cuisine portugaise, dégustation vin Porto, cours fado, activités insolites Lisbonne',
      en: 'Lisbon activities, Lisbon experiences, Portuguese cooking workshop, Port wine tasting, fado lessons, unusual activities Lisbon',
      pt: 'atividades Lisboa, experiências Lisboa, workshop cozinha portuguesa, degustação vinho Porto, aulas fado, atividades invulgares Lisboa'
    }
  },
  moreExplore: {
    title: {
      fr: 'Explorer Lisbonne 2025 | Que Voir et Que Faire',
      en: 'Explore Lisbon 2025 | What to See and Do',
      pt: 'Explorar Lisboa 2025 | O Que Ver e Fazer'
    },
    description: {
      fr: 'Découvrez tout ce qu\'il y a à voir et faire à Lisbonne. Monuments, musées, quartiers emblématiques, plages et excursions. Guide complet pour explorer Lisbonne.',
      en: 'Discover everything to see and do in Lisbon. Monuments, museums, iconic neighborhoods, beaches and excursions. Complete guide to exploring Lisbon.',
      pt: 'Descubra tudo o que há para ver e fazer em Lisboa. Monumentos, museus, bairros emblemáticos, praias e excursões. Guia completo para explorar Lisboa.'
    },
    keywords: {
      fr: 'visiter Lisbonne, que voir Lisbonne, que faire Lisbonne, monuments Lisbonne, musées Lisbonne, quartiers Lisbonne, plages Lisbonne, Belém, Alfama',
      en: 'visit Lisbon, what to see Lisbon, what to do Lisbon, Lisbon monuments, Lisbon museums, Lisbon neighborhoods, Lisbon beaches, Belém, Alfama',
      pt: 'visitar Lisboa, o que ver Lisboa, o que fazer Lisboa, monumentos Lisboa, museus Lisboa, bairros Lisboa, praias Lisboa, Belém, Alfama'
    }
  },
  transfers: {
    title: {
      fr: 'Transferts Aéroport Lisbonne 2025 | Navettes Privées & Taxis',
      en: 'Lisbon Airport Transfers 2025 | Private Shuttles & Taxis',
      pt: 'Transferes Aeroporto Lisboa 2025 | Shuttles Privados & Táxis'
    },
    description: {
      fr: 'Réservez votre transfert aéroport de Lisbonne. Navettes privées, taxis, transferts vers Cascais, Sintra et les hôtels. Service 24h/24 avec chauffeurs francophones.',
      en: 'Book your Lisbon airport transfer. Private shuttles, taxis, transfers to Cascais, Sintra and hotels. 24/7 service with professional drivers.',
      pt: 'Reserve o seu transfer do aeroporto de Lisboa. Shuttles privados, táxis, transferes para Cascais, Sintra e hotéis. Serviço 24h com motoristas profissionais.'
    },
    keywords: {
      fr: 'transfert aéroport Lisbonne, navette Lisbonne, taxi aéroport Lisbonne, transfert Cascais, transfert Sintra, chauffeur privé Lisbonne',
      en: 'Lisbon airport transfer, Lisbon shuttle, Lisbon airport taxi, Cascais transfer, Sintra transfer, private driver Lisbon',
      pt: 'transfer aeroporto Lisboa, shuttle Lisboa, táxi aeroporto Lisboa, transfer Cascais, transfer Sintra, motorista privado Lisboa'
    }
  },
  customTours: {
    title: {
      fr: 'Tours Sur Mesure Lisbonne 2025 | Voyages Personnalisés',
      en: 'Custom Tours Lisbon 2025 | Personalized Trips',
      pt: 'Tours Personalizados Lisboa 2025 | Viagens à Medida'
    },
    description: {
      fr: 'Créez votre voyage sur mesure à Lisbonne. Tours privés personnalisés, itinéraires adaptés à vos envies, guides francophones experts. Expérience unique garantie.',
      en: 'Create your custom trip to Lisbon. Personalized private tours, itineraries tailored to your wishes, expert guides. Unique experience guaranteed.',
      pt: 'Crie a sua viagem à medida em Lisboa. Tours privados personalizados, itinerários adaptados aos seus desejos, guias especialistas. Experiência única garantida.'
    },
    keywords: {
      fr: 'tour sur mesure Lisbonne, voyage personnalisé Portugal, guide privé Lisbonne, itinéraire Lisbonne, tour privé famille, lune de miel Lisbonne',
      en: 'custom tour Lisbon, personalized trip Portugal, private guide Lisbon, Lisbon itinerary, family private tour, honeymoon Lisbon',
      pt: 'tour personalizado Lisboa, viagem à medida Portugal, guia privado Lisboa, itinerário Lisboa, tour privado família, lua de mel Lisboa'
    }
  },
  blog: {
    title: {
      fr: 'Blog Lisbonne 2025 | Conseils, Astuces & Actualités',
      en: 'Lisbon Blog 2025 | Tips, Tricks & News',
      pt: 'Blog Lisboa 2025 | Dicas, Truques & Notícias'
    },
    description: {
      fr: 'Lisez notre blog pour découvrir les meilleures astuces, conseils locaux et actualités sur Lisbonne. Articles de voyage, bons plans et secrets de la ville.',
      en: 'Read our blog to discover the best tips, local advice and news about Lisbon. Travel articles, good deals and city secrets.',
      pt: 'Leia o nosso blog para descobrir as melhores dicas, conselhos locais e notícias sobre Lisboa. Artigos de viagem, bons negócios e segredos da cidade.'
    },
    keywords: {
      fr: 'blog Lisbonne, conseils Lisbonne, astuces voyage Lisbonne, actualités Lisbonne, guide voyage Portugal, bons plans Lisbonne',
      en: 'Lisbon blog, Lisbon tips, Lisbon travel tips, Lisbon news, Portugal travel guide, Lisbon deals',
      pt: 'blog Lisboa, dicas Lisboa, dicas viagem Lisboa, notícias Lisboa, guia viagem Portugal, bons negócios Lisboa'
    }
  },
  about: {
    title: {
      fr: 'À Propos | Où Sortir à Lisbonne - Votre Guide Local Expert',
      en: 'About Us | Where to Go in Lisbon - Your Expert Local Guide',
      pt: 'Sobre Nós | Onde Sair em Lisboa - O Seu Guia Local Especialista'
    },
    description: {
      fr: 'Découvrez l\'équipe d\'Où Sortir à Lisbonne. Guides locaux passionnés depuis 2019, nous vous accompagnons pour vivre les meilleures expériences de la capitale portugaise.',
      en: 'Meet the Where to Go in Lisbon team. Passionate local guides since 2019, we help you experience the best of the Portuguese capital.',
      pt: 'Conheça a equipa do Onde Sair em Lisboa. Guias locais apaixonados desde 2019, ajudamo-lo a viver as melhores experiências da capital portuguesa.'
    },
    keywords: {
      fr: 'à propos, équipe Où sortir à Lisbonne, guide local Lisbonne, agence tourisme Lisbonne, experts Lisbonne, guide francophone Portugal',
      en: 'about us, Where to Go in Lisbon team, local guide Lisbon, Lisbon tourism agency, Lisbon experts, Portugal guide',
      pt: 'sobre nós, equipa Onde Sair em Lisboa, guia local Lisboa, agência turismo Lisboa, especialistas Lisboa, guia Portugal'
    }
  },
  contact: {
    title: {
      fr: 'Contact | Où Sortir à Lisbonne - Nous Contacter',
      en: 'Contact | Where to Go in Lisbon - Get in Touch',
      pt: 'Contacto | Onde Sair em Lisboa - Entre em Contacto'
    },
    description: {
      fr: 'Contactez l\'équipe d\'Où Sortir à Lisbonne pour vos réservations, questions ou demandes personnalisées. Réponse rapide garantie.',
      en: 'Contact the Where to Go in Lisbon team for your reservations, questions or personalized requests. Quick response guaranteed.',
      pt: 'Contacte a equipa do Onde Sair em Lisboa para as suas reservas, perguntas ou pedidos personalizados. Resposta rápida garantida.'
    },
    keywords: {
      fr: 'contact Lisbonne, réservation Lisbonne, demande information, aide voyage Lisbonne, service client',
      en: 'contact Lisbon, Lisbon reservation, information request, Lisbon travel help, customer service',
      pt: 'contacto Lisboa, reserva Lisboa, pedido informação, ajuda viagem Lisboa, serviço cliente'
    }
  }
};

export const getSEOForPage = (pageName: string, lang: string): { title: string; description: string; keywords: string } => {
  const page = seoConfig[pageName];

  if (!page) {
    return {
      title: seoConfig.home.title[lang as keyof typeof seoConfig.home.title] || seoConfig.home.title.fr,
      description: seoConfig.home.description[lang as keyof typeof seoConfig.home.description] || seoConfig.home.description.fr,
      keywords: seoConfig.home.keywords[lang as keyof typeof seoConfig.home.keywords] || seoConfig.home.keywords.fr
    };
  }

  return {
    title: page.title[lang as keyof typeof page.title] || page.title.fr,
    description: page.description[lang as keyof typeof page.description] || page.description.fr,
    keywords: page.keywords[lang as keyof typeof page.keywords] || page.keywords.fr
  };
};
