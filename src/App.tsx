import { useEffect, useState } from "react";
import { quickSort } from "./algos";
import { SortableItem } from "./types/types";
import AlgorithmSelect from "./components/AlgorithmSelect";
import SortArea from "./components/SortArea";

function App() {
  const [algorithm, setAlgorithm] = useState("quick");
  const [items, setItems] = useState<SortableItem[]>([]);
  const ITEM_SIZE = 100;
  // create array of unique random numbers from 1 to 100
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
            r: 0 + r * 2,
            g: 0,
            b: 200 - r * 2,
          },
        });
      }
    }
    setItems(newItems);
  }, []);

  const sort = () => {
    const newItems = [...items];
    switch (algorithm) {
      case "quick":
        console.log("quick sort");
        quickSort(newItems, 0, newItems.length - 1, setItems);
      case "bubble":
        console.log("bubble sort");
        break;
      case "insertion":
        console.log("insertion sort");
        break;
      case "selection":
        console.log("selection sort");
        break;
      default:
        console.log("no sort");
    }
    setItems(newItems);
  };

  return (
    <div className="w-full">
      <SortArea algorithm={algorithm} items={items} sort={sort} />
      <AlgorithmSelect algorithm={algorithm} setAlgorithm={setAlgorithm} />
    </div>
  );
}

export default App;
