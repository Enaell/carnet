import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';

import { GiftByMember, GiftType } from "../components/common/types";
import { formatGiftByMember } from "../utils/utils";

const firebaseConfig = {

  apiKey: "AIzaSyD3NciLr8M-NP-CSUeHkHTdNoc0XyCoyO8",
  authDomain: "carnetdenoel.firebaseapp.com",
  projectId: "carnetdenoel",
  storageBucket: "carnetdenoel.appspot.com",
  messagingSenderId: "637589072780",
  appId: "1:637589072780:web:48eaff09bdc3a326a744a9",
  measurementId: "G-3GWD8F0B33"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const giftApi = {
  getAllGifts: async () => {
    const giftCol = collection(db, 'gifts');
    const giftSnapshot = await getDocs(giftCol);
    const giftDocs = giftSnapshot.docs;
    const giftsByPerson: GiftByMember = formatGiftByMember(giftDocs);
    console.log(giftsByPerson);
    return giftsByPerson;
  
  },
  createGift: async (gift: GiftType, user: string) => {
    try {
      if (gift.name) {
        await setDoc(doc(db, "gifts", gift.name), {...gift, owner: user, _id: gift.name});
        return {success: true, message: {...gift, _id: gift._id}}
      }
      return {success: false, message: 'Gift has no name'};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  updateGift: async (gift: GiftType, token: string) => {
    try {
      if (gift._id) {
        const giftRef = doc(db, 'gifts', gift._id);
        setDoc(giftRef, gift, { merge: true });
        return {success: true, message: {...gift}};
      }
      return {success: false, message: 'Gift has no _id'}
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  deleteGift: async (gift: GiftType, token: string) => {
    try {
      if (gift._id) {
        await deleteDoc(doc(db, "gifts", gift._id));
        return {success: true, message: {...gift}};
      }
     return {success: false, message: 'gift has no _id'};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
 }

