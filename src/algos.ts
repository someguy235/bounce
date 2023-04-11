import { SortableItem } from "./types/types";

export const quickSort = (
  items: SortableItem[],
  start: number,
  end: number
) => {
  console.log("quickSort", start, end);
  if (end - start <= 1) {
    return items;
  } else {
    const pivot = items[start];
    let pivotPos = start;
    for (let i = start + 1; i <= end; i++) {
      if (items[i].value < pivot.value) {
        const item = items[i];
        items[i] = items[pivotPos];
        items[pivotPos] = item;
        pivotPos++;
      }
    }
    quickSort(items, start, pivotPos - 1);
    quickSort(items, pivotPos + 1, end);
  }
};
