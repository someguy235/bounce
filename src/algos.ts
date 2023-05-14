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
  items: SortableItem[],
  setItems: Function,
  setTempItemsBottom: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("splitToTempArrays");
      let newTempItemsBottom: SortableItem[][] = [];
      let newItems: SortableItem[] = [];
      for (let i = 0; i < items.length; i++) {
        newTempItemsBottom[i] = [{ ...items[i] }];
        newItems[i] = {
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
      setTempItemsBottom(newTempItemsBottom);
      setItems(newItems);
      resolve(newTempItemsBottom);
    }, sortSpeed * 3);
  });
};

const setTempArrays = async (
  newTempItemsTop: SortableItem[][],
  newTempItemsBottom: SortableItem[][],
  setTempItemsTop: Function,
  setTempItemsBottom: Function,
  sortSpeed: number
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTempItemsTop([...newTempItemsTop]);
      setTempItemsBottom([...newTempItemsBottom]);
      resolve(0);
    }, sortSpeed);
  });
};

const mergeFromTempArrays = async (
  tempItemsTop: SortableItem[][],
  setTempItemsTop: Function,
  setTempItemsBottom: Function,
  sortSpeed: number
): Promise<SortableItem[][]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const oldTempItemsTop = [...tempItemsTop];
      const newTempItemsTop: SortableItem[][] = [...tempItemsTop];

      const newTempItemsBottom: SortableItem[][] = [];
      for (let i = 0; i < oldTempItemsTop.length; i++) {
        if (i % 2 == 0) newTempItemsBottom.push([]);
        for (let j = 0; j < oldTempItemsTop[i].length; j++) {
          newTempItemsBottom[newTempItemsBottom.length - 1].push({
            ...globalTempItem,
          });
        }
      }
      setTempItemsBottom(newTempItemsBottom);

      let j = 0;
      for (let i = 0; i < oldTempItemsTop.length; i += 2) {
        let k = 0;
        const aList = [...oldTempItemsTop[i]];
        const bList =
          i < oldTempItemsTop.length - 1 ? [...oldTempItemsTop[i + 1]] : [];
        let a = 0,
          b = 0;

        while (a < aList.length && b < bList.length) {
          if (!globalSorting) return;
          if (aList[a].value < bList[b].value) {
            newTempItemsTop[i][a] = { ...globalTempItem };
            newTempItemsBottom[j][k++] = aList[a++];
          } else {
            newTempItemsTop[i + 1][b] = { ...globalTempItem };
            newTempItemsBottom[j][k++] = bList[b++];
          }
          await setTempArrays(
            newTempItemsTop,
            newTempItemsBottom,
            setTempItemsTop,
            setTempItemsBottom,
            sortSpeed
          );
        }
        while (a < aList.length) {
          if (!globalSorting) return;
          newTempItemsTop[i][a] = { ...globalTempItem };
          newTempItemsBottom[j][k++] = aList[a++];
          await setTempArrays(
            newTempItemsTop,
            newTempItemsBottom,
            setTempItemsTop,
            setTempItemsBottom,
            sortSpeed
          );
        }
        while (b < bList.length) {
          if (!globalSorting) return;
          newTempItemsTop[i + 1][b] = { ...globalTempItem };
          newTempItemsBottom[j][k++] = bList[b++];
          await setTempArrays(
            newTempItemsTop,
            newTempItemsBottom,
            setTempItemsTop,
            setTempItemsBottom,
            sortSpeed
          );
        }
        j++;
      }

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
    items,
    setItems,
    setTempItemsBottom,
    sortSpeed
  );

  while (newTempItemsBottom.length > 1) {
    if (!globalSorting) return;

    await setTempArrays(
      newTempItemsBottom,
      [],
      setTempItemsTop,
      setTempItemsBottom,
      sortSpeed * 3
    );

    newTempItemsBottom = await mergeFromTempArrays(
      newTempItemsBottom,
      setTempItemsTop,
      setTempItemsBottom,
      sortSpeed
    );
  }

  await setTempArrays(
    [],
    [],
    setTempItemsTop,
    setTempItemsBottom,
    sortSpeed * 3
  );
  setItems(newTempItemsBottom[0]);
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
