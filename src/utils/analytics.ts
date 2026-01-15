// Types pour les événements Pixel
interface PixelEventData {
  content_type?: string;
  content_ids?: string[];
  content_name?: string;
  value?: number;
  currency?: string;
  search_string?: string;
}

// Facebook Pixel Events
export const trackPixelEvent = (eventName: string, data?: PixelEventData) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, data);
    } catch (error) {
      console.error('Error tracking pixel event:', error);
    }
  }
};

// Événements standards
export const pixelEvents = {
  // Formulaires
  startForm: () => trackPixelEvent('InitiateCheckout'),
  completeForm: () => trackPixelEvent('Lead'),
  
  // Navigation
  viewContent: (contentType: string, contentId: string) => 
    trackPixelEvent('ViewContent', {
      content_type: contentType,
      content_ids: [contentId]
    }),
    
  // Favoris
  addToWishlist: (itemData: { id: string; type: string; name: string }) =>
    trackPixelEvent('AddToWishlist', {
      content_type: itemData.type,
      content_ids: [itemData.id],
      content_name: itemData.name
    }),

  // Recherche
  search: (searchTerm: string) =>
    trackPixelEvent('Search', {
      search_string: searchTerm
    }),

  // Contact
  contact: () => trackPixelEvent('Contact'),

  // Réservation
  startBooking: (itemData: { id: string; type: string; name: string }) =>
    trackPixelEvent('InitiateCheckout', {
      content_type: itemData.type,
      content_ids: [itemData.id],
      content_name: itemData.name
    }),
  
  completeBooking: (bookingData: { 
    id: string; 
    type: string; 
    name: string; 
    value?: number 
  }) =>
    trackPixelEvent('Purchase', {
      content_type: bookingData.type,
      content_ids: [bookingData.id],
      content_name: bookingData.name,
      value: bookingData.value,
      currency: 'EUR'
    })
};