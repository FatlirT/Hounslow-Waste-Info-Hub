import { RecyclingService } from "@/data/RecyclingServices";
import React, { Ref } from "react";
import ReactMarkdown from "react-markdown";
import style from "@/styles/home/RecyclingServiceAccordion.module.css";
import homeStyle from "@/styles/home/Home.module.css";

export type RecyclingServiceAccordionProps = RecyclingService & {
  id: string;
  isOpen: boolean;
  handleClick: (id: string) => void;
};

export default React.forwardRef<HTMLDivElement, RecyclingServiceAccordionProps>(
  function RecyclingServiceAccordion(props, ref) {
    return (
      <div
        ref={ref}
        id={props.id}
        className={style["recycling-service-accordion-wrapper"]}
        onClick={() => props.handleClick(props.id)}
      >
        <a className={homeStyle["anchor"]} id={props.id + "-anchor"}></a>
        <div className={style["recycling-service-accordion"]}>
          <div>
            <img
              className={style["recycling-service-accordion-item-image"]}
              src={props.itemImage}
              alt=""
            />
            <div className={style["recycling-service-accordion-title"]}>
              <h2>{props.title}</h2>
            </div>
          </div>
          <div className={style["recycling-service-accordion-description"]}>
            <ReactMarkdown>{props.description}</ReactMarkdown>
          </div>
          <div
            className={
              props.isOpen
                ? style["recycling-service-accordion-content-displayed"]
                : style["recycling-service-accordion-content-hidden"]
            }
          >
            {props.binImage != null ? (
              <img
                className={style["recycling-service-accordion-bin-image"]}
                src={props.binImage}
                alt=""
              />
            ) : (
              <br />
            )}
            <ReactMarkdown>{props.content}</ReactMarkdown>
            {props.infographicImage != null ? (
              <img
                className={
                  style["recycling-service-accordion-infographic-image"]
                }
                src={props.infographicImage}
                alt=""
              />
            ) : (
              ""
            )}
            {props.link != null ? (
              <>
                <br />
                <ReactMarkdown>
                  {`[Link for more details.](${props.link})`}
                </ReactMarkdown>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
);
