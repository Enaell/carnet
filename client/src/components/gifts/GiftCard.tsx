import React, { useState } from 'react'
import { Column, Row } from '../common/Flexbox'
import { GiftType } from '../common/types';
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
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { CardMedia, Autocomplete, TextField, Card, CardContent, Button } from '@mui/material';
import { giftTypes, typeOfGift } from '../../utils/utils';
import { CreateOutlined, SaveAltOutlined, DeleteOutlined, Close } from '@mui/icons-material';

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

export const GiftCard = ({ gift, isOwned, creation = false, createGift, updateGift, deleteGift}: {
  gift?: GiftType,
  isOwned: boolean,
  creation?: boolean,
  updateGift: (gift: GiftType) => void,
  createGift: (gift: GiftType) => void,
  deleteGift: (gift: GiftType) => void
}) => {


  const { isMobile } = useDeviceDetect();
  const [onHover, setOnHover] = useState(false);
  
  const [onModify, setOnModify] = useState(creation);
  const [newGift, setNewGift] = useState(gift || {} as GiftType);
  const [pictureInfo, setPictureInfo] = useState(getPictureByType(newGift?.types ? newGift?.types[0]: undefined));

  return (
    <div style={{width: isMobile ? '80%' : '615px', height: '100%'}} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
      <Row width='100%' style={{position: 'relative', margin: '10px'}} >
        {!isMobile && <> <CardMedia 
          style={{ 
            position: 'absolute',
            zIndex: 2,
            height: '154px',
            width: '150px',
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
            height: '154px',
            width: '150px',
            borderRadius: '50%',
            position: 'absolute',
            margin:'-2px 0 0 0',
            backgroundColor: onHover ? '#00000000': '#00000014',
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          }}
          >
          { onModify && <Autocomplete
            style={{backgroundColor: '#e34836', height: '154px', width: '150px', borderRadius: '50%'}}
            limitTags={8}
            options={giftTypes}
            getOptionLabel={(gKind: typeOfGift) => getPictureByType(gKind).name}
            value={newGift?.types ? newGift?.types[0]: 'other' as typeOfGift}
            filterSelectedOptions
            disableCloseOnSelect
            onChange={(_event, values) => {
              setNewGift({...newGift, types: values ? [values] : ['other' as typeOfGift]});
              setPictureInfo(getPictureByType(values ? values : 'other' as typeOfGift));
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
        </Row></>}
        <Card
          elevation={onHover ? 5 : 1}
          style={{width: isMobile ? '100%' : '500px', paddingTop: '0', margin: isMobile ? '' : '0 0 0 75px'}}
        >
          <CardContent style={ isMobile ? {padding: '10px 0px 10px 10px'} : { paddingLeft: '95px' }} >
          <Row width={'100%'} height={'100%'} horizontal='space-between'>
            <Column width={'100%'} height={'110px'}>
              <TextField
                fullWidth
                InputProps={onModify ? undefined : {
                  readOnly: true,
                }}
                label='Nom'
                error={!newGift?.name}
                value={newGift.name}
                onChange={e=> setNewGift({...newGift, name: e.target.value})}
              />
              <Row horizontal='space-between'>
                {(gift?.price?.average || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: isMobile ? '50px' : '100px'}}
                  type='number'
                  label='Prix moyen'
                  value={newGift.price?.average}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, average: e.target.value as number}})}
                />}
                {(gift?.price?.max || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: isMobile ? '50px' : '100px'}}
                  type='number'
                  label='Prix Max'
                  value={newGift.price?.max}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, max: e.target.value as number}})}
                />}
                {(gift?.price?.min || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: isMobile ? '50px' : '100px'}}
                  type='number'
                  label='Prix Min'
                  value={newGift.price?.min}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, min: e.target.value as number}})}
                />}
              </Row>
            </Column>
            { isOwned && (onHover || isMobile) && <Column>
            { !onModify ?
              <>
                <Button onClick={() => setOnModify(true)}>
                  <CreateOutlined color='action' titleAccess={'Modify'}/>
                </Button>
              </>
              : 
              <>
                <Button>
                  <SaveAltOutlined
                    onClick={async () => {
                      if (creation) {
                        createGift(newGift);
                        setNewGift({
                          name: '',
                          price: {average: 0, max: 0, min: 0},
                          types:['other' as typeOfGift]
                        })
                      }
                      else {                        
                        updateGift(newGift);
                        setOnModify(false)
                      }
                    }}
                    color='action'
                    titleAccess={'Save'}
                  />
                </Button>
                <Button>
                  <DeleteOutlined onClick={() => {if(gift) deleteGift(gift); setOnModify(false)}}  color='action' titleAccess={'Delete'}/>
                </Button>
                <Button>
                  <Close onClick={() => {setNewGift(gift || {} as GiftType); setOnModify(false)}} color='action' titleAccess={'Cancel'}/>
                </Button>
              </>}
            </Column>}
          </Row>
        </CardContent>
      </Card>
    </Row>
  </div>)
}