export type ResourceObjectAmounts = {
  coins: number;
  armor: number;
  herbs: number;
  scrolls: number;
  bones: number;
};

export type ActionObject = {
  action: string;
  location: string;
  action_details: any;
  player_id?: string;
};

export type LocationActionsFormProps = {
  onSubmit: (data: ActionObject) => void;
  showSubmit: boolean;
}

export type CurrentPlayer = {
  player_name: string;
  player_id: string;
};

export type CharacterType = {
  character: string;
  objective: Array<string>;
  objectiveBonus: string;
  objectiveText: string;
}

export type Characters = {
  easing: "ease-in" | "ease-out" | "ease-in-out";
}