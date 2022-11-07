import { useState } from 'react'
import { Column, Row } from '../common/Flexbox'
import { GiftType } from '../common/types';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Card, CardContent, Button, Accordion, AccordionDetails, AccordionSummary, Typography, Chip } from '@mui/material';
import { mobileFont, previewReservation, typeOfGift } from '../../utils/utils';
import { CreateOutlined, SaveAltOutlined, DeleteOutlined, ExpandMore } from '@mui/icons-material';
import { GiftPicture } from './GiftPicture';
import { GiftInfos } from './GiftInfos';
import { ResevationPanel } from '../notebook/ReservationPanel';


export const GiftCard = ({ gift, isOwned, userName, creation = false, createGift, updateGift, deleteGift, onReserve}: {
  gift?: GiftType,
  isOwned: boolean,
  userName: string,
  creation?: boolean,
  updateGift: (gift: GiftType) => void,
  createGift: (gift: GiftType) => void,
  deleteGift: (gift: GiftType) => void,
  onReserve: (gift: GiftType) => Promise<void>
}) => {


  const { isMobile } = useDeviceDetect();
  const [onHover, setOnHover] = useState(false);
  
  const [onModify, setOnModify] = useState(false);
  const [newGift, setNewGift] = useState(gift || {} as GiftType);

  return (
    <div style={{width: isMobile ? '100vw' : '900px', height: '100%'}} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
      <Row width='100%' style={{position: 'relative', margin: '10px'}} >
        <GiftPicture
          isMobile={isMobile}
          onHover={onHover}
          onModify={onModify}
          giftType={newGift?.types?.[0] || 'other' as typeOfGift}
          updateGiftType={ (newType: typeOfGift) => setNewGift({...newGift, types: [newType]})}
        />
      <Card
        elevation={onHover ? 5 : 1}
        style={{width: isMobile ? 'calc(100vw - 20px)' : '900px', paddingTop: '0', margin: isMobile ? '' : '0 0 0 50px'}}
      >
        <Accordion onChange={() => isOwned && setOnModify(!onModify)}>
          <AccordionSummary
            expandIcon={isOwned ? <CreateOutlined /> : <ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Column vertical='space-around' style={{paddingLeft: '60px'}}>
              { !isOwned && gift && previewReservation(gift, userName).map(reservation => (
              <Chip
                style={{ backgroundColor: 'green', color: 'white', zIndex: 2}}
                label={reservation}
                variant="outlined"
              />))
              }
            </Column>
            <Row
              horizontal='space-between'
              vertical='center'
              height={ '76px'}
              width='100%'
              style={{paddingLeft: '30px'}}
            >
              <Typography
                sx={{
                  width: '60%',
                  color: isOwned && !gift ? 'green' : undefined,
                }}
                fontStyle={isMobile ? {...mobileFont} : undefined}
              >
                {isOwned && !gift ? 'Nouveau Cadeau' : gift?.name }
              </Typography>
              <Typography 
                sx={{color: isOwned && !gift ? 'darkgreen' : 'grey'}}
                fontStyle={isMobile ? { ...mobileFont }: undefined}
              >
                {isOwned && !isMobile && !gift ? 'Ajouter une nouvelle idee cadeau' : `~${gift?.price === undefined ? '?' : gift.price.average}€`}
              </Typography>
              { !isMobile ? 
              <Row width='160px' horizontal='end'>
                {onModify && <>
                  <Button>
                    <SaveAltOutlined
                      onClick={async () => {
                        if (creation) {
                          createGift(newGift);
                          setNewGift({
                            name: '',
                            price: {average: 0, max: 0, min: 0},
                            types:['other' as typeOfGift]
                          });
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
                  { gift && <Button>
                    <DeleteOutlined onClick={() => {if(gift) deleteGift(gift); setOnModify(false)}}  color='action' titleAccess={'Delete'}/>
                  </Button>}
                </>}
              </Row>
              : 
              <Column horizontal='end'>
                {onModify && <>
                  <Button>
                    <SaveAltOutlined
                      onClick={async () => {
                        if (creation) {
                          createGift(newGift);
                          setNewGift({
                            name: '',
                            price: {average: 0, max: 0, min: 0},
                            types:['other' as typeOfGift]
                          });
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
                  { gift && <Button>
                    <DeleteOutlined onClick={() => {if(gift) deleteGift(gift); setOnModify(false)}}  color='action' titleAccess={'Delete'}/>
                  </Button>}
                </>}
              </Column>
              }
              
            </Row>
          </AccordionSummary>
          <AccordionDetails style={{paddingTop: 0}}>
            <CardContent style={ isMobile ? {padding: '10px 0px 10px 10px'} : { paddingTop: 0, paddingLeft: '50px' }} >
              <Column width={'100%'} height={'100%'} horizontal='center'>
                { !isOwned && gift &&
                <ResevationPanel
                  isMobile={isMobile}
                  userName={userName}
                  gift={gift}
                  onReserve={onReserve}
                />
                }
                <GiftInfos
                  isOwned={isOwned}
                  isMobile={isMobile}
                  gift={gift}
                  newGift={newGift}
                  setNewGift={setNewGift}
                />
              </Column>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Row>
  </div>)
}