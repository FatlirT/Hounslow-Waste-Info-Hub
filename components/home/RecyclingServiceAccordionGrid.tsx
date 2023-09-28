import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  useImperativeHandle,
} from "react";
import RecyclingServiceAccordion from "@/components/home/RecyclingServiceAccordion";
import { RecyclingService } from "@/data/RecyclingServices";
import style from "@/styles/home/RecyclingServiceAccordionGrid.module.css";

export type RecyclingServiceAccordionGridRef = {
  openAccordion(id: string): void;
};

type RecyclingServiceAccordionGridProps = {
  showFlatVersion: boolean;
  houseRecyclingServices: RecyclingService[];
  flatRecyclingServices: RecyclingService[];
};

export default React.forwardRef<
  RecyclingServiceAccordionGridRef,
  RecyclingServiceAccordionGridProps
>(function RecyclingServiceAccordionGrid(props, ref) {
  const [openAccordionID, setOpenAccordionID] = useState("");
  const previousOpenAccordionID = useRef("");
  const accordionsMaxHeight = useRef(0); // This is the (closed) height of the tallest accordion.
  const [windowWidth, setWindowWidth] = useState(0);
  let refs: React.RefObject<HTMLDivElement>[] = [];

  // This hook runs when the page version changes. It updates the variable
  // keeping track of the max height of the accordions.
  useEffect(() => {
    // Close any currently open accordions.
    setOpenAccordionID("");

    // Set the min height of the accordions to 0, so that they use their default
    // height.
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.minHeight = "0px";
      }
    });

    // Find the height of the tallest accordion, ignoring the one that is
    // potentially open.
    let calculatedMaxHeight = 0;
    refs.forEach((ref) => {
      if (ref.current?.id != openAccordionID) {
        calculatedMaxHeight = Math.max(
          calculatedMaxHeight,
          ref.current?.offsetHeight || 0
        );
      }
    });

    // Update max height.
    accordionsMaxHeight.current = calculatedMaxHeight;

    // Set the min height of the accordions to the max height.
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.minHeight = `${accordionsMaxHeight.current}px`;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showFlatVersion]);

  // This hook runs when an accordion is opened or closed (but only has an
  // effect if an accordion was closed). It updates the variable keeping track
  // of the max height of the accordions.
  useEffect(() => {
    // We need to add a delay to take into account an accordion closing before
    // we can calculate the max height.
    const timer = setTimeout(() => {
      // We only need to update max height if an accordion was just closed.
      if (previousOpenAccordionID.current != "") {
        // Find the ref for the accordion that just closed and set the min
        // height of that accordion to 0 so that it uses it's default height.
        // Update max height only if this default height is greater.
        refs.forEach((ref) => {
          if (ref.current?.id == previousOpenAccordionID.current) {
            ref.current!.style.minHeight = "0px";
            accordionsMaxHeight.current = Math.max(
              accordionsMaxHeight.current,
              ref.current?.offsetHeight
            );
          }
        });

        // Set the min height of the accordions to the max height.
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.minHeight = `${accordionsMaxHeight.current}px`;
          }
        });
      }

      // Update the previous open accordion ID.
      previousOpenAccordionID.current = openAccordionID;
    }, 200);

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAccordionID]);

  // This hook runs when the width of the browser window changes. It updates the
  // variable keeping track of the max height of the accordions.
  useEffect(() => {
    // Set the min height of the accordions to 0, so that they use their default
    // height.
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.minHeight = "0px";
      }
    });

    // Find the height of the tallest accordion, ignoring the one that is
    // potentially open.
    let calculatedMaxHeight = 0;
    refs.forEach((ref) => {
      if (ref.current?.id != openAccordionID) {
        calculatedMaxHeight = Math.max(
          calculatedMaxHeight,
          ref.current?.offsetHeight || 0
        );
      }
    });

    // Update max height.
    accordionsMaxHeight.current = calculatedMaxHeight;

    // Set the min height of the accordions to the max height.
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.minHeight = `${accordionsMaxHeight.current}px`;
      }
    });

    // Add window listener.
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup window listener.
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  // Allows other components to call the openAccordion method.
  useImperativeHandle(ref, () => ({
    openAccordion(id: string) {
      setOpenAccordionID(id);
    },
  }));

  function handleClick(id: string) {
    setOpenAccordionID(id == openAccordionID ? "" : id);
  }

  function createAndPushRef() {
    const ref = createRef<HTMLDivElement>();
    refs.push(ref);
    return ref;
  }

  return (
    <div className={style["recycling-service-accordion-grid"]}>
      <div className={style["recycling-service-accordion-grid-col"]}>
        {(props.showFlatVersion
          ? props.flatRecyclingServices
          : props.houseRecyclingServices
        )
          .slice(
            0,
            Math.ceil(
              (props.showFlatVersion
                ? props.flatRecyclingServices
                : props.houseRecyclingServices
              ).length / 2
            )
          )
          .map((recyclingService) => (
            <RecyclingServiceAccordion
              forFlats={recyclingService.forFlats}
              key={recyclingService.id}
              id={recyclingService.id}
              itemImage={recyclingService.itemImage}
              title={recyclingService.title}
              binImage={recyclingService.binImage}
              description={recyclingService.description}
              content={recyclingService.content}
              infographicImage={recyclingService.infographicImage}
              link={recyclingService.link}
              isOpen={openAccordionID == recyclingService.id}
              handleClick={handleClick}
              ref={createAndPushRef()}
            />
          ))}
      </div>
      <div className={style["recycling-service-accordion-grid-col"]}>
        {(props.showFlatVersion
          ? props.flatRecyclingServices
          : props.houseRecyclingServices
        )
          .slice(
            Math.ceil(
              (props.showFlatVersion
                ? props.flatRecyclingServices
                : props.houseRecyclingServices
              ).length / 2
            )
          )
          .map((recyclingService) => (
            <RecyclingServiceAccordion
              forFlats={recyclingService.forFlats}
              key={recyclingService.id}
              id={recyclingService.id}
              itemImage={recyclingService.itemImage}
              title={recyclingService.title}
              binImage={recyclingService.binImage}
              description={recyclingService.description}
              content={recyclingService.content}
              link={recyclingService.link}
              infographicImage={recyclingService.infographicImage}
              isOpen={openAccordionID == recyclingService.id}
              handleClick={handleClick}
              ref={createAndPushRef()}
            />
          ))}
      </div>
    </div>
  );
});
