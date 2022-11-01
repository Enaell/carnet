import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useNoteBook } from "../../hooks/useNotebook";
import { family } from "../../utils/utils";
import { TabPanel } from "./TabPanel";

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

  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
      >
        {family.map((member, index) => <Tab key={member} label={`${member}`} {...a11yProps(index)}/> )}
      </Tabs>

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
      />) }
    )}

    </>

  );
}