import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { bubbleSort, insertionSort, quickSort, selectionSort } from "./algos";
import { SortableItem } from "./types/types";
import AlgorithmSelect from "./components/AlgorithmSelect";
import ItemCountSelect from "./components/ItemCountSelect";
import SortSpeedSelect from "./components/SortSpeedSelect";
import SortArea from "./components/SortArea";

function App() {
  const [algorithm, setAlgorithm] = useState("quick");
  const [items, setItems] = useState<SortableItem[]>([]);
  const [itemSize, setItemSize] = useState(30);
  const [sortSpeed, setSortSpeed] = useState(100);
  const [sorting, setSorting] = useState(false);

  // create array of unique random numbers from 1 to itemSize
  useEffect(() => {
    const newItems: SortableItem[] = [];
    const count: number[] = [];
    while (count.length < itemSize) {
      const r = Math.floor(Math.random() * itemSize) + 1;
      if (count.indexOf(r) === -1) {
        count.push(r);
        newItems.push({
          value: r,
          tone: 240 + r * 4,
          color: {
            r: 0 + r * (255 / itemSize),
            g: 0,
            b: 200 - r * (200 / itemSize),
          },
          defaultColor: {
            r: 0 + r * (255 / itemSize),
            g: 0,
            b: 200 - r * (200 / itemSize),
          },
        });
      }
    }
    setItems(newItems);
  }, [itemSize]);

  const sort = () => {
    switch (algorithm) {
      case "quick":
        console.log("quick sort");
        quickSort(items, 0, items.length - 1, setItems, sortSpeed);
        break;
      case "bubble":
        console.log("bubble sort");
        bubbleSort(items, setItems, sortSpeed);
        break;
      case "insertion":
        console.log("insertion sort");
        insertionSort(items, setItems, sortSpeed);
        break;
      case "selection":
        console.log("selection sort");
        selectionSort(items, setItems, sortSpeed);
        break;
      default:
        console.log("no sort");
    }
  };

  return (
    <div className="w-full">
      <SortArea items={items} sort={sort} />
      <Grid templateColumns={"1fr 1fr 1fr"} alignItems={"center"}>
        <GridItem>
          <ItemCountSelect itemSize={itemSize} setItemSize={setItemSize} />
        </GridItem>
        <GridItem>
          <AlgorithmSelect algorithm={algorithm} setAlgorithm={setAlgorithm} />
        </GridItem>
        <GridItem>
          <SortSpeedSelect sortSpeed={sortSpeed} setSortSpeed={setSortSpeed} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
