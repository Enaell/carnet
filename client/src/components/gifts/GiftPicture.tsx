import { useEffect, useState } from "react";
import { CardMedia, Autocomplete, TextField } from "@mui/material"
import { giftTypes, typeOfGift } from "../../utils/utils"
import { Row } from "../common/Flexbox"

import giftPict from './ressources/gifts.jpg';
import boardgamePict from './ressources/boardGame.jpg';
import clothPict from './ressources/cloths.jpg';
import cookingPict from './ressources/cooking.jpg';
import gamePict from './ressources/game.jpg';
import bookPict from './ressources/book.jpeg';
import jewelPict from './ressources/jewel.jpg';
import videoGamePict from './ressources/videoGames.jpeg';
import techoPict from './ressources/technologie.jpg';
import sportPict from './ressources/sport.png';
import associationPict from './ressources/association.jpg'


function getPictureByType(giftType: typeOfGift | undefined) {
  switch (giftType) {
    case 'book': return {pict: bookPict, name: 'Livre'};
    case 'boardgame': return {pict: boardgamePict, name: 'Jeu de société'};
    case 'game': return {pict: gamePict, name: 'Jouet'};
    case 'cloth': return {pict: clothPict, name: 'Vêtement'};
    case 'cooking': return {pict: cookingPict, name: 'Cuisine'};
    case 'jewel': return {pict: jewelPict, name: 'Bijoux'};
    case 'videogame': return {pict: videoGamePict, name: 'Jeux vidéo'};
    case 'techno': return {pict: techoPict, name: 'Technologie'};
    case 'sport': return {pict: sportPict, name: 'Sport'};
    case 'association': return {pict: associationPict, name: 'Association'};
    case 'other': return {pict: giftPict, name: 'Autre'};
    default: return {pict: giftPict, name: 'other'};
  }
}

export const GiftPicture = ({
  isMobile,
  onHover,
  onModify,
  giftType,
  updateGiftType
}: {
  isMobile: boolean,
  onHover: boolean;
  onModify: boolean;
  giftType?: typeOfGift;
  updateGiftType: (type: typeOfGift) => void;
}) => {

  const [pictureInfo, setPictureInfo] = useState(getPictureByType(giftType));

  useEffect(() => {
    setPictureInfo(getPictureByType(giftType || 'other' as typeOfGift));
  }, [giftType])

  return ( <> 
      <CardMedia 
        style={{ 
          position: 'absolute',
          zIndex: 2,
          height: '102px',
          width: '100px',
          borderRadius: '50%',
          margin:'-2px 0 0 0',
          boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
        }}
        image={pictureInfo.pict}
      />
      <Row 
        horizontal='center'
        vertical='center'
        style={{
          zIndex: 3,
          height: '102px',
          width: '100px',
          borderRadius: '50%',
          position: 'absolute',
          margin:'-2px 0 0 0',
          backgroundColor: onHover ? '#00000000': '#00000014',
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
        >
        { onModify && <Autocomplete
          style={{backgroundColor: '#e34836', height: '104px', width: '100px', borderRadius: '50%'}}
          limitTags={8}
          options={giftTypes}
          getOptionLabel={(gKind: typeOfGift) => getPictureByType(gKind).name}
          value={giftType || 'other' as typeOfGift}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(_event, value) => {
            updateGiftType(value || 'other' as typeOfGift)
            // setNewGift({...newGift, types: values ? [values] : ['other' as typeOfGift]});
            // setPictureInfo(getPictureByType(values ? values : 'other' as typeOfGift));
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              label={'Type'}
              placeholder={'Type'}
              style={{margin: '20px', width: '110px'}}
            />
          )}
        />
        }
      </Row>
    </>
  )
}