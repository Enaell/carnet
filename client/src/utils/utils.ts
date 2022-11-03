import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore/lite";
import { GiftByMember } from "../components/common/types";

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

export function getForMobileName(name: string) {
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
          reservations: gift.reservations,
          types: gift.types
        }]
      : [{
        _id: gift._id,
        owner: gift.owner,
        name: gift.name,
        price: gift.price,
        reservations: gift.reservations,
        types: gift.types
      }]
    }
  }, {} as GiftByMember);
}
