const { initializeApp, getApps, cert } = require("firebase-admin/app");
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initializeFirebaseApp = () => {
  const app = getApps();
  //only initialize if no firebase admin apps are initialized one time only
  //this is to prevent multiple initializations in serverless environments
  if (!app.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // replace new lines in private key
      }),
    });
  }
  return {
    auth: getAuth(),
    db: getFirestore(),
  };
};

export const { auth, db } = initializeFirebaseApp();
