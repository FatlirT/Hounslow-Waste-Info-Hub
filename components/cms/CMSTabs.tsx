import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import FactCMS from "./FactCMS";
import { Fact } from "@/data/Facts";
import QuizCMS from "./QuizCMS";
import { Question } from "@/data/Quiz";
import EventCMS from "./EventCMS";
import { Event } from "@/data/Events";
import RecyclingServiceCMS from "./RecyclingServiceCMS";
import { RecyclingService } from "@/data/RecyclingServices";
import DumpedRubbishCMS from "./DumpedRubbishCMS";
import { DumpedRubbishInfo } from "@/data/DumpedRubbishInfo";

type CMSTabsProps = {
  authToken: string;
  facts: Fact[];
  setFacts(facts: Fact[]): void;
  quiz: Question[];
  setQuiz(quiz: Question[]): void;
  events: Event[];
  setEvents(events: Event[]): void;
  houseRecyclingServices: RecyclingService[];
  setHouseRecyclingServices(houseRecyclingServices: RecyclingService[]): void;
  flatRecyclingServices: RecyclingService[];
  setFlatRecyclingServices(flatRecyclingServices: RecyclingService[]): void;
  dumpedRubbishInfo: DumpedRubbishInfo;
  setDumpedRubbishInfo(dumpedRubbishInfo: DumpedRubbishInfo): void;
};

export default function CMSTabs(props: CMSTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={(event, value) => handleChange(value)}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Category Tabs"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Facts" {...a11yProps(0)} />
          <Tab label="Questions" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          <Tab label="Recycling Services (House)" {...a11yProps(3)} />
          <Tab label="Recycling Services (Flat)" {...a11yProps(4)} />
          <Tab label="Report Dumped Rubbish" {...a11yProps(5)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <FactCMS
          authToken={props.authToken}
          facts={props.facts}
          setFacts={props.setFacts}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <QuizCMS
          authToken={props.authToken}
          quiz={props.quiz}
          setQuiz={props.setQuiz}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <EventCMS
          authToken={props.authToken}
          events={props.events}
          setEvents={props.setEvents}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <RecyclingServiceCMS
          authToken={props.authToken}
          recyclingServices={props.houseRecyclingServices}
          setRecyclingServices={props.setHouseRecyclingServices}
        />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <RecyclingServiceCMS
          authToken={props.authToken}
          recyclingServices={props.flatRecyclingServices}
          setRecyclingServices={props.setFlatRecyclingServices}
        />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <DumpedRubbishCMS
          authToken={props.authToken}
          dumpedRubbishInfo={props.dumpedRubbishInfo}
          setDumpedRubbishInfo={props.setDumpedRubbishInfo}
        />
      </TabPanel>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
