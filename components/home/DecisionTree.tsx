import React, { useEffect, useState } from "react";
import {
  Answer,
  houseQuestions,
  flatQuestions,
} from "@/data/DecisionTreeQuestions";
import { Button } from "antd";
import style from "@/styles/home/DecisionTree.module.css";
import buttonStyle from "@/styles/home/Button.module.css";

type DecisionTreeProps = {
  showFlatVersion: boolean;
  jumpToAccordion(event: React.MouseEvent<HTMLButtonElement>, id: string): void;
};

export default function DecisionTree(props: DecisionTreeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = props.showFlatVersion ? flatQuestions : houseQuestions;

  // This hook is called when the page version changes. It resets the recycling
  // assistant.
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [props.showFlatVersion]);

  function handleAnswerClick(answer: Answer) {
    setCurrentQuestionIndex(answer.followUpQuestion);
  }

  function handleResetClick() {
    setCurrentQuestionIndex(0);
  }

  function handleMoreInfoClick(
    event: React.MouseEvent<HTMLButtonElement>,
    serviceID: string
  ) {
    props.jumpToAccordion(event, serviceID);
  }

  return (
    <div className={style["decision-tree-wrapper"]}>
      <div className={style["decision-tree-title"]}>
        <h2>Find out how to recycle your item here!</h2>
      </div>
      <div className={style["decision-tree"]}>
        <h3>{questions[currentQuestionIndex].question}</h3>
        <div>
          {questions[currentQuestionIndex].answers.map((answer) => (
            <button
              className={
                buttonStyle["button"] + " " + style["decision-tree-button"]
              }
              key={answer.id}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer.answer}
            </button>
          ))}
        </div>
        <button
          className={
            buttonStyle["button"] + " " + style["decision-tree-button"]
          }
          type="button"
          onClick={(event) =>
            handleMoreInfoClick(
              event,
              questions[currentQuestionIndex].serviceID
            )
          }
          hidden={questions[currentQuestionIndex].serviceID == ""}
        >
          Click here for more info!
        </button>
      </div>
      <Button onClick={() => handleResetClick()}>Restart</Button>
    </div>
  );
}
