import { logs } from "./constants.js";

export const randomValueFromRange = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

export function generateLogs(type, player1, player2) {
  let date = new Date();
  const hours =
    date.getHours().length === 1 ? `0${date.getHours()}` : date.getHours();

  const minutes =
    date.getHours().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

  const seconds =
    date.getHours().length === 1 ? `0${date.getSeconds()}` : date.getSeconds();

  const timeNow = `[${hours}:${minutes}:${seconds}]`;

  switch (type) {
    case "start": {
      const text = logs["start"]
        .replace("[time]", timeNow)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      return `<p>${text}</p>`;
    }

    case "hit": {
      const text = logs["hit"][randomValueFromRange(0, logs["hit"].length - 1)]
        .replace("[playerDefence]", player2.name)
        .replace("[playerKick]", player1.name);
      return `${timeNow} ${text}`;
    }

    case "draw": {
      const text = logs["draw"];

      return `${timeNow} ${text}`;
    }

    case "end": {
      const text = logs["end"][randomValueFromRange(0, logs["end"].length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);

      return `<p>${timeNow} ${text}</p>`;
    }

    default:
      break;
  }
}
