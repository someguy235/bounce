import { SortableItem } from "./types/types";
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();

const swap = async (
  items: SortableItem[],
  i: number,
  j: number,
  setItems: Function
) => {
  return new Promise((resolve) => {
    setItems([...items]);
    setTimeout(() => {
      const item = items[i];
      items[i] = items[j];
      items[j] = item;
      synth.triggerAttackRelease(items[j].tone, "8n");
      setItems([...items]);
      resolve(0);
    }, 100);
  });
};

const resetColors = (items: SortableItem[], setItems: Function) => {
  const newItems = items.map((item) => {
    return {
      ...item,
      color: {
        r: 0 + item.value * 2,
        g: 0,
        b: 200 - item.value * 2,
      },
    };
  });
  setItems([...newItems]);
};

export const quickSort = async (
  items: SortableItem[],
  start: number,
  end: number,
  setItems: Function
) => {
  if (start >= end || start < 0 || end >= items.length) {
    return;
  }

  const pivot = items[end];
  pivot.color = { r: 100, g: 200, b: 100 };
  let pivotPos = start - 1;

  for (let i = start; i < end; i++) {
    if (items[i].value < pivot.value) {
      pivotPos++;
      await swap(items, i, pivotPos, setItems);
    }
  }

  pivotPos++;
  await swap(items, end, pivotPos, setItems);

  pivot.color = {
    r: 0 + pivot.value * 2,
    g: 0,
    b: 200 - pivot.value * 2,
  };
  setItems([...items]);

  await quickSort(items, start, pivotPos - 1, setItems);
  await quickSort(items, pivotPos + 1, end, setItems);
};
