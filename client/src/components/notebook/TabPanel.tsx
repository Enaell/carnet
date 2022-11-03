import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Column, Row } from "../common/Flexbox";
import { GiftType } from "../common/types";
import { GiftCard } from "../gifts/GiftCard";
import { ResevationPanel } from "./ReservationPanel";

type TabPanelProps = {
  gifts?: GiftType[],
  userName: string,
  isOwned: boolean,
  index: any;
  value: any;
  createGift: (gift: GiftType) => Promise<void>,
  updateGift: (gift: GiftType) => Promise<void>,
  deleteGift: (gift: GiftType) => Promise<void>,
  onReserve: (gift: GiftType) => Promise<void>
}

export const TabPanel = ({
  gifts,
  userName,
  isOwned,
  value,
  index,
  updateGift,
  createGift,
  deleteGift,
  onReserve,
  ...other
}: TabPanelProps) => {
  const { isMobile } = useDeviceDetect();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Column width='100%' horizontal='center' >
        <Row>
          {isOwned && <GiftCard
            isOwned={isOwned}
            creation
            createGift={createGift}
            updateGift={updateGift}
            deleteGift={deleteGift}
          />}
        </Row>
        {value === index && (gifts?.map((gift, i) => (
          <Row key={`${gift._id}${i}`}>
            <GiftCard
              isOwned={isOwned}
              key={gift.name}
              gift={gift}
              createGift={createGift} 
              updateGift={updateGift}
              deleteGift={deleteGift}
            />
            { !isOwned && <ResevationPanel userName={userName} gift={gift} onReserve={onReserve}/>}
          </Row>)
          )
        )}
      </Column>
    </div>
  );
}

