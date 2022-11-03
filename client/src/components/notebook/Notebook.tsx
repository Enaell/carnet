import { Tabs, Tab, Button } from "@mui/material";
import { useState } from "react";
import { useNoteBook } from "../../hooks/useNotebook";
import { family } from "../../utils/utils";
import { TabPanel } from "./TabPanel";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import useDeviceDetect from "../../hooks/useDeviceDetect";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const Notebook = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const {user, giftsByPerson, createGift, updateGift, deleteGift, onReserve} = useNoteBook();

  const [onTabHeader, setOnTabHeader] = useState(true);

  const { isMobile } = useDeviceDetect();

  return (
    <>
    {!isMobile || onTabHeader
      ? <Tabs
        orientation="vertical"
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        style={{height: "100vh"}}
      >
        { family.map((member, index) => <Tab key={member} label={`${member}`} {...a11yProps(index)}/> )}
      </Tabs>
      : <Button color='primary' variant='contained' style={{ minWidth: 0, position: 'fixed', zIndex: '99', padding: '6px', left: 0}}>
          <MenuOutlinedIcon onClick={() => setOnTabHeader(true)} />
        </Button>
    }

    <div style={{height: '100vh', overflow: 'auto', width: '100%'}} onClick={() => setOnTabHeader(false)}>
      {family.map((member, index) => {
        return(
          <TabPanel
            isOwned={user === member}
            userName={member}
            gifts={giftsByPerson ? giftsByPerson[member] : []}
            key={member}
            value={value}
            index={index}
            createGift={createGift}
            updateGift={updateGift}
            deleteGift={deleteGift}
            onReserve={onReserve}
            {...a11yProps(index)}
          />
          )
        }
      )}
    </div>

    </>

  );
}
