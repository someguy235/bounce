type AlgorithmSelectProps = {
  algorithm: string;
  setAlgorithm: Function;
};
const AlgorithmSelect = ({ algorithm, setAlgorithm }: AlgorithmSelectProps) => {
  return (
    <div className="m-2">
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="bubble">Bubble</option>
        <option value="insertion">Insertion</option>
        <option value="selection">Selection</option>
      </select>
    </div>
  );
};

export default AlgorithmSelect;
