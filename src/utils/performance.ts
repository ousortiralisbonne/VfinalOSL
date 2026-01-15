// Utilitaire pour les métriques de performance
export const measurePerformance = (metricName: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    // Utilisation de l'API moderne Performance Observer
    const navigationStart = performance.getEntriesByType('navigation')[0]?.startTime || 0;
    const now = performance.now();
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metricName}: ${now - navigationStart}ms`);
    }
  }
};

// Surveillance des métriques Web Vitals
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  // Ici, vous pouvez envoyer les métriques à votre service d'analytics
};