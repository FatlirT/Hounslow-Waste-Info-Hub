import { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { DumpedRubbishInfo } from "@/data/DumpedRubbishInfo";
import style from "@/styles/cms/DumpedRubbishCMS.module.css";
import postContent from "@/src/postContent"

type DumpedRubbishCMSProps = {
  dumpedRubbishInfo: DumpedRubbishInfo;
  setDumpedRubbishInfo(dumpedRubbishInfo: DumpedRubbishInfo): void;
  authToken: string;
};

export default function DumpedRubbishCMS(props: DumpedRubbishCMSProps) {
  const [dumpedRubbishInfo, setDumpedRubbishInfo] = useState(
    props.dumpedRubbishInfo
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDumpedRubbishInfo({
      ...dumpedRubbishInfo,
      [event.target.name]: event.target.value,
    });
  }

  async function submitInfo() {
      postContent("POST", "dumpedRubbish", "dumpedRubbish", JSON.stringify(dumpedRubbishInfo), props.authToken);
      window.location.reload();
  }

  return (
    <div>
      <form>
        <div className={style["subheading"]}>
          <h1>Edit Dumped Rubbish Info</h1>
        </div>

        <div className={style["markdown-guide"]}>
          <ReactMarkdown>
            You can use markdown to style your content. Please see
            [here](https://commonmark.org/help/) for a guide on markdown. To
            create an empty line, use *&amp;nbsp\;*.
          </ReactMarkdown>
        </div>

        <div className={style["subheading"]}>
          <h3>Content Preview</h3>
        </div>

        <div className={style["form-content-preview"]}>
          <ReactMarkdown>{dumpedRubbishInfo.content}</ReactMarkdown>
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            multiline
            label="Content"
            name="content"
            variant="outlined"
            value={dumpedRubbishInfo.content}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            label="Report Dumped Rubbish On Public Land"
            name="reportPublicForm"
            variant="outlined"
            value={dumpedRubbishInfo.reportPublicForm}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            label="Report Dumped Rubbish On Private Land"
            name="reportPrivateForm"
            variant="outlined"
            value={dumpedRubbishInfo.reportPrivateForm}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            label="Pay Penalty Notice"
            name="payPenaltyLink"
            variant="outlined"
            value={dumpedRubbishInfo.payPenaltyLink}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-submit-button"]}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submitInfo}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
