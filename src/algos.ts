import { SortableItem } from "./types/types";

const swap = (items: SortableItem[], i: number, j: number) => {
  const item = items[i];
  items[i] = items[j];
  items[j] = item;
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
    return items;
  }

  //   items[start].color = { r: 0, g: 255, b: 0 };
  //   items[end].color = { r: 0, g: 255, b: 0 };
  //   setItems([...items]);

  setTimeout(async () => {
    const pivot = items[start];
    let pivotPos = start + 1;

    for (let i = start + 1; i <= end; i++) {
      if (items[i].value < pivot.value) {
        swap(items, i, pivotPos);
        pivotPos++;
      }
    }
    pivotPos--;
    swap(items, start, pivotPos);

    setItems([...items]);
    // resetColors(items, setItems);

    await quickSort(items, start, pivotPos - 1, setItems);
    await quickSort(items, pivotPos + 1, end, setItems);
  }, 1000);
};
