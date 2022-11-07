import { Tabs, Tab, Button } from "@mui/material";
import { useState } from "react";
import { useNoteBook } from "../../hooks/useNotebook";
import { family } from "../../utils/utils";
import { TabPanel } from "./TabPanel";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Row } from "../common/Flexbox";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const Notebook = ({isMobile}: {isMobile:boolean}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const {user, giftsByPerson, createGift, updateGift, deleteGift, onReserve} = useNoteBook();

  const [onTabHeader, setOnTabHeader] = useState(true);

  return (<Row >
    {!isMobile || onTabHeader
      ? <Tabs
        orientation="vertical"
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        style={{
          zIndex: 99,
          maxHeight: !isMobile ? 'calc(100vh - 100px)': '100vh',
          position: !isMobile ? 'relative' : 'absolute',
          left: !isMobile ? undefined : 0,
          backgroundColor: 'white',
        }}
      >
        { family.map((member, index) => <Tab key={member} label={`${member}`} {...a11yProps(index)}/> )}
      </Tabs>
      : <Button color='primary' variant='contained' style={{ minWidth: 0, position: 'fixed', zIndex: '99', padding: '6px', left: 0}}>
          <MenuOutlinedIcon onClick={() => setOnTabHeader(true)} />
        </Button>
    }

    <div 
      style={{
        maxHeight: !isMobile ? 'calc(100vh - 100px)': '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: isMobile ? '100%' : '1000px',
        position: isMobile ? 'absolute' : 'relative',
        left: isMobile ? 0 : undefined,
        paddingLeft: isMobile && onTabHeader ? '25px' : undefined
      }}
      onClick={() => setOnTabHeader(false)}
    >
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
  </Row>);
}
