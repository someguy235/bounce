import { SortableItem } from "./types/types";
import { globalSorting, globalTempItem } from "./App";
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();

const swap = async (
  items: SortableItem[][],
  i: number,
  j: number,
  setItems: Function,
  sortSpeed: number
) => {
  return new Promise((resolve) => {
    if (i === j) resolve(0);
    setTimeout(() => {
      const item = items[0][i];
      items[0][i] = items[0][j];
      items[0][j] = item;
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

const splitToTempArray = async (
  items: SortableItem[][],
  setItems: Function,
  setTempItems: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newTempItems: SortableItem[][] = [];
      let newItems: SortableItem[][] = [[]];

      for (let i = 0; i < items[0].length; i++) {
        newTempItems[i] = [{ ...items[0][i] }];
        newItems[0][i] = { ...globalTempItem };
      }

      setTempItems(newTempItems);
      setItems(newItems);
      resolve(newTempItems);
    }, sortSpeed * 3);
  });
};

const setTempArrays = async (
  newTempItems: SortableItem[][],
  newItems: SortableItem[][],
  setTempItems: Function,
  setItems: Function,
  sortSpeed: number
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTempItems([...newTempItems]);
      setItems([...newItems]);
      resolve(0);
    }, sortSpeed);
  });
};

const mergeFromTempArrays = async (
  tempItems: SortableItem[][],
  setTempItems: Function,
  setItems: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const oldTempItems = [...tempItems];
      const newTempItems: SortableItem[][] = [...tempItems];

      const newItems: SortableItem[][] = [];
      for (let i = 0; i < oldTempItems.length; i++) {
        if (i % 2 == 0) newItems.push([]);
        for (let j = 0; j < oldTempItems[i].length; j++) {
          newItems[newItems.length - 1].push({
            ...globalTempItem,
          });
        }
      }
      setItems(newItems);

      let j = 0;
      for (let i = 0; i < oldTempItems.length; i += 2) {
        let k = 0;
        const aList = [...oldTempItems[i]];
        const bList =
          i < oldTempItems.length - 1 ? [...oldTempItems[i + 1]] : [];
        let a = 0,
          b = 0;

        while (a < aList.length && b < bList.length) {
          if (!globalSorting) return;
          if (aList[a].value < bList[b].value) {
            newTempItems[i][a] = { ...globalTempItem };
            newItems[j][k++] = aList[a++];
          } else {
            newTempItems[i + 1][b] = { ...globalTempItem };
            newItems[j][k++] = bList[b++];
          }
          await setTempArrays(
            newTempItems,
            newItems,
            setTempItems,
            setItems,
            sortSpeed
          );
        }
        while (a < aList.length) {
          if (!globalSorting) return;
          newTempItems[i][a] = { ...globalTempItem };
          newItems[j][k++] = aList[a++];
          await setTempArrays(
            newTempItems,
            newItems,
            setTempItems,
            setItems,
            sortSpeed
          );
        }
        while (b < bList.length) {
          if (!globalSorting) return;
          newTempItems[i + 1][b] = { ...globalTempItem };
          newItems[j][k++] = bList[b++];
          await setTempArrays(
            newTempItems,
            newItems,
            setTempItems,
            setItems,
            sortSpeed
          );
        }
        j++;
      }

      resolve(newItems);
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

// TODO: not working after refactor to multi-dimensional array
export const bubbleSort = async (
  items: SortableItem[][],
  setItems: Function,
  sortSpeed: number
) => {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (items[0][j].value > items[0][j + 1].value) {
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

// TODO: fix resume after stop
export const mergeSort = async (
  items: SortableItem[][],
  setItems: Function,
  setTempItems: Function,
  sortSpeed: number
) => {
  let newTempItems = await splitToTempArray(
    items,
    setItems,
    setTempItems,
    sortSpeed
  );

  let newItems = await mergeFromTempArrays(
    newTempItems,
    setTempItems,
    setItems,
    sortSpeed
  );

  while (newItems.length > 1) {
    if (!globalSorting) return;

    await setTempArrays(newItems, [], setTempItems, setItems, sortSpeed * 3);

    newItems = await mergeFromTempArrays(
      newItems,
      setTempItems,
      setItems,
      sortSpeed
    );
  }

  setTempItems([]);
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
