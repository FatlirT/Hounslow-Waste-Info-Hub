import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { DumpedRubbishInfo } from "@/data/DumpedRubbishInfo";
import style from "@/styles/home/DumpedRubbishSection.module.css";
import buttonStyle from "@/styles/home/Button.module.css";

export default function dumpedRubbishSection(props: DumpedRubbishInfo) {
  return (
    <div className={style["dumped-rubbish-container"]}>
      <div>
        <div className={style["dumped-rubbish-text"]}>
          <ReactMarkdown>{props.content}</ReactMarkdown>
        </div>
        <div className={style["dumped-rubbish-report"]}>
          <h3>Report Dumped Rubbish</h3>
          <a href={props.reportPublicForm}>
            <button className={buttonStyle["button"]}>On public land</button>
          </a>
          <a href={props.reportPrivateForm}>
            <button className={buttonStyle["button"]}>On private land</button>
          </a>
        </div>
        <div className={style["dumped-rubbish-pay"]}>
          <h3>Pay Penalty Notice</h3>
          <p>If you have fixed penalty notice for fly tipping:</p>
          <a href={props.payPenaltyLink}>
            <button className={buttonStyle["button"]}>Pay Here</button>
          </a>
        </div>
      </div>
      <div className={style["dumped-rubbish-image-div"]}>
        <img
          className={style["dumped-rubbish-image"]}
          src="./dumped_rubbish.png"
          alt=""
        />
      </div>
    </div>
  );
}
