import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { bubbleSort, insertionSort, quickSort, selectionSort } from "./algos";
import { SortableItem } from "./types/types";
import AlgorithmSelect from "./components/AlgorithmSelect";
import ItemCountSelect from "./components/ItemCountSelect";
import SortSpeedSelect from "./components/SortSpeedSelect";
import SortArea from "./components/SortArea";

import { MdThumbUp, MdThumbsUpDown, MdThumbDown } from "react-icons/md";
import { GrStorage } from "react-icons/gr";

// hack for enabling canceling of sorting with async functions
export let globalSorting = false;
export let globalTempItem: SortableItem = {
  value: 0,
  tone: 0,
  color: { r: 0, g: 0, b: 0 },
  defaultColor: { r: 0, g: 0, b: 0 },
};

function App() {
  const [algorithm, setAlgorithm] = useState("quick");
  const [items, setItems] = useState<SortableItem[]>([]);
  const [itemSize, setItemSize] = useState(30);
  const [sortSpeed, setSortSpeed] = useState(100);
  const [sorting, setSorting] = useState(false);
  const [tempItem, setTempItem] = useState<SortableItem>({
    value: 0,
    tone: 0,
    color: { r: 0, g: 0, b: 0 },
    defaultColor: { r: 0, g: 0, b: 0 },
  });

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

  useEffect(() => {
    globalTempItem = tempItem;
  }, [tempItem]);

  const sort = async () => {
    switch (algorithm) {
      case "quick":
        await quickSort(items, 0, items.length - 1, setItems, sortSpeed);
        break;
      case "bubble":
        await bubbleSort(items, setItems, sortSpeed);
        break;
      case "insertion":
        await insertionSort(items, setItems, setTempItem, sortSpeed);
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
    <Grid templateRows={"2fr 5fr 5fr"}>
      <GridItem></GridItem>
      <GridItem>
        <div className="w-full">
          <SortArea
            algorithm={algorithm}
            items={items}
            tempItem={tempItem}
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
      <GridItem>
        <div className="mt-4 w-full">
          <Card>
            <CardBody>
              <CardHeader>
                <Heading>Quick Sort</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  <Link
                    href="https://en.wikipedia.org/wiki/Quicksort"
                    isExternal
                  >
                    Quicksort <ExternalLinkIcon mx="2px" />
                  </Link>{" "}
                  is a divide-and-conquer algorithm. It works by selecting a
                  'pivot' element from the array and partitioning the other
                  elements into two sub-arrays, according to whether they are
                  less than or greater than the pivot. For this reason, it is
                  sometimes called partition-exchange sort. The sub-arrays are
                  then sorted recursively. This can be done in-place, requiring
                  small additional amounts of memory to perform the sorting.
                </Text>
              </CardBody>
              <Divider />
              <CardFooter alignContent={"center"} pb={0}>
                <Grid
                  templateColumns="1fr 1fr 1fr 1fr"
                  gap={4}
                  w="100%"
                  h="100%"
                >
                  <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Icon
                      title="average complexity"
                      as={MdThumbsUpDown}
                      color="grey.500"
                    />
                    <Text>O(n log n)</Text>
                  </Flex>
                  <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Icon
                      title="best case complexity"
                      as={MdThumbUp}
                      color="grey.500"
                    />
                    <Text>O(n log n)</Text>
                  </Flex>
                  <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Icon
                      title="worst case complexity"
                      as={MdThumbDown}
                      color="grey.500"
                    />
                    <Text>O(n^2)</Text>
                  </Flex>
                  <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Icon title="space" as={GrStorage} color="grey.500" />
                    <Text>O(log n)</Text>
                  </Flex>
                </Grid>
              </CardFooter>
            </CardBody>
          </Card>
        </div>
      </GridItem>
    </Grid>
  );
}

export default App;
