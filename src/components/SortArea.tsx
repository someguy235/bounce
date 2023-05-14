import { Button } from "@chakra-ui/react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { SortableItem } from "../types/types";

type TempItemAreaProps = {
  algorithm: string;
  itemSize: number;
  tempItem: SortableItem;
};
const TempItemArea = ({ algorithm, itemSize, tempItem }: TempItemAreaProps) => {
  if (algorithm !== "insertion") return null;
  return (
    <div className="m-px mr-4 flex flex-1 items-end self-stretch border-l-2 border-r-2 border-dashed">
      <Flipped flipId={tempItem.value} key={tempItem.value}>
        <span
          key={tempItem.value}
          style={{
            height: `${tempItem.value * (300 / itemSize)}px`,
            display: "inline-block",
            width: "100%",
            backgroundColor: `rgb(${tempItem.color.r}, ${tempItem.color.g}, ${tempItem.color.b})`,
            color: "red",
          }}
        >
          &nbsp;
        </span>
      </Flipped>
    </div>
  );
};

type TempItemsAreaProps = {
  algorithm: string;
  itemSize: number;
  tempItems: SortableItem[][];
};
const TempItemsArea = ({
  algorithm,
  itemSize,
  tempItems,
}: TempItemsAreaProps) => {
  if (algorithm !== "merge") return null;
  return (
    <div className="flex w-full items-end border-2" style={{ height: "150px" }}>
      {tempItems.map((itemGroup, i) => (
        <div
          className="mx-2 flex h-full flex-1 items-end border-2 border-dashed"
          key={i}
        >
          {itemGroup.map((item, j) => (
            <Flipped flipId={item.value} key={i + ":" + j}>
              <span
                className="m-px flex-1"
                style={{
                  height: `${item.value * (142 / itemSize)}px`,
                  backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
                  color: "red",
                }}
              >
                &nbsp;
              </span>
            </Flipped>
          ))}
        </div>
      ))}
    </div>
  );
};

type MainItemAreaProps = {
  items: SortableItem[][];
  itemSize: number;
};
const MainItemArea = ({ items, itemSize }: MainItemAreaProps) => {
  return (
    <div className="flex w-full items-end" style={{ height: "300px" }}>
      {items.map((itemGroup, i) => (
        <div
          className={
            "flex h-full flex-1 items-end" +
            (items.length > 1 ? " mx-2  border-2 border-dashed" : "")
          }
          key={i}
        >
          {itemGroup.map((item, j) => (
            <Flipped flipId={item.value} key={j}>
              <span
                style={{
                  height: `${item.value * (300 / itemSize)}px`,
                  backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
                  color: "red",
                }}
                className={`m-px flex-1`}
              >
                &nbsp;
              </span>
            </Flipped>
          ))}
        </div>
      ))}
    </div>
  );
};

type SortAreaProps = {
  algorithm: string;
  items: SortableItem[][];
  itemSize: number;
  tempItem: SortableItem;
  tempItems: SortableItem[][];
  reset: Function;
  sorting: boolean;
  setSorting: Function;
};
const SortArea = ({
  algorithm,
  items,
  itemSize,
  tempItem,
  tempItems,
  reset,
  sorting,
  setSorting,
}: SortAreaProps) => {
  return (
    <div className="my-2 w-full">
      <Flipper flipKey={items} staggerConfig={{ default: { speed: 0.01 } }}>
        <TempItemsArea
          algorithm={algorithm}
          itemSize={itemSize}
          tempItems={tempItems}
        />
        <div
          className="flex w-full items-end border-2"
          style={{ height: "306px" }}
        >
          <TempItemArea
            algorithm={algorithm}
            itemSize={itemSize}
            tempItem={tempItem}
          />
          <MainItemArea items={items} itemSize={itemSize} />
        </div>
      </Flipper>
      <Button m={2} onClick={() => setSorting(true)} isDisabled={sorting}>
        Sort
      </Button>
      <Button
        m={2}
        onClick={() => {
          setSorting(false);
        }}
        isDisabled={!sorting}
      >
        Stop
      </Button>
      <Button m={2} onClick={() => reset()} isDisabled={sorting}>
        Reset
      </Button>
    </div>
  );
};

export default SortArea;
