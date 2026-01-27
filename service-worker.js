importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded');

  // Cache app shell files (HTML, JS, CSS, manifest, icons)
  workbox.routing.registerRoute(
    ({request, url}) => 
      request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' || 
      url.pathname.endsWith('manifest.json') ||
      url.pathname.endsWith('favicon.ico') ||
      url.pathname.startsWith('/icons/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  // Cache images with NetworkFirst strategy
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );
} else {
  console.log('Workbox failed to load');
}
