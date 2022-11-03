import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
    // const getGiftsUrl = `http://localhost:5000/api/gifts`
    // const getGiftsUrl = `http://46.101.130.5:5000/api/gifts`
    // const res = await fetch(getGiftsUrl,
    // {
    //   headers: token ? {
    //   'Authorization': `Token ${token}`,
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // } : {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // },
    //   method:"GET"
    // })
    // const json = await res.json();
    // return json as {[member: string]: GiftType[];};
    const giftCol = collection(db, 'gifts');
    const giftSnapshot = await getDocs(giftCol);
    const giftDocs = giftSnapshot.docs;
    const giftsByPerson: GiftByMember = formatGiftByMember(giftDocs);
    console.log(giftsByPerson);
    return giftsByPerson;
  
  },
  createGift: async (gift: GiftType, token: string) => {
    console.log('api client gift CREATE gift');
    console.log(gift);
    if (!gift.name)
    return {success: false, message: 'gift has no name'};

    try {
      // const res = await fetch(`http://localhost:5000/api/gifts/`,{
      const res = await fetch(`http://46.101.130.5:5000/api/gifts/`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({gifts: [
          gift
        ]})
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  updateGift: async (gift: GiftType, token: string) => {
    console.log('api client gift update gift');
    console.log(gift);
    try {
      if (!gift.name)
       return {success: false, message: 'gift has no name'};
      //  const res = await fetch(`http://localhost:5000/api/gifts/${gift.id}`,{
       const res = await fetch(`http://46.101.130.5:5000/api/gifts/${gift._id}`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"PATCH",
        body: JSON.stringify({
          gift
        })
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  deleteGift: async (gift: GiftType, token: string) => {
    console.log('api client gift delete gift');
    console.log(gift);
    try {
      // const res = await fetch(`http://localhost:5000/api/gifts/${gift.id}`,{
      const res = await fetch(`http://46.101.130.5:5000/api/gifts/${gift._id}`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"DELETE",
        body: JSON.stringify({
          gift
        })
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  addCollection: async (collection: any, token: string) => {
    try {
      // const res = await fetch(`http://localhost:5000/api/gifts/collection`,{
      const res = await fetch(`http://46.101.130.5:5000/api/gifts/collection`,{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({gifts: collection})
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error: any) {
      console.log(error);
      return {success: false, message: error.message}
    }
  }
 }
