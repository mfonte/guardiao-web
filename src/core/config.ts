/**
 * Configuração centralizada lida das variáveis de ambiente Vite.
 * Falha cedo se variáveis obrigatórias estiverem ausentes.
 */

const env = import.meta.env;

function required(key: keyof ImportMetaEnv): string {
  const value = env[key];
  if (!value || value === '') {
    throw new Error(
      `[config] Variável de ambiente obrigatória ausente: ${key}. ` +
        `Verifique o arquivo .env.${env.VITE_APP_ENV} e preencha o valor.`,
    );
  }
  return value;
}

export const config = {
  env: env.VITE_APP_ENV,
  appName: env.VITE_APP_NAME,
  isProduction: env.VITE_APP_ENV === 'production',
  isUat: env.VITE_APP_ENV === 'uat',
  isDevelopment: env.VITE_APP_ENV === 'development',
  logLevel: env.VITE_LOG_LEVEL,
  enableAnalytics: env.VITE_ENABLE_ANALYTICS === 'true',
  firebase: {
    // Estes 3 não são secrets — vão ao bundle público
    projectId: required('VITE_FIREBASE_PROJECT_ID'),
    databaseURL: required('VITE_FIREBASE_DATABASE_URL'),
    authDomain: required('VITE_FIREBASE_AUTH_DOMAIN'),
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    // Os abaixo só serão exigidos quando Firebase init rodar
    // (não validamos aqui pra permitir bootstrap sem keys ainda)
    apiKey: env.VITE_FIREBASE_API_KEY,
    appId: env.VITE_FIREBASE_APP_ID,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  },
} as const;
