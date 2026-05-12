import React, { useEffect, useState, createContext, useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { FIREBASE_CONFIG, FIREBASE_VAPIID_KEY } from "./constant"
// Firebase Configuration
const firebaseConfig = {
	apiKey: FIREBASE_CONFIG.FCM_APIKEY,
	authDomain: FIREBASE_CONFIG.FCM_AUTHDOMAIN,
	projectId: FIREBASE_CONFIG.FCM_PROJECTID,
	storageBucket: FIREBASE_CONFIG.FCM_STORAGEBUCKET,
	messagingSenderId: FIREBASE_CONFIG.FCM_MESSAGINGSENDERID,
	appId: FIREBASE_CONFIG.FCM_APPID,
	measurementId: FIREBASE_CONFIG.FCM_MEASUREMENTID
};

// Firebase Initialization
// Initialize Firebase only if it hasn't been initialized yet
let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApps()[0]; // Use the already-initialized app
}

// Custom hook to use Firebase messaging
const useFirebaseMessaging = () => {
	const [token, setToken] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if ("Notification" in window && "serviceWorker" in navigator) {
			// Check for notification permission and ask if not granted
			if (Notification.permission !== "granted") {
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						console.log("Notification permission granted.");
						// Proceed with registering the service worker and FCM token retrieval
						navigator.serviceWorker
							.register("/firebase-messaging-sw.js")
							.then((registration) => {
								console.log("Service Worker registered with scope:", registration.scope);

								const messaging = getMessaging(firebaseApp);

								// Request for FCM token
								getToken(messaging, { vapidKey: FIREBASE_VAPIID_KEY })
									.then((currentToken) => {
										if (currentToken) {
											setToken(currentToken);
										} else {
											console.log("No registration token available. Request permission to generate one.");
										}
									})
									.catch((err) => {
										console.log("An error occurred while retrieving token: ", err);
									});

								// Listen for foreground messages
								onMessage(messaging, (payload) => {
									setMessage(payload);

									if (Notification.permission === "granted") {
										const { title, body } = payload.notification;
										new Notification(title, { body });
									}
								});
							})
							.catch((err) => {
								console.log("Service Worker registration failed: ", err);
							});
					} else {
						console.log("Notification permission denied.");
					}
				});
			} else {
				// If permission is already granted, proceed with the service worker registration
				navigator.serviceWorker
					.register("/firebase-messaging-sw.js")
					.then((registration) => {
						console.log("Service Worker registered with scope:", registration.scope);

						const messaging = getMessaging(firebaseApp);

						// Request for FCM token
						getToken(messaging, { vapidKey: FIREBASE_VAPIID_KEY })
							.then((currentToken) => {
								if (currentToken) {
									setToken(currentToken);
								} else {
									console.log("No registration token available. Request permission to generate one.");
								}
							})
							.catch((err) => {
								console.log("An error occurred while retrieving token: ", err);
							});

						// Listen for foreground messages
						onMessage(messaging, (payload) => {
							setMessage(payload);

							if (Notification.permission === "granted") {
								const { title, body } = payload.notification;
								new Notification(title, { body });
							}
						});
					})
					.catch((err) => {
						console.log("Service Worker registration failed: ", err);
					});
			}
		}
	}, []);

	return { token, message };
};

// Context to provide Firebase messaging data
export const FirebaseContext = createContext({ token: "", message: "" });

export const FirebaseProvider = ({ children }) => {
	const firebaseMessaging = useFirebaseMessaging();
	return (
		<FirebaseContext.Provider value={firebaseMessaging}>
			{children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => {
	return useContext(FirebaseContext);
};
