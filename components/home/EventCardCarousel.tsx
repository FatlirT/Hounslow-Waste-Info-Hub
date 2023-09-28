import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/data/Events";
import style from "@/styles/home/EventCardCarousel.module.css";
import buttonStyle from "@/styles/home/Button.module.css";

type EventCardCarouselProps = {
  events: Event[];
};

export default function EventCardCarousel(props: EventCardCarouselProps) {
  const [isDisabledPrevious, setDisabledPrevious] = useState(true);
  const [isDisabledNext, setDisabledNext] = useState(false);
  const [range, setRange] = useState([0, 3]);
  const displayedEvents = props.events.slice(...range);

  useEffect(() => {
    if (range[0] == 0) {
      setDisabledPrevious(true);
    } else {
      setDisabledPrevious(false);
    }
    if (range[1] >= props.events.length) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
  }, [range, props.events.length]);

  return (
    <div className={style["event-card-carousel-container"]}>
      <div className={style["event-card-carousel-button-div"]}>
        <button
          className={
            buttonStyle["button"] + " " + style["event-card-carousel-button"]
          }
          type="button"
          disabled={isDisabledPrevious}
          onClick={() => setRange(range.map((x) => x - 1))}
        >
          Previous
        </button>
      </div>
      <div className={style["event-card-carousel"]}>
        {displayedEvents.map((event) => (
          <EventCard key={props.events.indexOf(event)} event={event} />
        ))}
      </div>
      <div className={style["event-card-carousel-button-div"]}>
        <button
          className={
            buttonStyle["button"] + " " + style["event-card-carousel-button"]
          }
          type="button"
          disabled={isDisabledNext}
          onClick={() => setRange(range.map((x) => x + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
