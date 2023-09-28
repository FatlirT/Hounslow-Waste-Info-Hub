import ItemTypeCard from "@/components/home/ItemTypeCard";
import style from "@/styles/home/ItemTypeCardGrid.module.css";

type ItemTypeCardGridProps = {
  showFlatVersion: boolean;
  openAccordion(id: string): void;
};

export default function ItemTypeCardGrid(props: ItemTypeCardGridProps) {
  if (props.showFlatVersion) {
    return (
      <div className={style["item-type-card-grid"]}>
        <ItemTypeCard
          frontTitle="Plastic"
          frontImage="./plastic.png"
          backTitle="Plastic can be recycled using the plastic communal bin (red)."
          backImage="./plastic_communal_bin.png"
          serviceID="Plastic Communal Bin (Red)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Metal"
          frontImage="./metal2.png"
          backTitle="Metal can be recycled using the metal communal bin (grey)."
          backImage="./metal_communal_bin.png"
          serviceID="Metal Communal Bin (Grey)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Card"
          frontImage="./card.png"
          backTitle="Card can be recycled using the card communal bin (blue)."
          backImage="./card_communal_bin.png"
          serviceID="Card Communal Bin (Blue)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Paper"
          frontImage="./paper.png"
          backTitle="Paper can be recycled using the paper communal bin (blue)."
          backImage="./paper_communal_bin.png"
          serviceID="Paper Communal Bin (Blue)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Glass"
          frontImage="./glass2.png"
          backTitle="Glass can be recycled using the glass communal bin (teal)."
          backImage="./glass_communal_bin.png"
          serviceID="Glass Communal Bin (Teal)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Food Waste"
          frontImage="./food_waste.png"
          backTitle="Food waste can be recycled using the food communal bin (green)."
          backImage="./food_communal_bin.png"
          serviceID="Food Communal Bin (Green)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Textiles"
          frontImage="./textiles.png"
          backTitle="Textiles can be donated to charity."
          backImage="./tied_carrier_bag_1.png"
          serviceID="Textiles"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Small Electrical Items"
          frontImage="./small_electrical_items.png"
          backTitle="Small electrical items can be donated to charity."
          backImage="./tied_carrier_bag_2.png"
          serviceID="Small Electrical Items"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Large Electrical Items"
          frontImage="./large_electrical_items.png"
          backTitle="Large electrical items can be recycled using the Bulky Waste Collection Service."
          backImage="./large_electrical_items.png"
          serviceID="Bulky Waste Collection Service"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Furniture"
          frontImage="./bulky_waste.png"
          backTitle="Furniture can be recycled using the Bulky Waste Collection Service."
          backImage="./bulky_waste.png"
          serviceID="Bulky Waste Collection Service"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Clinical Waste"
          frontImage="./clinical_waste_collection_service.png"
          backTitle="Clinical waste can be disposed of using the Clinical Waste Collection Service."
          backImage="./clinical_waste_collection_service.png"
          serviceID="Clinical Waste Collection Service"
          openAccordion={props.openAccordion}
        />
      </div>
    );
  } else {
    return (
      <div className={style["item-type-card-grid"]}>
        <ItemTypeCard
          frontTitle="Plastic"
          frontImage="./plastic.png"
          backTitle="Plastic can be recycled using the red recycling box."
          backImage="./red_recycling_box.png"
          serviceID="Red Recycling Box"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Metal"
          frontImage="./metal.png"
          backTitle="Metal can be recycled using the red recycling box."
          backImage="./red_recycling_box.png"
          serviceID="Red Recycling Box"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Card"
          frontImage="./card.png"
          backTitle="Card can be recycled using the blue recycling box."
          backImage="./blue_recycling_box.png"
          serviceID="Blue Recycling Box"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Paper"
          frontImage="./paper.png"
          backTitle="Paper can be recycled using the blue recycling box."
          backImage="./blue_recycling_box.png"
          serviceID="Blue Recycling Box"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Glass"
          frontImage="./glass.png"
          backTitle="Glass can be recycled using the green recycling box."
          backImage="./green_recycling_box.png"
          serviceID="Green Recycling Box"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Food Waste"
          frontImage="./food_waste.png"
          backTitle="Food waste can be recycled using the food waste bin."
          backImage="./food_waste_bin.png"
          serviceID="Food Waste Bin"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Garden Waste"
          frontImage="./garden_waste.png"
          backTitle="Garden waste can be recycled using the brown wheeled bin."
          backImage="./brown_wheeled_bin.png"
          serviceID="Brown Wheeled Bin"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Textiles"
          frontImage="./textiles.png"
          backTitle="Textiles can be recycled using a tied carrier bag."
          backImage="./tied_carrier_bag_1.png"
          serviceID="Tied Carrier Bag (1)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Small Electrical Items"
          frontImage="./small_electrical_items.png"
          backTitle="Small electrical items can be recycled using a tied carrier bag."
          backImage="./tied_carrier_bag_2.png"
          serviceID="Tied Carrier Bag (2)"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Large Electrical Items"
          frontImage="./large_electrical_items.png"
          backTitle="Large electrical items can be recycled using the Bulky Waste Collection Service."
          backImage="./large_electrical_items.png"
          serviceID="Bulky Waste Collection Service"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Furniture"
          frontImage="./bulky_waste.png"
          backTitle="Furniture can be recycled using the Bulky Waste Collection Service."
          backImage="./bulky_waste.png"
          serviceID="Bulky Waste Collection Service"
          openAccordion={props.openAccordion}
        />
        <ItemTypeCard
          frontTitle="Clinical Waste"
          frontImage="./clinical_waste_collection_service.png"
          backTitle="Clinical waste can be disposed of using the Clinical Waste Collection Service."
          backImage="./clinical_waste_collection_service.png"
          serviceID="Clinical Waste Collection Service"
          openAccordion={props.openAccordion}
        />
      </div>
    );
  }
}
