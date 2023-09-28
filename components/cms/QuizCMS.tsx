import { useState, ChangeEvent } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Question, Answer } from "@/data/Quiz";
import style from "@/styles/cms/QuizCMS.module.css";
import postContent from "@/src/postContent"

type QuizCMSProps = {
  quiz: Question[];
  setQuiz(quiz: Question[]): void;
  authToken: string;
};

export default function QuizCMS(props: QuizCMSProps) {
  const [newQuestion, setNewQuestion] = useState<Question>({
    question: "",
    answers: getEmptyAnswers(4),
    id: "",
  });
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);

  function handleQuestionOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewQuestion({
      ...newQuestion,
      question: event.target.value,
    });
  }

  function getEmptyAnswers(num: number) {
    const answers = [];
    for (let i = 0; i < num; i++) {
      answers.push({
        answer: "",
        correct: false,
        id: String.fromCharCode(97 + i),
      });
    }
    return answers;
  }

  function handleSelectOnChange(event: SelectChangeEvent<number>) {
    setNumberOfAnswers(event.target.value as number);
    setNewQuestion({
      ...newQuestion,
      answers: getEmptyAnswers(event.target.value as number),
    });
  }

  function handleAnswerTextFieldOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) {
    setNewQuestion({
      ...newQuestion,
      answers: newQuestion.answers.map((currentAnswer, currentAnswerIndex) => {
        if (currentAnswerIndex == index) {
          return {
            answer: event.target.value,
            correct: currentAnswer.correct,
            id: currentAnswer.id,
          };
        } else {
          return {
            answer: currentAnswer.answer,
            correct: currentAnswer.correct,
            id: currentAnswer.id,
          };
        }
      }),
    });
  }

  function handleAnswerCheckboxOnChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setNewQuestion({
      ...newQuestion,
      answers: newQuestion.answers.map((currentAnswer, currentAnswerIndex) => {
        if (currentAnswerIndex == index) {
          return {
            answer: currentAnswer.answer,
            correct: event.target.checked,
            id: currentAnswer.id,
          };
        } else {
          return {
            answer: currentAnswer.answer,
            correct: currentAnswer.correct,
            id: currentAnswer.id,
          };
        }
      }),
    });
  }

  function cancelEdit() {
    setNewQuestion({ ...newQuestion, id: "" });
  }

  async function submitQuestion() {
    let correct = false;
    // Check at least one marked as correct.
    newQuestion.answers.forEach(
      (answer) => (correct = correct || answer.correct)
    );
    // Check question is not empty.
    correct = correct && newQuestion.question != "";
    // Check answers are not empty.
    newQuestion.answers.forEach(
      (answer) => (correct = correct && answer.answer != "")
    );
    if (correct) {
     postContent("POST", "quiz", newQuestion.id, JSON.stringify(newQuestion), props.authToken);
     window.location.reload();
    }
  }

  function handleEditClick(question: Question) {
    setNumberOfAnswers(question.answers.length);
    setNewQuestion({
      question: question.question,
      answers: question.answers,
      id: question.id,
    });
    document.getElementById("create-new-question")?.scrollIntoView();
  }

  async function handleDeleteClick(id: string) {
    postContent("DELETE", "quiz", newQuestion.id, "", props.authToken);
    props.setQuiz(props.quiz.filter((question) => question.id != id));
  }

  const answerComponents = [];
  for (let i = 0; i < numberOfAnswers; i++) {
    answerComponents.push(
      <div className={style["form-field"]} key={i}>
        <TextField
          required
          fullWidth
          label={`Answer #${i + 1}`}
          variant="outlined"
          value={newQuestion.answers[i].answer}
          onChange={(event) => handleAnswerTextFieldOnChange(event, i)}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={newQuestion.answers[i].correct}
                onChange={(event) => handleAnswerCheckboxOnChange(event, i)}
              />
            }
            label="Correct"
          />
        </FormGroup>
      </div>
    );
  }

  return (
    <div>
      <form>
        <div id="create-new-question" className={style["subheading"]}>
          <h1>
            {newQuestion.id === ""
              ? "Create New Question"
              : `Editing question with ID:: ${newQuestion.id}`}
          </h1>
        </div>

        <div className={style["form-field"]}>
          <TextField
            required
            fullWidth
            label="Question"
            name="question"
            variant="outlined"
            value={newQuestion.question}
            onChange={(event) => handleQuestionOnChange(event)}
          />
        </div>

        <FormControl fullWidth>
          <InputLabel>Number of Answers</InputLabel>
          <Select
            label="Number of Answers"
            name="number-of-answers"
            defaultValue={4}
            value={numberOfAnswers}
            onChange={(event, child) => handleSelectOnChange(event)}
          >
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={6}>Six</MenuItem>
          </Select>
        </FormControl>

        <div className={style["information-text"]}>
          <p>At least one answer must be marked as correct!</p>
        </div>

        {answerComponents}

        <div className={style["form-buttons"]}>
          {newQuestion.id !== "" ? (
            <Button
              variant="outlined"
              endIcon={<ClearIcon />}
              onClick={cancelEdit}
            >
              Cancel Edit
            </Button>
          ) : (
            ""
          )}

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submitQuestion}
          >
            Submit
          </Button>
        </div>
      </form>

      <div className={style["subheading"]}>
        <h1>Edit Existing Questions</h1>
      </div>

      <div className={style["question-list"]}>
        {props.quiz.map((question) => (
          <div className={style["question-list-item"]} key={question.id}>
            <div className={style["question-list-question"]}>
              <h2>{question.question}</h2>
              <div className={style["answers"]}>
                {question.answers.map((answer) => (
                  <div
                    className={
                      style["answer"] +
                      " " +
                      (answer.correct
                        ? style["answer-correct"]
                        : style["answer-incorrect"])
                    }
                    key={answer.id}
                  >
                    {answer.answer}
                  </div>
                ))}
              </div>
            </div>

            <div className={style["question-list-buttons-div"]}>
              <Button
                className={style["question-list-button"]}
                variant="outlined"
                color="primary"
                endIcon={<EditIcon />}
                type="button"
                onClick={() => handleEditClick(question)}
              >
                Edit
              </Button>

              <div className={style["question-list-id"]}>ID: {question.id}</div>

              <Button
                className={style["question-list-button"]}
                variant="contained"
                color="error"
                endIcon={<CancelIcon />}
                type="button"
                onClick={() => handleDeleteClick(question.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
