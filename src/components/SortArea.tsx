type SortableItem = {
  value: number;
  height: number;
  tone: string;
  color: string;
};

type SortAreaProps = {
  algorithm: string;
};
const SortArea = ({ algorithm }: SortAreaProps) => {
  // create array of unique random numbers from 1 to 100
  const bars = [];
  while (bars.length < 100) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (bars.indexOf(r) === -1) bars.push(r);
  }

  return (
    <div className="my-2 w-full border-2">
      {/* <div className="w-full">SortArea: {algorithm}</div> */}
      <div className="flex w-full items-end">
        {bars.map((height: number) => (
          <span
            style={{ height: `${height * 3}px` }}
            className={`m-px flex-1 bg-blue-500`}
          >
            &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default SortArea;
