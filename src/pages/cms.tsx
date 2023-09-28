import { useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure(awsExports);
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

import Head from "next/head";
import Header from "@/components/cms/Header";
import CMSTabs from "@/components/cms/CMSTabs";
import Footer from "@/components/Footer";
import style from "@/styles/cms/CMS.module.css";

// Data Types
import { Fact } from "@/data/Facts";
import { Question } from "@/data/Quiz";
import { Event } from "@/data/Events";
import { RecyclingService, service_order } from "@/data/RecyclingServices";
import { DumpedRubbishInfo } from "@/data/DumpedRubbishInfo";
import getContent from "../getContent";

interface Props extends WithAuthenticatorProps {
  data: {
    facts: Fact[];
    quiz: Question[];
    events: Event[];
    recyclingServices: RecyclingService[];
    dumpedRubbishInfo: DumpedRubbishInfo;
  };
}

export default withAuthenticator(function CMS({ data, signOut, user }: Props) {
  const [facts, setFacts] = useState(data.facts);
  const [quiz, setQuiz] = useState(data.quiz);
  const [events, setEvents] = useState(
    data.events.sort(
      (eventA, eventB) =>
        new Date(eventA.startDate).getTime() -
        new Date(eventB.startDate).getTime()
    )
  );
  const [houseRecyclingServices, setHouseRecyclingServices] = useState(
    data.recyclingServices
      .filter((recyclingService) => !recyclingService.forFlats)
      .sort(
        (serviceA, serviceB) =>
          service_order.indexOf(serviceA.id) -
          service_order.indexOf(serviceB.id)
      )
  );
  const [flatRecyclingServices, setFlatRecyclingServices] = useState(
    data.recyclingServices
      .filter((recyclingService) => recyclingService.forFlats)
      .sort(
        (serviceA, serviceB) =>
          service_order.indexOf(serviceA.id) -
          service_order.indexOf(serviceB.id)
      )
  );
  const [dumpedRubbishInfo, setDumpedRubbishInfo] = useState(
    data.dumpedRubbishInfo
  );

  const token = user?.getSignInUserSession()?.getIdToken().getJwtToken();
  const authToken = token !== undefined ? token : "";

  return (
    <>
      <Head>
        <title>HRH - CMS</title>
        <meta name="application-name" content="HRH - CMS" />
        <meta name="description" content="CMS for HRH." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header signOut={signOut} user={user} />

      <div className={style["page-content"]}>
        <CMSTabs
          authToken={authToken}
          facts={facts}
          setFacts={setFacts}
          quiz={quiz}
          setQuiz={setQuiz}
          events={events}
          setEvents={setEvents}
          houseRecyclingServices={houseRecyclingServices}
          setHouseRecyclingServices={setHouseRecyclingServices}
          flatRecyclingServices={flatRecyclingServices}
          setFlatRecyclingServices={setFlatRecyclingServices}
          dumpedRubbishInfo={dumpedRubbishInfo}
          setDumpedRubbishInfo={setDumpedRubbishInfo}
        />
      </div>

      <Footer />
    </>
  );
});

export const getServerSideProps = async () => {
 await getContent()
};
