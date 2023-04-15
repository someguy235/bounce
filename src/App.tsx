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
  const reset = () => {
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
  };

  useEffect(() => {
    reset();
  }, [itemSize]);

  const sort = async () => {
    setSorting(true);
    switch (algorithm) {
      case "quick":
        console.log("quick sort");
        await quickSort(items, 0, items.length - 1, setItems, sortSpeed);
        break;
      case "bubble":
        console.log("bubble sort");
        await bubbleSort(items, setItems, sortSpeed);
        break;
      case "insertion":
        console.log("insertion sort");
        await insertionSort(items, setItems, sortSpeed);
        break;
      case "selection":
        console.log("selection sort");
        await selectionSort(items, setItems, sortSpeed);
        break;
      default:
        console.log("no sort");
    }
    setSorting(false);
  };

  return (
    <Grid templateRows={"1fr 1fr 1fr"}>
      <GridItem></GridItem>
      <GridItem>
        <div className="w-full">
          <SortArea items={items} sort={sort} reset={reset} sorting={sorting} />
          <Grid templateColumns={"1fr 1fr 1fr"} alignItems={"center"} gap={4}>
            <GridItem>
              <ItemCountSelect
                itemSize={itemSize}
                setItemSize={setItemSize}
                sorting={sorting}
              />
            </GridItem>
            <GridItem>
              <AlgorithmSelect
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
              />
            </GridItem>
            <GridItem>
              <SortSpeedSelect
                sortSpeed={sortSpeed}
                setSortSpeed={setSortSpeed}
                sorting={sorting}
              />
            </GridItem>
          </Grid>
        </div>
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
}

export default App;
