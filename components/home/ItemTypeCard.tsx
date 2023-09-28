import { useState } from "react";
import style from "@/styles/home/ItemTypeCard.module.css";

type ItemTypeCardProps = {
  frontTitle: string;
  frontImage: string;
  backTitle: string;
  backImage: string;
  serviceID: string;
  openAccordion(id: string): void;
};

export default function ItemTypeCard(props: ItemTypeCardProps) {
  const [isFlipped, setFlipped] = useState(false);

  async function jumpToAccordion(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    event.stopPropagation();
    props.openAccordion(id);
    await new Promise((r) => setTimeout(r, 200));
    document.getElementById(id)?.scrollIntoView();
  }

  return (
    <div
      className={style["item-type-card-container"]}
      onClick={() => setFlipped(!isFlipped)}
    >
      <div
        className={
          style["item-type-card"] +
          (isFlipped ? " " + style["item-type-card-flipped"] : "")
        }
      >
        <div className={style["item-type-card-front"]}>
          <h2>{props.frontTitle}</h2>
          <img
            className={style["item-type-card-image"]}
            src={props.frontImage}
            alt={props.frontTitle}
          />
        </div>
        <div className={style["item-type-card-back"]}>
          <div>
            <h3 className={style["item-type-card-back-title"]}>
              {props.backTitle}
            </h3>
            <button
              className={style["item-type-card-button"]}
              type="button"
              onClick={(event) => jumpToAccordion(event, props.serviceID)}
            >
              Click me for more info!
            </button>
          </div>
          <img
            className={style["item-type-card-image"]}
            src={props.backImage}
            alt={props.backTitle}
          />
        </div>
      </div>
    </div>
  );
}
