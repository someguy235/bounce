import { Select } from "@chakra-ui/react";

type AlgorithmSelectProps = {
  algorithm: string;
  setAlgorithm: Function;
};
const AlgorithmSelect = ({ algorithm, setAlgorithm }: AlgorithmSelectProps) => {
  return (
    <div className="m-2">
      <Select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="quick">Quick</option>
        <option value="bubble">Bubble</option>
        <option value="insertion">Insertion</option>
        <option value="selection">Selection</option>
      </Select>
    </div>
  );
};

export default AlgorithmSelect;
