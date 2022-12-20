import Cookies from "universal-cookie";

/* COOKIE SETTING AND GETTING */
const cookies = new Cookies();

export function setUUIDCookie() {
  // TODO - replace with uuid. For some reason importing "uuid" doesn't work
  // TODO - check if cookie already exists and also set new UID if not
  const player_id = Math.floor(Math.random() * 1000000000);
  cookies.set("player_id", player_id);
}

export function getUUIDFromCookie() {
  const player_id = cookies.get("player_id");
  return player_id;
}
