import { FormControlLabel, Switch, Box } from '@mui/material';
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

  const [onHover, setOnHover] = useState(false);

  return (
    <div onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>

    <Column horizontal='start' width= {isMobile ? '100%' : '135px'}>
       { (onHover || isMobile || !gift.reservations || !gift.reservations.length) && <FormControlLabel
          labelPlacement="top"
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
      />}
      <Row wrap width='100%' horizontal='start' style={{marginLeft: '10px'}}>
        {gift.reservations?.map((reservation, index) => (
          <Box key={`${reservation.userName}${index}`} >
            {isMobile ? getForMobileName(reservation.userName) : reservation.userName}
          </Box>
        ))}
      </Row>
    </Column>
    </div>
  )
}
