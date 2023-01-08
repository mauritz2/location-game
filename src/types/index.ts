export type ResourceObjectAmts = {
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

export type Character = {
  character: string;
  objective: Array<string>;
  objectiveBonus: string;
  objectiveText: string;
}