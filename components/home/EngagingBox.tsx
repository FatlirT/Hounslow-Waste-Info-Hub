import React, { useState, useEffect } from "react";
import FactBox from "./FactBox";
import { Fact } from "@/data/Facts";
import QuizBox from "./QuizBox";
import { Question } from "@/data/Quiz";
import style from "@/styles/home/EngagingBox.module.css";

type EngagingBoxProps = {
  showFlatVersion: boolean;
  facts: Fact[];
  quiz: Question[];
};

export default function EngagingBox(props: EngagingBoxProps) {
  const [randNum, setRandNum] = useState<number>();

  useEffect(() => {
    if (props.showFlatVersion) {
      setRandNum(0);
    } else {
      setRandNum(Math.floor(Math.random() * 2));
    }
  }, [props.showFlatVersion]);

  return (
    <div className={style["engaging-box-wrapper"]}>
      {randNum == 0 && <FactBox facts={props.facts} />}
      {randNum == 1 && <QuizBox quiz={props.quiz} />}
    </div>
  );
}
