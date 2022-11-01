// import { getFirestore } from "@firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { giftApi } from "../api/ApiClient";
import { GiftType } from "../components/common/types";


export function useNoteBook() {
  let { username: user } = useParams()

  const [giftsByPerson, setGiftsByPerson] = useState({} as {[member: string] : GiftType[]} );
  
  useEffect(() => {
    if (user) {
      giftApi.getAllGifts(user).then(gifts => {
        console.log('===========================================')
        setGiftsByPerson(gifts)
      });
    }
  }, [user]);

  async function createGift(newGift: GiftType) {
    if (user && newGift.name) {
      const memberGifts = giftsByPerson && giftsByPerson[user] ? giftsByPerson[user] : []
      const res = await giftApi.createGift(newGift, user);
      if (res.success) {
        const gift = {...newGift, id: newGift.name}
        setGiftsByPerson({...giftsByPerson, [user]: [gift, ...memberGifts]});
      }
    }
  }

  async function updateGift(updatedGift: GiftType) {
    if (user && updatedGift.name){
      const newGifts = giftsByPerson[user].map(gift => gift.id === updatedGift.id ? updatedGift: gift);
      setGiftsByPerson({...giftsByPerson, [user]: newGifts})
      await giftApi.updateGift(updatedGift, user);
    }
  }
  
  async function onReserve(giftToReserve: GiftType) {
    if (giftToReserve.owner && giftToReserve.name) {
      const newGifts = giftsByPerson[giftToReserve.owner].map(gift => gift.id === giftToReserve.id ? giftToReserve : gift);
      setGiftsByPerson({...giftsByPerson, [giftToReserve.owner]: newGifts})
      if(user)
        await giftApi.updateGift(giftToReserve, user);
    }
  }

  async function  deleteGift(deletedGift: GiftType) {
    if (user && deletedGift.id) {
      giftApi.deleteGift(deletedGift, user);
      setGiftsByPerson({...giftsByPerson, [user]: giftsByPerson[user].filter(gift => gift.name !== deletedGift.name)});
    }
  }

  return {user, giftsByPerson, createGift, updateGift, deleteGift, onReserve};
}