import { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Fact } from "@/data/Facts";
import style from "@/styles/cms/FactCMS.module.css";
import postContent from "@/src/postContent"

type FactCMSProps = {
  facts: Fact[];
  setFacts(facts: Fact[]): void;
  authToken: string;
};

export default function FactCMS(props: FactCMSProps) {
  const [newFact, setNewFact] = useState({ title: "", content: "", id: "" });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewFact({ ...newFact, [event.target.name]: event.target.value });
  }

  function cancelEdit() {
    setNewFact({ ...newFact, id: "" });
  }

  async function submitFact() {
    if (newFact.title != "" && newFact.content != "") {
     postContent("POST", "facts", newFact.id, JSON.stringify(newFact), props.authToken);
     window.location.reload();
    }
  }

  function handleEditClick(fact: Fact) {
    setNewFact({ title: fact.title, content: fact.content, id: fact.id });
    document.getElementById("create-new-fact")?.scrollIntoView();
  }

  async function handleDeleteClick(id: string) {
    postContent("DELETE", "facts", newFact.id, "", props.authToken);
    props.setFacts(props.facts.filter((fact) => fact.id != id));
  }

  return (
    <div>
      <form>
        <div id="create-new-fact" className={style["subheading"]}>
          <h1>
            {newFact.id === ""
              ? "Create New Fact"
              : `Editing fact with ID: ${newFact.id}`}
          </h1>
        </div>

        <div className={style["markdown-guide"]}>
          <ReactMarkdown>
            You can use markdown to style your content. Please see
            [here](https://commonmark.org/help/) for a guide on markdown. To
            create an empty line, use *&amp;nbsp\;*.
          </ReactMarkdown>
        </div>

        <div className={style["subheading"]}>
          <h3>Preview</h3>
        </div>

        <div className={style["form-fact-preview"]}>
          <div>
            <h2>
              <ReactMarkdown>{newFact.title}</ReactMarkdown>
            </h2>
          </div>
          <div>
            <ReactMarkdown>{newFact.content}</ReactMarkdown>
          </div>
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            label="Fact Title"
            name="title"
            variant="outlined"
            value={newFact.title}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            multiline
            label="Fact Content"
            name="content"
            variant="outlined"
            value={newFact.content}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-buttons"]}>
          {newFact.id !== "" ? (
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
            onClick={submitFact}
          >
            Submit
          </Button>
        </div>
      </form>

      <div className={style["subheading"]}>
        <h1>Edit Existing Facts</h1>
      </div>

      <div className={style["fact-list"]}>
        {props.facts.map((fact) => (
          <div className={style["fact-list-item"]} key={fact.id}>
            <div className={style["fact-list-fact"]}>
              <div>
                <h2>
                  <ReactMarkdown>{fact.title}</ReactMarkdown>
                </h2>
              </div>
              <div>
                <ReactMarkdown>{fact.content}</ReactMarkdown>
              </div>
            </div>

            <div className={style["fact-list-buttons-div"]}>
              <Button
                className={style["fact-list-button"]}
                variant="outlined"
                color="primary"
                endIcon={<EditIcon />}
                type="button"
                onClick={() => handleEditClick(fact)}
              >
                Edit
              </Button>

              <div className={style["fact-list-id"]}>ID: {fact.id}</div>

              <Button
                className={style["fact-list-button"]}
                variant="contained"
                color="error"
                endIcon={<CancelIcon />}
                type="button"
                onClick={() => handleDeleteClick(fact.id)}
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
