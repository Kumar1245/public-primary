// firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js",
);

// Initialize Firebase App inside the Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyAnLBgbyhyPd0K1xTWA3d6baLITJk9GG5s",
  authDomain: "public-primary.firebaseapp.com",
  projectId: "public-primary",
  storageBucket: "public-primary.firebasestorage.app",
  messagingSenderId: "668760466148",
  appId: "1:668760466148:web:7c285e77e545246fcc02f1",
  measurementId: "G-7BTF477ZXZ",
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Optional: Change to your custom notification icon
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
