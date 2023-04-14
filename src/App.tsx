import { useEffect, useState } from "react";
import { bubbleSort, insertionSort, quickSort, selectionSort } from "./algos";
import { SortableItem } from "./types/types";
import AlgorithmSelect from "./components/AlgorithmSelect";
import SortArea from "./components/SortArea";

function App() {
  const [algorithm, setAlgorithm] = useState("quick");
  const [items, setItems] = useState<SortableItem[]>([]);
  const ITEM_SIZE = 30;

  // create array of unique random numbers from 1 to ITEM_SIZE
  useEffect(() => {
    const newItems: SortableItem[] = [];
    const count: number[] = [];
    while (count.length < ITEM_SIZE) {
      const r = Math.floor(Math.random() * ITEM_SIZE) + 1;
      if (count.indexOf(r) === -1) {
        count.push(r);
        newItems.push({
          value: r,
          tone: 240 + r * 4,
          color: {
            r: 0 + r * (255 / ITEM_SIZE),
            g: 0,
            b: 200 - r * (200 / ITEM_SIZE),
          },
          defaultColor: {
            r: 0 + r * (255 / ITEM_SIZE),
            g: 0,
            b: 200 - r * (200 / ITEM_SIZE),
          },
        });
      }
    }
    setItems(newItems);
  }, []);

  const sort = () => {
    switch (algorithm) {
      case "quick":
        console.log("quick sort");
        quickSort(items, 0, items.length - 1, setItems);
        break;
      case "bubble":
        console.log("bubble sort");
        bubbleSort(items, setItems);
        break;
      case "insertion":
        console.log("insertion sort");
        insertionSort(items, setItems);
        break;
      case "selection":
        console.log("selection sort");
        selectionSort(items, setItems);
        break;
      default:
        console.log("no sort");
    }
  };

  return (
    <div className="w-full">
      <SortArea algorithm={algorithm} items={items} sort={sort} />
      <div>
        <AlgorithmSelect algorithm={algorithm} setAlgorithm={setAlgorithm} />
        {/* // speed slider */}
        {/* // size slider */}
      </div>
    </div>
  );
}

export default App;
