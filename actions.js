import { ATTACK, HIT } from "./constants.js";
import { randomValueFromRange } from "./utils.js";

export function playerAttack(controlForm) {
  const player = {};

  for (let item of controlForm) {
    if (item.checked && item.name === "hit") {
      player.value = randomValueFromRange(1, HIT[item.value]);
      player.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      player.defence = item.value;
    }

    item.checked = false;
  }

  return player;
}
