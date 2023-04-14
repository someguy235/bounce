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
    if (i === j) resolve(0);
    setTimeout(() => {
      const item = items[i];
      items[i] = items[j];
      items[j] = item;
      //   synth.triggerAttackRelease(items[i].tone, "16n");
      setItems([...items]);
      resolve(0);
    }, 250);
  });
};

export const bubbleSort = async (items: SortableItem[], setItems: Function) => {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (items[j].value > items[j + 1].value) {
        await swap(items, j, j + 1, setItems);
      }
    }
  }
};

export const insertionSort = async (
  items: SortableItem[],
  setItems: Function
) => {
  for (let i = 1; i < items.length; i++) {
    let j = i - 1;
    let temp = items[i];
    while (j >= 0 && items[j].value > temp.value) {
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = temp;
    setItems([...items]);
  }
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
  setItems([...items]);

  let pivotPos = start - 1;
  for (let i = start; i < end; i++) {
    if (items[i].value < pivot.value) {
      pivotPos++;
      await swap(items, i, pivotPos, setItems);
    }
  }

  pivotPos++;
  await swap(items, end, pivotPos, setItems);

  pivot.color = pivot.defaultColor;
  setItems([...items]);

  await quickSort(items, start, pivotPos - 1, setItems);
  await quickSort(items, pivotPos + 1, end, setItems);
};

export const selectionSort = async (
  items: SortableItem[],
  setItems: Function
) => {
  for (let i = 0; i < items.length; i++) {
    let min = i;
    for (let j = i + 1; j < items.length; j++) {
      if (items[j].value < items[min].value) {
        min = j;
      }
    }
    await swap(items, i, min, setItems);
  }
};
