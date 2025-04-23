const CACHE_NAME = 'healthcare-plus-v2';
const urlsToCache = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './telemedicine.html',
  './contact.html',
  './style.css',
  './manifest.json',
  './script.js',
  'https://img.freepik.com/free-vector/medical-logo-design_23-2149611193.jpg',
  'https://img.freepik.com/free-photo/modern-hospital-building_1268-14735.jpg',
  'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
  'https://img.freepik.com/free-photo/doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
  'https://img.freepik.com/free-photo/emergency-room-hospital_23-2148982267.jpg',
  'https://img.freepik.com/free-photo/doctor-consulting-patient-video-call_23-2149123456.jpg',
  'https://img.freepik.com/free-photo/medical-equipment-laboratory_23-2148982268.jpg',
  'https://img.freepik.com/free-photo/pharmacist-holding-medicine-box_23-2148982269.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache:', error);
        });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
          console.error('Fetch failed:', error);
          // Return offline page or cached response
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('You are offline. Please check your internet connection.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
}); 