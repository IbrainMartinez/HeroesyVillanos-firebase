import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCpTtP-eEi2PYyA3ryZTctUXOQ1m_5-EDw",
  authDomain: "superheroes-1812d.firebaseapp.com",
  projectId: "superheroes-1812d",
  storageBucket: "superheroes-1812d.appspot.com",
  messagingSenderId: "827581103126",
  appId: "1:827581103126:web:89d480fc9944268149c937"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)