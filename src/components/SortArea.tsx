import { Button } from "@chakra-ui/react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { SortableItem } from "../types/types";

type TempItemAreaProps = {
  algorithm: string;
  items: SortableItem[];
  tempItem: SortableItem;
};
const TempItemArea = ({ algorithm, items, tempItem }: TempItemAreaProps) => {
  if (algorithm !== "insertion") return null;
  return (
    <div className="m-px mr-4 flex flex-1 items-end self-stretch border-l-2 border-r-2 border-dashed">
      <Flipped flipId={tempItem.value} key={tempItem.value}>
        <span
          key={tempItem.value}
          style={{
            height: `${tempItem.value * (300 / items.length)}px`,
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
  items: SortableItem[];
  tempItems: SortableItem[][];
};
const TempItemsArea = ({ algorithm, items, tempItems }: TempItemsAreaProps) => {
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
                  height: `${item.value * (142 / items.length)}px`,
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

type SortAreaProps = {
  algorithm: string;
  items: SortableItem[];
  tempItem: SortableItem;
  tempItemsTop: SortableItem[][];
  tempItemsBottom: SortableItem[][];
  reset: Function;
  sorting: boolean;
  setSorting: Function;
};
const SortArea = ({
  algorithm,
  items,
  tempItem,
  tempItemsTop,
  tempItemsBottom,
  reset,
  sorting,
  setSorting,
}: SortAreaProps) => {
  return (
    <div className="my-2 w-full">
      <Flipper
        flipKey={tempItemsBottom}
        staggerConfig={{ default: { speed: 0.01 } }}
      >
        <TempItemsArea
          algorithm={algorithm}
          items={items}
          tempItems={tempItemsTop}
        />
        <TempItemsArea
          algorithm={algorithm}
          items={items}
          tempItems={tempItemsBottom}
        />
        <div
          className="flex w-full items-end border-2"
          style={{ height: "306px" }}
        >
          <TempItemArea
            algorithm={algorithm}
            items={items}
            tempItem={tempItem}
          />
          {items.map((item, i) => (
            <Flipped flipId={item.value} key={i}>
              <span
                style={{
                  height: `${item.value * (300 / items.length)}px`,
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
