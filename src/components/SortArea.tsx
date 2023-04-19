import { Button } from "@chakra-ui/react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { SortableItem } from "../types/types";

type SortAreaProps = {
  algorithm: string;
  items: SortableItem[];
  tempItem: SortableItem;
  reset: Function;
  sorting: boolean;
  setSorting: Function;
};
const SortArea = ({
  algorithm,
  items,
  tempItem,
  reset,
  sorting,
  setSorting,
}: SortAreaProps) => {
  const tempItemArea =
    algorithm == "insertion" ? (
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
        </Flipped>{" "}
      </div>
    ) : null;

  return (
    <div className="my-2 w-full">
      <Flipper flipKey={items} staggerConfig={{ default: { speed: 0.01 } }}>
        <div className="flex w-full items-end border-2">
          {tempItemArea}
          {items.map((item) => (
            <Flipped flipId={item.value} key={item.value}>
              <span
                key={item.value}
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
