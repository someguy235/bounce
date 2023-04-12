import * as Tone from "tone";
import { SortableItem } from "../types/types";

type SortAreaProps = {
  algorithm: string;
  items: SortableItem[];
  sort: Function;
};
const SortArea = ({ algorithm, items, sort }: SortAreaProps) => {
  const synth = new Tone.Synth().toDestination();
  return (
    <div className="my-2 w-full border-2">
      <div className="flex w-full items-end">
        {items.map((item) => (
          <span
            key={item.value}
            style={{
              height: `${item.value * 3}px`,
              backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
              color: "red",
            }}
            className={`m-px flex-1`}
            onClick={() => {
              console.log(item.value);
              synth.triggerAttackRelease(item.tone, "8n");
            }}
          >
            &nbsp;
          </span>
        ))}
      </div>
      <button onClick={() => sort()}>Sort</button>
    </div>
  );
};

export default SortArea;
