import { FormControlLabel, Switch, Box, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { getForMobileName } from '../../utils/utils';
import { Column, Row } from '../common/Flexbox';
import { GiftType } from '../common/types';


export const ResevationPanel = ({ userName, gift, onReserve}: {
  userName: string,
  gift: GiftType,
  onReserve: (gift: GiftType) => Promise<void>
}) => {
  const { isMobile } = useDeviceDetect();

  const [isReserved, setIsReserved] = useState(gift.reservations?.some(reservation => reservation.userName === userName))

  return (
    // <div onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>

    <Row style={{border: 'dashed green', borderRadius: '5px', padding:'20px 0', marginBottom: '30px'}} horizontal='space-around' width='100%' >
      <Row wrap width='500px' horizontal='space-between' vertical='center'>
        <Typography> Participants : </Typography>
        <Row width='375px' >
          {gift.reservations?.map((reservation, index) => (
            <Box key={`${reservation.userName}${index}`} padding='0 10px' >
              <Chip label={reservation.userName} variant="outlined" />
            </Box>
          ))}
        </Row>
      </Row>
      <FormControlLabel
          labelPlacement='start'
          control={<Switch 
            color='primary'
            checked={isReserved} 
            onChange={() => {
              if (isReserved) {
                onReserve({...gift, reservations: gift.reservations?.filter(resa => resa.userName !== userName)})
                setIsReserved(false);
              }
              else {
                onReserve({...gift, reservations: gift.reservations ? [...gift.reservations, {userName}] : [{userName}]})
                setIsReserved(true);
              }
            }} 
            name='Je participe !'
          />}
          style={isMobile ? {marginLeft: '6px'} : undefined}
        label={isMobile ? '' : 'Je participe !'}
      />
    </Row>
    // </div>
  )
}
