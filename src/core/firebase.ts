/**
 * Inicialização do Firebase para o web.
 *
 * Lê config de `core/config.ts` que por sua vez lê das variáveis VITE_*.
 * Para rodar de fato, é necessário registrar um app web no console Firebase
 * de cada projeto (dev/uat/prod) e copiar apiKey/appId/messagingSenderId
 * pros respectivos `.env.*`.
 *
 * Comando útil:
 *   firebase apps:sdkconfig WEB --project guardiao-iot-dev
 */

import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getDatabase, type Database } from 'firebase/database';

import { config } from './config';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Database | null = null;

function getFirebaseConfig(): FirebaseOptions {
  return {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
  };
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (!config.firebase.apiKey) {
      throw new Error(
        `[firebase] VITE_FIREBASE_API_KEY ausente em .env.${config.env}. ` +
          `Rode: firebase apps:sdkconfig WEB --project ${config.firebase.projectId}`,
      );
    }
    app = initializeApp(getFirebaseConfig());
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Database {
  if (!db) {
    db = getDatabase(getFirebaseApp());
  }
  return db;
}
