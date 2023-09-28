import { useState, ChangeEvent, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Event } from "@/data/Events";
import postImage from "@/src/postImage";
import postContent from "@/src/postContent"
import style from "@/styles/cms/EventCMS.module.css";

type EventCMSProps = {
  events: Event[];
  setEvents(events: Event[]): void;
  authToken: string;
};

export default function EventCMS(props: EventCMSProps) {
  const [newEvent, setNewEvent] = useState({
    image: "",
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    id: "",
  });
  const [readyToSend, setReadyToSend] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  // This hook is called whenever the image file changes. It creates the
  // temporary URL for the image.
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setNewEvent({ ...newEvent, image: objectUrl });
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setNewEvent({ ...newEvent, image: "" });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  // This hook is called whenever the the user clicks the submit button. It
  // waits until the state has updated and it is ready to send and then sends
  // the data.
  useEffect(() => {
    async function sendData() {
      postContent("POST", "events", newEvent.id, JSON.stringify(newEvent), props.authToken);
      window.location.reload();
    }

    if (readyToSend) {
      sendData();
      setReadyToSend(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSend]);

  // This function is called when the user selects a file to upload.
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setImageFile(file);
    } else {
      event.target.value = "";
      setImageFile(undefined);
    }
  };

  function handleRemoveImage() {
    setNewEvent({ ...newEvent, image: "" });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewEvent({ ...newEvent, [event.target.name]: event.target.value });
  }

  function cancelEdit() {
    setNewEvent({ ...newEvent, id: "" });
  }

  async function submitEvent() {
    const imageLink = await postImage(imageFile);
    setNewEvent({ ...newEvent, image: imageLink });
    if (
      newEvent.title != "" &&
      newEvent.startDate != "" &&
      newEvent.endDate != ""
    ) {
      setReadyToSend(true);
    }
  }

  function handleEditClick(event: Event) {
    setNewEvent({
      image: event.image,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      id: event.id,
    });
    document.getElementById("create-new-event")?.scrollIntoView();
  }

  async function handleDeleteClick(id: string) {
    postContent("DELETE", "events", newEvent.id, "", props.authToken);
    props.setEvents(props.events.filter((event) => event.id != id));
 }

  return (
    <div>
      <form>
        <div id="create-new-event" className={style["subheading"]}>
          <h1>
            {newEvent.id === ""
              ? "Create New Event"
              : `Editing event with ID: ${newEvent.id}`}
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

        <div className={style["event-preview-wrapper"]}>
          <div
            className={
              style["event-preview"] + " " + style["event-preview-front"]
            }
          >
            <div>
              <img
                className={style["event-preview-image"]}
                src={newEvent.image}
                alt=""
              />
            </div>
            <div>
              <h2>{newEvent.title}</h2>
              <h3>
                {newEvent.startDate}
                {newEvent.startDate != newEvent.endDate
                  ? ` - ${newEvent.endDate}`
                  : ""}
              </h3>
            </div>
          </div>

          <div
            className={
              style["event-preview"] + " " + style["event-preview-back"]
            }
          >
            <ReactMarkdown>{newEvent.description}</ReactMarkdown>
          </div>
        </div>

        <div className={style["form-image-upload"]}>
          <span>Upload an image for the event here:</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <Button
            size="small"
            variant="outlined"
            endIcon={<ClearIcon />}
            onClick={handleRemoveImage}
          >
            Remove Image
          </Button>
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            required
            fullWidth
            label="Event Title"
            name="title"
            variant="outlined"
            value={newEvent.title}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-date-inputs"]}>
          <div>
            <label htmlFor="start-date">Start date: </label>
            <input
              type="date"
              id="start-date"
              name="startDate"
              value={newEvent.startDate}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label htmlFor="end-date">End date: </label>
            <input
              type="date"
              id="end-date"
              name="endDate"
              value={newEvent.endDate}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className={style["form-text-field"]}>
          <TextField
            multiline
            fullWidth
            label="Event Description"
            name="description"
            variant="outlined"
            value={newEvent.description}
            onChange={handleChange}
          />
        </div>

        <div className={style["form-buttons"]}>
          {newEvent.id !== "" ? (
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
            onClick={submitEvent}
          >
            Submit
          </Button>
        </div>
      </form>

      <div className={style["subheading"]}>
        <h1>Edit Existing Events</h1>
      </div>

      <div className={style["event-list"]}>
        {props.events.map((event) => (
          <div className={style["event-list-item"]} key={event.id}>
            <div className={style["event-preview-wrapper"]}>
              <div
                className={
                  style["event-preview"] + " " + style["event-preview-front"]
                }
              >
                <div>
                  <img
                    className={style["event-preview-image"]}
                    src={event.image}
                    alt=""
                  />
                </div>
                <div>
                  <h2>{event.title}</h2>
                  <h3>
                    {event.startDate}
                    {event.startDate != event.endDate
                      ? ` - ${event.endDate}`
                      : ""}
                  </h3>
                </div>
              </div>

              <div
                className={
                  style["event-preview"] + " " + style["event-preview-back"]
                }
              >
                <ReactMarkdown>{event.description}</ReactMarkdown>
              </div>
            </div>

            <div className={style["event-list-buttons-div"]}>
              <Button
                className={style["event-list-button"]}
                variant="outlined"
                color="primary"
                endIcon={<EditIcon />}
                type="button"
                onClick={() => handleEditClick(event)}
              >
                Edit
              </Button>

              <div className={style["event-list-id"]}>ID: {event.id}</div>

              <Button
                className={style["event-list-button"]}
                variant="contained"
                color="error"
                endIcon={<CancelIcon />}
                type="button"
                onClick={() => handleDeleteClick(event.id)}
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
