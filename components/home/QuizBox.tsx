import React, { useState } from "react";
import { Question } from "@/data/Quiz";
import style from "@/styles/home/QuizBox.module.css";

type QuizBoxProps = {
  quiz: Question[];
};

export default function QuizBox(props: QuizBoxProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    props.quiz[Math.floor(Math.random() * props.quiz.length)]
  );
  const [isAnswerSelected, setAnswerSelected] = useState(false);

  const handleAnswerClick = async () => {
    if (!isAnswerSelected) {
      setAnswerSelected(true);
      await new Promise((r) => setTimeout(r, 10000));
      setAnswerSelected(false);
      setCurrentQuestion(
        props.quiz[Math.floor(Math.random() * props.quiz.length)]
      );
    }
  };

  return (
    <div className={style["question-box"]}>
      <h2>{currentQuestion.question}</h2>
      <div className={style["question-box-answers"]}>
        {currentQuestion.answers.map((answer) => (
          <button
            key={currentQuestion.answers.indexOf(answer)}
            className={
              style["answer-button"] +
              (isAnswerSelected
                ? answer.correct
                  ? " " + style["border-correct"]
                  : " " + style["border-incorrect"]
                : "")
            }
            onClick={() => handleAnswerClick()}
          >
            {answer.answer}
          </button>
        ))}
      </div>
    </div>
  );
}
