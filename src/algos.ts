import { SortableItem } from "./types/types";
import { globalSorting, globalTempItem } from "./App";
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();

const swap = async (
  items: SortableItem[],
  i: number,
  j: number,
  setItems: Function,
  sortSpeed: number
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
    }, sortSpeed);
  });
};

const swapTempVal = async (
  position: number,
  items: SortableItem[],
  setItems: Function,
  setTempItem: Function,
  sortSpeed: number
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTempItem({ ...items[position] });

      items[position] = <SortableItem>{ ...globalTempItem };
      setItems([...items]);

      resolve(0);
    }, sortSpeed * 3);
  });
};

const splitToTempArrays = async (
  itemsPerArray: number,
  items: SortableItem[],
  setItems: Function,
  setTempItems: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tempTempItems: SortableItem[][] = [];
      let tempBaseItems: SortableItem[] = [];
      for (let i = 0; i < items.length / itemsPerArray; i++) {
        tempTempItems[i] = [];
        for (let j = 0; j < itemsPerArray; j++) {
          tempTempItems[i].push({ ...items[i * itemsPerArray + j] });
          tempBaseItems[i] = {
            value: 0,
            tone: 0,
            color: {
              r: 0,
              g: 0,
              b: 0,
            },
            defaultColor: {
              r: 0,
              g: 0,
              b: 0,
            },
          };
        }
      }
      setTempItems(tempTempItems);
      setItems(tempBaseItems);

      resolve(tempTempItems);
    }, sortSpeed * 3);
  });
};

const mergeFromTempArrays = async (
  tempItems: SortableItem[][],
  setItems: Function,
  setTempItems: Function,
  sortSpeed: number
): Promise<SortableItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tempBaseItems: SortableItem[] = [];
      console.log(tempItems);
      let j = 0;
      for (let i = 0; i < tempItems.length; i += 2) {
        const aList = tempItems[i];
        const bList = i < tempItems.length - 1 ? tempItems[i + 1] : [];
        console.log(aList, bList);
        let a = 0,
          b = 0;
        while (a < aList.length && b < bList.length) {
          if (aList[a].value < bList[b].value) {
            tempBaseItems[j++] = aList[a++];
          } else {
            tempBaseItems[j++] = bList[b++];
          }
        }
        while (a < aList.length) {
          tempBaseItems[j++] = aList[a++];
        }
        while (b < bList.length) {
          tempBaseItems[j++] = bList[b++];
        }
      }

      console.log(tempBaseItems);
      setItems(tempBaseItems);
      setTempItems([]);

      resolve(tempBaseItems);
    }, sortSpeed * 3);
  });
};

export const setColor = async (
  item: SortableItem,
  color: { r: number; g: number; b: number },
  items: SortableItem[],
  setItems: Function,
  sortSpeed: number
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      item.color = color;
      setItems([...items]);
      resolve(0);
    }, sortSpeed);
  });
};

export const bubbleSort = async (
  items: SortableItem[],
  setItems: Function,
  sortSpeed: number
) => {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (items[j].value > items[j + 1].value) {
        if (!globalSorting) return;
        await swap(items, j, j + 1, setItems, sortSpeed);
      }
    }
  }
};

export const insertionSort = async (
  items: SortableItem[],
  setItems: Function,
  setTempItem: Function,
  sortSpeed: number
) => {
  if (!items || items.length == 0) return;
  for (let i = 1; i < items.length; i++) {
    if (!globalSorting) return;
    let j = i - 1;
    let tempVal = items[i]?.value;
    if (!tempVal) return;

    await swapTempVal(i, items, setItems, setTempItem, sortSpeed);

    while (j >= 0 && items[j]!.value > tempVal) {
      if (!globalSorting) {
        await swapTempVal(j + 1, items, setItems, setTempItem, sortSpeed);
        return;
      }
      await swap(items, j, j + 1, setItems, sortSpeed);
      j--;
    }

    await swapTempVal(j + 1, items, setItems, setTempItem, sortSpeed);
  }
};

export const mergeSort = async (
  items: SortableItem[],
  setItems: Function,
  tempItems: SortableItem[][],
  setTempItems: Function,
  sortSpeed: number
) => {
  console.log(tempItems);
  const tempTempItems = await splitToTempArrays(
    1,
    items,
    setItems,
    setTempItems,
    sortSpeed
  );
  console.log(tempTempItems);
  await mergeFromTempArrays(tempTempItems, setItems, setTempItems, sortSpeed);
};

export const quickSort = async (
  items: SortableItem[],
  start: number,
  end: number,
  setItems: Function,
  sortSpeed: number
) => {
  if (start >= end || start < 0 || end >= items.length) {
    return;
  }
  const pivot = items[end];

  await setColor(pivot, { r: 100, g: 200, b: 100 }, items, setItems, sortSpeed);

  let pivotPos = start - 1;
  for (let i = start; i < end; i++) {
    if (!globalSorting) return;
    if (items[i].value < pivot.value) {
      pivotPos++;
      await swap(items, i, pivotPos, setItems, sortSpeed);
    }
  }

  pivotPos++;
  await swap(items, end, pivotPos, setItems, sortSpeed);

  await setColor(pivot, pivot.defaultColor, items, setItems, sortSpeed);

  if (!globalSorting) return;
  await quickSort(items, start, pivotPos - 1, setItems, sortSpeed);
  await quickSort(items, pivotPos + 1, end, setItems, sortSpeed);
};

export const selectionSort = async (
  items: SortableItem[],
  setItems: Function,
  sortSpeed: number
) => {
  for (let i = 0; i < items.length; i++) {
    let min = i;
    for (let j = i + 1; j < items.length; j++) {
      if (items[j].value < items[min].value) {
        min = j;
      }
    }
    await swap(items, i, min, setItems, sortSpeed);
  }
};
