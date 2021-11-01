import { Player } from "./constants.js";
import { createElement, generateLogs, randomValueFromRange } from "./utils.js";
import { playerAttack } from "./actions.js";

let player1;
let player2;

class Game {
  constructor() {
    this.$arenas = document.querySelector(".arenas");
    this.$controlForm = document
      .querySelector(".control")
      .addEventListener("submit", this.onFightClick);
    this.$chat = document.querySelector(".chat");
  }

  getHeroes = async () => {
    try {
      const res = await fetch(
        "https://reactmarathon-api.herokuapp.com/api/mk/players"
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  onGameLoad = () => {
    this.$chat.insertAdjacentHTML(
      "afterbegin",
      generateLogs("start", player1, player2)
    );
  };

  showKickLog = ({ whoKick, targetKick, kickValue }) => {
    const { hp } = targetKick;

    const logElement = `<p>${generateLogs(
      "hit",
      whoKick,
      targetKick
    )} [-${kickValue}hp] [${hp}/100]</p>`;
    this.$chat.insertAdjacentHTML("afterbegin", logElement);
  };

  onFightClick = async (evt) => {
    evt.preventDefault();

    let kickData;
    const player = playerAttack(evt.target);

    try {
      const res = await fetch(
        "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
        {
          method: "POST",
          body: JSON.stringify({
            hit: player.hit,
            defence: player.defence,
          }),
        }
      );
      kickData = await res.json();
    } catch (error) {
      console.log(error);
    }

    if (kickData.player2.hit !== kickData.player1.defence) {
      player1.changeHP(kickData.player2.value);
      player1.renderHP();
      this.showKickLog({
        whoKick: player2,
        targetKick: player1,
        kickValue: kickData.player2.value,
      });
    }

    if (kickData.player1.hit !== kickData.player2.defence) {
      player2.changeHP(kickData.player1.value);
      player2.renderHP();
      this.showKickLog({
        whoKick: player1,
        targetKick: player2,
        kickValue: kickData.player1.value,
      });
    }

    this.showResults(evt);
  };

  createPlayer = (player) => {
    const { name, hp, img, number } = player;

    const $player = createElement("div", `player${number}`);
    const $progressbar = createElement("div", "progressbar");
    const $life = createElement("div", "life");
    const $name = createElement("div", "name");
    const $character = createElement("div", "character");
    const $image = createElement("img");

    $life.style.width = `${hp}%`;

    $name.innerText = name;

    $image.src = img;

    $character.append($image);
    $progressbar.append($life);
    $progressbar.append($name);
    $player.append($character);
    $player.append($progressbar);

    return $player;
  };

  showResultTitle = (name) => {
    const $resultTitle = createElement("div", "loseTitle");
    if (name) {
      $resultTitle.innerText = `${name} win`;
    } else {
      $resultTitle.innerText = "draw";
    }

    return $resultTitle;
  };

  showResults(evt) {
    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.$arenas.append(this.showResultTitle(player2.name));
      this.afterGameEnd();
      return;
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      this.$arenas.append(this.showResultTitle(player1.name));
      this.afterGameEnd();
      return;
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.$arenas.append(this.showResultTitle());
      this.afterGameEnd();
      return;
    }

    if (player1.hp === 0 || player2.hp === 0) {
      evt.target.disabled = true;
      afterGameEnd();
    }
  }

  createReloadButton = () => {
    const $buttonContainer = createElement("div", "reloadWrap");
    const $button = createElement("button", "button");
    $button.innerText = "Restart";

    $button.addEventListener("click", () => window.location.reload());

    $buttonContainer.append($button);

    return $buttonContainer;
  };

  afterGameEnd = () => {
    this.$arenas.append(this.createReloadButton());
    this.$chat.insertAdjacentHTML(
      "afterbegin",
      generateLogs("end", player2, player1)
    );
  };

  start = async () => {
    const heroes = await this.getHeroes();

    player1 = new Player({
      ...heroes[randomValueFromRange(0, heroes.length - 1)],
      number: 1,
    });
    player2 = new Player({
      ...heroes[randomValueFromRange(0, heroes.length - 1)],
      number: 2,
    });

    this.$arenas.append(this.createPlayer(player1));
    this.$arenas.append(this.createPlayer(player2));
    this.window = window.onload = this.onGameLoad;
  };
}

export default Game;
