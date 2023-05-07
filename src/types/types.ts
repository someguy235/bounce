export type AlgoInfo = {
  [key: string]: {
    name: string;
    description: string;
    complexity: {
      average: string;
      worst: string;
      best: string;
      space: string;
    };
    link: string;
    stable: boolean;
  };
};

export type SortableItem = {
  value: number;
  tone: number;
  color: {
    r: number;
    g: number;
    b: number;
  };
  defaultColor: {
    r: number;
    g: number;
    b: number;
  };
};
