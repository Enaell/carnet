import { FormControlLabel, Switch, Box, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { mobileFont } from '../../utils/utils';
import { Row } from '../common/Flexbox';
import { GiftType } from '../common/types';


export const ResevationPanel = ({ isMobile, userName, gift, onReserve}: {
  isMobile: boolean,
  userName: string,
  gift: GiftType,
  onReserve: (gift: GiftType) => Promise<void>
}) => {

  const [isReserved, setIsReserved] = useState(gift.reservations?.some(reservation => reservation.userName === userName))

  return (
    <Row style={{border: 'dashed green', borderRadius: '5px', padding:'20px 0', marginBottom: '30px'}} horizontal='space-around' width='100%' >
      <Row wrap width={isMobile ? '60%' : '500px'} horizontal='space-around' vertical='center'>
        <Typography fontStyle={isMobile ? {...mobileFont} : undefined}> Participants : </Typography>
        <Row wrap width={isMobile ? '100%' : '375px'} >
          {gift.reservations?.map((reservation, index) => (
            <Box key={`${reservation.userName}${index}`} padding='0 10px' >
              <Chip
                style={ reservation.userName === userName ? { backgroundColor: 'green', color: 'white'} : undefined}
                label={reservation.userName}
                variant="outlined"
              />
            </Box>
          ))}
        </Row>
      </Row>
      <FormControlLabel
          componentsProps={isMobile ? {typography: {fontStyle:{...mobileFont}}} : undefined}
          labelPlacement={isMobile ? 'top' : 'start'}
          style={isMobile ? {marginLeft: 0} : undefined}
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
          label={'Je participe !'}
      />
    </Row>
    // </div>
  )
}
