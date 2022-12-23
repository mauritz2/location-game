export type ResourceObjectAmts = {
  coins: number;
  armor: number;
  herbs: number;
  scrolls: number;
  corpses: number;
};

export type ActionObject = {
  action: string;
  location: string;
  action_details: string | null;
  player_id?: string;
};

export type CurrentPlayer = {
  player_name: string;
  player_id: string;
};

export type Character = {
  "character": string;
  "objective": string;
  "bonus": string;
} | undefined;