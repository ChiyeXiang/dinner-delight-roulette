
export type TagType = {
  id: string;
  emoji: string;
  name: string;
  color: string;
};

export type DinnerOption = {
  id: string;
  name: string;
  tags: string[];
  weight: number;
  lastChosen?: string | null;
};

export type RouletteState = {
  spinning: boolean;
  selectedOption: DinnerOption | null;
  showResult: boolean;
};
