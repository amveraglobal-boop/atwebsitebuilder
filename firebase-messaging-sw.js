importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDEIGMi_zvgyWAJQkHob8rFlO8PTaNJ91M",
  authDomain: "fcmproject-e9254.firebaseapp.com",
  projectId: "fcmproject-e9254",
  storageBucket: "fcmproject-e9254.firebasestorage.app",
  messagingSenderId: "263821376341",
  appId: "1:263821376341:web:00acf5241a064305558ddc"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/icon.png',
    data: { url: payload.data?.clickUrl || '/' }
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === urlToOpen && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});
