import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { GrStorage } from "react-icons/gr";
import { MdThumbDown, MdThumbUp, MdThumbsUpDown } from "react-icons/md";
import { FaWikipediaW } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { AlgoInfo } from "../types/types";

const algoInfo: AlgoInfo = {
  quick: {
    name: "Quick Sort",
    description:
      " is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. For this reason, it is sometimes called partition-exchange sort. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.",
    complexity: {
      average: "O(n log n)",
      worst: "O(n^2)",
      best: "O(n log n)",
      space: "O(log n)",
    },
    link: "https://en.wikipedia.org/wiki/Quicksort",
    stable: false,
  },
  bubble: {
    name: "Bubble Sort",
    description:
      " is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed. These passes through the list are repeated until no swaps had to be performed during a pass, meaning that the list has become fully sorted. The algorithm, which is a comparison sort, is named for the way the larger elements 'bubble' up to the top of the list. ",
    complexity: {
      average: "O(n^2)",
      worst: "O(n^2)",
      best: "O(n)",
      space: "O(1)",
    },
    link: "https://en.wikipedia.org/wiki/Bubble_sort",
    stable: true,
  },
  insertion: {
    name: "Insertion Sort",
    description:
      " iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.",
    complexity: {
      average: "O(n^2)",
      worst: "O(n^2)",
      best: "O(n)",
      space: "O(1)",
    },
    link: "https://en.wikipedia.org/wiki/Insertion_sort",
    stable: true,
  },
  selection: {
    name: "Selection Sort",
    description:
      " divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right. ",
    complexity: {
      average: "O(n^2)",
      worst: "O(n^2)",
      best: "O(n^2)",
      space: "O(1)",
    },
    link: "https://en.wikipedia.org/wiki/Selection_sort",
    stable: false,
  },
};

type InfoCardProps = {
  algorithm: string;
};
const InfoCard = ({ algorithm }: InfoCardProps) => {
  const { name, description, complexity, link, stable } = algoInfo[algorithm];
  return (
    <Card>
      <CardBody>
        <CardHeader>
          <Heading>{name}</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            <Link href={link} isExternal>
              {name} <ExternalLinkIcon mx="2px" />
            </Link>
            {description}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter alignContent={"center"} pb={0}>
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4} w="100%" h="100%">
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
              <Icon
                title="average complexity"
                as={MdThumbsUpDown}
                color="grey.500"
              />
              <Text>{complexity.average}</Text>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
              <Icon
                title="best case complexity"
                as={MdThumbUp}
                color="grey.500"
              />
              <Text>{complexity.best}</Text>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
              <Icon
                title="worst case complexity"
                as={MdThumbDown}
                color="grey.500"
              />
              <Text>{complexity.worst}</Text>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
              <Icon title="space" as={GrStorage} color="grey.500" />
              <Text>{complexity.space}</Text>
            </Flex>
          </Grid>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
