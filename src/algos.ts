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
  setTempItemsBottom: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tempTempItems: SortableItem[][] = [];
      let tempBaseItems: SortableItem[] = [];
      for (let i = 0; i < items.length / itemsPerArray; i++) {
        tempTempItems[i] = [];
        for (let j = 0; j < itemsPerArray; j++) {
          if (!items[i * itemsPerArray + j]) break;
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
      setTempItemsBottom(tempTempItems);
      setItems(tempBaseItems);

      resolve(tempTempItems);
    }, sortSpeed * 3);
  });
};

const mergeFromTempArrays = async (
  tempItemsBottom: SortableItem[][],
  setTempItemsTop: Function,
  setTempItemsBottom: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTempItemsBottom: SortableItem[][] = [];

      setTempItemsTop([...tempItemsBottom]);
      setTempItemsBottom([]);

      let j = 0;
      for (let i = 0; i < tempItemsBottom.length; i += 2) {
        let k = 0;
        const aList = tempItemsBottom[i];
        const bList =
          i < tempItemsBottom.length - 1 ? tempItemsBottom[i + 1] : [];
        let a = 0,
          b = 0;
        newTempItemsBottom.push([]);
        while (a < aList.length && b < bList.length) {
          if (aList[a].value < bList[b].value) {
            newTempItemsBottom[j][k++] = aList[a++];
          } else {
            newTempItemsBottom[j][k++] = bList[b++];
          }
        }
        while (a < aList.length) {
          newTempItemsBottom[j][k++] = aList[a++];
        }
        while (b < bList.length) {
          newTempItemsBottom[j][k++] = bList[b++];
        }
        j++;
      }

      setTempItemsTop([]);
      setTempItemsBottom(newTempItemsBottom);

      resolve(newTempItemsBottom);
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
  setTempItemsTop: Function,
  setTempItemsBottom: Function,
  sortSpeed: number
) => {
  let newTempItemsBottom = await splitToTempArrays(
    1,
    items,
    setItems,
    setTempItemsBottom,
    sortSpeed
  );
  while (newTempItemsBottom.length > 1)
    newTempItemsBottom = await mergeFromTempArrays(
      newTempItemsBottom,
      setTempItemsTop,
      setTempItemsBottom,
      sortSpeed
    );

  setItems(newTempItemsBottom[0]);
  setTempItemsBottom([]);
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
