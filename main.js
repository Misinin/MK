import { player1, player2 } from "./constants.js";
import { createElement, generateLogs } from "./utils.js";
import { playerAttack, enemyAttack } from "./actions.js";

const $arenas = document.querySelector(".arenas");
const $controlForm = document.querySelector(".control");
const $chat = document.querySelector(".chat");

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));

$controlForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack($controlForm);

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    showKickLog({
      whoKick: player2,
      targetKick: player1,
      kickValue: player.value,
    });
  }

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    showKickLog({
      whoKick: player1,
      targetKick: player2,
      kickValue: enemy.value,
    });
  }

  showResults(evt);
});

window.onload = function () {
  $chat.insertAdjacentHTML(
    "afterbegin",
    generateLogs("start", player1, player2)
  );
};

function createPlayer(player) {
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
}

function createReloadButton() {
  const $buttonContainer = createElement("div", "reloadWrap");
  const $button = createElement("button", "button");
  $button.innerText = "Restart";

  $button.addEventListener("click", () => window.location.reload());

  $buttonContainer.append($button);

  return $buttonContainer;
}

function showResultTitle(name) {
  const $resultTitle = createElement("div", "loseTitle");
  if (name) {
    $resultTitle.innerText = `${name} win`;
  } else {
    $resultTitle.innerText = "draw";
  }

  return $resultTitle;
}

function showResults(evt) {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.append(showResultTitle(player2.name));
    afterGameEnd();
    return;
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.append(showResultTitle(player1.name));
    afterGameEnd();
    return;
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.append(showResultTitle());
    afterGameEnd();
    return;
  }

  if (player1.hp === 0 || player2.hp === 0) {
    evt.target.disabled = true;
    afterGameEnd();
  }
}

function showKickLog({ whoKick, targetKick, kickValue }) {
  const { hp } = targetKick;

  const logElement = `<p>${generateLogs(
    "hit",
    whoKick,
    targetKick
  )} [-${kickValue}hp] [${hp}/100]</p>`;
  $chat.insertAdjacentHTML("afterbegin", logElement);
}

function afterGameEnd() {
  $arenas.append(createReloadButton());
  $chat.insertAdjacentHTML("afterbegin", generateLogs("end", player2, player1));
}
