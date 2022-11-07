import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore/lite";
import { GiftByMember, GiftType } from "../components/common/types";

export enum familyMember {
    Isabelle = 'Isabelle',
    Luigi = 'Luigi',
    Eric = 'Eric',
    Hervé = 'Hervé',
    Valérie = 'Valérie',
    Thomas = 'Thomas',
    Sylvie = 'Sylvie',
    Aurelien = 'Aurelien',
    Lulu = 'Lulu',
    Audrey = 'Audrey',
    Dorian = 'Dorian',
    Fabien = 'Fabien',
    Eva = 'Eva',
    Yann = 'Yann',
    Noah = 'Noah',
    Titouan = 'Titouan',
    Peyo = 'Peyo',
}

export const family = Object.values(familyMember);

export function getTrunkName(name: string) {
  if (name.length > 4)
    return `${name.slice(0, 3)}..`
  return name;
}

export enum typeOfGift {
  other = 'other',
  book = 'book',
  boardgame = 'boardgame',
  videogame = 'videogame',
  cooking = 'cooking',
  cloth = 'cloth',
  jewel = 'jewel',
  game = 'game',
  techno = 'techno',
  sport = 'sport',
  association = 'association'
}
export const giftTypes= Object.values(typeOfGift);

export function formatGiftByMember(docs: QueryDocumentSnapshot<DocumentData>[]) {
  return docs.reduce((obj, doc) => {
    const gift = doc.data();
    return {
      ...obj,
      [gift.owner]: obj[gift.owner]
      ? [
        ...obj[gift.owner], 
        {
          _id: gift._id,
          owner: gift.owner,
          name: gift.name,
          price: gift.price,
          description: gift.description,
          link: gift.link,
          reservations: gift.reservations,
          types: gift.types
        }]
      : [{
        _id: gift._id,
        owner: gift.owner,
        name: gift.name,
        price: gift.price,
        description: gift.description,
        link: gift.link,
        reservations: gift.reservations,
        types: gift.types
      }]
    }
  }, {} as GiftByMember);
}

export const mobileFont = {
  fontWeight: '600',
  fontSize: '0.8rem',
  lineHeight: '1.3'
};

export function previewReservation(gift: GiftType, userName: string) {
  if (!gift.reservations || gift.reservations.length === 0)
    return [];

  const userReserved = gift.reservations?.some(reservation => reservation.userName === userName);

  if (gift.reservations.length > 1)
    return userReserved ? [userName, '...'] : [gift.reservations[0].userName, '...']; 

  return [gift.reservations[0].userName];
}