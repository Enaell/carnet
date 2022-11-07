import { Button, TextField } from "@mui/material"
import { Column, Row } from "../common/Flexbox"
import { GiftType } from "../common/types"
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

export const GiftInfos = ({
  isOwned,
  gift,
  newGift,
  setNewGift,
  isMobile
}: {
  isOwned: boolean,
  isMobile: boolean,
  gift?: GiftType,
  newGift? :GiftType,
  setNewGift: (value: React.SetStateAction<GiftType>) => void,
}) => {
  return (
    <Column vertical='space-between' width={'100%'}>
      <TextField
        style={{paddingBottom: '20px'}}
        required
        fullWidth
        InputProps={isOwned ? undefined : {
          readOnly: true,
        }}
        label='Nom'
        error={!newGift?.name}
        value={newGift?.name}
        onChange={e=> setNewGift({...newGift, name: e.target.value})}
      />
      <TextField
        style={{paddingBottom: '20px'}}
        fullWidth
        InputProps={isOwned ? undefined : {
          readOnly: true,
        }}
        label='Description'
        multiline
        value={newGift?.description}
        onChange={e=> setNewGift({...newGift, description: e.target.value})}
      />
      <Row>
        <TextField
          style={{paddingBottom: '20px'}}
          fullWidth
          InputProps={isOwned ? undefined : {
            readOnly: true,
          }}
          label='Lien'
          value={newGift?.link}
          onChange={e=> setNewGift({...newGift, link: e.target.value})}
        />
        <Button>
          <ContentCopyOutlinedIcon onClick={() => newGift?.link && navigator.clipboard.writeText(newGift.link)}/>
        </Button>
        <Button>
          <LaunchOutlinedIcon onClick={() => newGift?.link && window?.open(newGift.link, '_blank')?.focus()} />
        </Button>
      </Row>
      <Row horizontal='space-around'>
        {(gift?.price?.average || isOwned) && <TextField
          InputProps={isOwned ? undefined : {
            readOnly: true,
          }}
          style={{width: isMobile ? '100px' : '150px'}}
          type='number'
          label='Prix moyen'
          value={newGift?.price?.average}
          onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift?.price, average: e.target.value as number}})}
        />}
        {(gift?.price?.max || isOwned) && <TextField
          InputProps={isOwned ? undefined : {
            readOnly: true,
          }}
          style={{width: isMobile ? '100px' : '150px'}}
          type='number'
          label='Prix Max'
          value={newGift?.price?.max}
          onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift?.price, max: e.target.value as number}})}
        />}
        {(gift?.price?.min || isOwned) && <TextField
          InputProps={isOwned ? undefined : {
            readOnly: true,
          }}
          style={{width: isMobile ? '100px' : '150px'}}
          type='number'
          label='Prix Min'
          value={newGift?.price?.min}
          onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift?.price, min: e.target.value as number}})}
        />}
      </Row>
    </Column>
  );
}