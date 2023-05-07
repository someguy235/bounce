import { Select } from "@chakra-ui/react";

type AlgorithmSelectProps = {
  algorithm: string;
  setAlgorithm: Function;
  sorting: boolean;
};
const AlgorithmSelect = ({
  algorithm,
  setAlgorithm,
  sorting,
}: AlgorithmSelectProps) => {
  return (
    <div className="m-2">
      <Select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        isDisabled={sorting}
      >
        <option value="bubble">Bubble</option>
        <option value="insertion">Insertion</option>
        <option value="merge">Merge</option>
        <option value="quick">Quick</option>
        <option value="selection">Selection</option>
      </Select>
    </div>
  );
};

export default AlgorithmSelect;
