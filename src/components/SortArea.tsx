import { Button } from "@chakra-ui/react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { SortableItem } from "../types/types";

type SortAreaProps = {
  items: SortableItem[];
  sort: Function;
  reset: Function;
  sorting: boolean;
};
const SortArea = ({ items, sort, reset, sorting }: SortAreaProps) => {
  return (
    <div className="my-2 w-full">
      <Flipper flipKey={items}>
        <div className="flex w-full items-end border-2">
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
      <Button m={2} onClick={() => sort()} isDisabled={sorting}>
        Sort
      </Button>
      <Button m={2} onClick={() => sort()} isDisabled={!sorting}>
        Stop
      </Button>
      <Button m={2} onClick={() => reset()} isDisabled={sorting}>
        Reset
      </Button>
    </div>
  );
};

export default SortArea;
