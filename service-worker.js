self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(),
    icon: 'icon.png',
    badge: 'icon.png',
    actions: [
      { action: 'drink-water', title: '💧 Su İçtim', icon: 'icon.png' },
      { action: 'snooze', title: '⏰ Ertele', icon: 'icon.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('💧 Su Zamanı!', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  if (event.action === 'drink-water') {
    // Su içtim eylemi
    console.log('Kullanıcı su içtiğini bildirdi.');
  } else if (event.action === 'snooze') {
    // Erteleme eylemi
    console.log('Kullanıcı hatırlatmayı erteledi.');
  }
  event.notification.close();
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('water-tracker-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});