import { useState } from "react";
import * as Tone from "tone";
import AlgorithmSelect from "./components/AlgorithmSelect";
import SortArea from "./components/SortArea";

function App() {
  const [algorithm, setAlgorithm] = useState("");
  const synth = new Tone.Synth().toDestination();

  return (
    <div className="w-full">
      <button
        className="bg-blue-500"
        onClick={() => {
          synth.triggerAttackRelease("C4", "8n");
        }}
      >
        play
      </button>
      <SortArea algorithm={algorithm} />
      <AlgorithmSelect algorithm={algorithm} setAlgorithm={setAlgorithm} />
    </div>
  );
}

export default App;
