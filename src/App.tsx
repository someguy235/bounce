import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { bubbleSort, insertionSort, quickSort, selectionSort } from "./algos";
import { SortableItem } from "./types/types";
import AlgorithmSelect from "./components/AlgorithmSelect";
import ItemCountSelect from "./components/ItemCountSelect";
import SortSpeedSelect from "./components/SortSpeedSelect";
import SortArea from "./components/SortArea";

// hack for enabling canceling of sorting with async functions
export let globalSorting = false;

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

  useEffect(() => {
    globalSorting = sorting;
    if (sorting) {
      sort();
    }
  }, [sorting]);

  const sort = async () => {
    switch (algorithm) {
      case "quick":
        await quickSort(items, 0, items.length - 1, setItems, sortSpeed);
        break;
      case "bubble":
        await bubbleSort(items, setItems, sortSpeed);
        break;
      case "insertion":
        await insertionSort(items, setItems, sortSpeed);
        break;
      case "selection":
        await selectionSort(items, setItems, sortSpeed);
        break;
      default:
      // console.log("no sort");
    }
    setSorting(false);
  };

  return (
    <Grid templateRows={"1fr 1fr 1fr"}>
      <GridItem></GridItem>
      <GridItem>
        <div className="w-full">
          <SortArea
            items={items}
            sort={sort}
            reset={reset}
            sorting={sorting}
            setSorting={setSorting}
          />
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
                sorting={sorting}
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
