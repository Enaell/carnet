import { useState } from 'react'
import { Column, Row } from '../common/Flexbox'
import { GiftType } from '../common/types';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Card, CardContent, Button, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { typeOfGift } from '../../utils/utils';
import { CreateOutlined, SaveAltOutlined, DeleteOutlined, Close } from '@mui/icons-material';
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
    <div style={{width: isMobile ? '100%' : '900px', height: '100%'}} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
      <Row width='100%' style={{position: 'relative', margin: '10px'}} >
        {!isMobile && 
        <GiftPicture
          isMobile={false}
          onHover={onHover}
          onModify={onModify}
          giftType={newGift?.types?.[0] || 'other' as typeOfGift}
          updateGiftType={ (newType: typeOfGift) => setNewGift({...newGift, types: [newType]})}
        />}
      <Card
        elevation={onHover ? 5 : 1}
        style={{width: isMobile ? '100%' : '900px', paddingTop: '0', margin: isMobile ? '' : '0 0 0 50px'}}
      >
        <Accordion onChange={() => isOwned && setOnModify(!onModify)}>
          <AccordionSummary
            expandIcon={isOwned ? <CreateOutlined /> : <Close />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Row 
              horizontal='space-between'
              vertical='center'
              height='76px'
              width='100%'
              style={{paddingLeft: '90px'}}
            >
              <Typography 
                sx={{
                  width: '50%',
                  color: isOwned && !gift ? 'green' : undefined
                }}
              >
                {isOwned && !gift ? 'Nouveau Cadeau' : gift?.name }
              </Typography>
              <Typography 
                sx={{color: isOwned && !gift ? 'darkgreen' : 'grey'}}
              >
                {isOwned && !gift ? 'Ajouter une nouvelle idee cadeau' : `Prix ~${gift?.price?.average}€`}
              </Typography>
              <Row width='160px'>
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
                  <Button>
                    <DeleteOutlined onClick={() => {if(gift) deleteGift(gift); setOnModify(false)}}  color='action' titleAccess={'Delete'}/>
                  </Button>
                </>}
              </Row>
            </Row>
          </AccordionSummary>
        <AccordionDetails style={{paddingTop: 0}}>
        <CardContent style={ isMobile ? {padding: '10px 0px 10px 10px'} : { paddingTop: 0, paddingLeft: '50px' }} >
          <Column width={'100%'} height={'100%'} horizontal='center'>
            { !isOwned && gift &&
              <ResevationPanel userName={userName} gift={gift} onReserve={onReserve}/>
            }
            <GiftInfos
              isOwned={isOwned}
              isMobile={isMobile}
              gift={gift}
              newGift={newGift}
              setNewGift={setNewGift}
            />
            {/* { isOwned && (onHover || isMobile) && <Column>
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
            </Column>} */}
          </Column>
        </CardContent>
        </AccordionDetails>
          </Accordion>
      </Card>
    </Row>
  </div>)
}