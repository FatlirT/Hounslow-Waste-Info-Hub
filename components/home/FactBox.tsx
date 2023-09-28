import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Fact } from "@/data/Facts";
import style from "@/styles/home/FactBox.module.css";

type FactBoxProps = {
  facts: Fact[];
};

export default function FactBox(props: FactBoxProps) {
  const [currentFact, setCurrentFact] = useState<Fact>(
    props.facts[Math.floor(Math.random() * props.facts.length)]
  );

  return (
    <div>
      <h2>
        <ReactMarkdown>{currentFact.title}</ReactMarkdown>
      </h2>
      <br />
      <ReactMarkdown className={style["fact-box-content"]}>
        {currentFact.content}
      </ReactMarkdown>
    </div>
  );
}
