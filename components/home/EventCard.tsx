import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Event } from "@/data/Events";
import style from "@/styles/home/EventCard.module.css";

type EventCardsProps = {
  event: Event;
};

export default function EventCard(props: EventCardsProps) {
  const [isFlipped, setFlipped] = useState(false);

  return (
    <div
      className={style["event-card-container"]}
      onClick={() => setFlipped(!isFlipped)}
    >
      <div
        className={
          style["event-card"] +
          (isFlipped ? " " + style["event-card-flipped"] : "")
        }
      >
        <div className={style["event-card-front"]}>
          <div>
            <img
              className={style["event-card-image"]}
              src={props.event.image}
              alt=""
            />
          </div>
          <div>
            <h2>{props.event.title}</h2>
            <h3>
              {props.event.startDate}
              {props.event.startDate != props.event.endDate
                ? ` - ${props.event.endDate}`
                : ""}
            </h3>
          </div>
        </div>
        <div className={style["event-card-back"]}>
          <ReactMarkdown>{props.event.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
