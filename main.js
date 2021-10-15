const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".control");

const player1 = {
  number: 1,
  name: "scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const player2 = {
  number: 2,
  name: "kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

$randomButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (player1.hp <= 0) {
    $arenas.append(playerWin(player2.name));
    evt.target.disabled = true;
  }

  if (player2.hp <= 0) {
    $arenas.append(playerWin(player1.name));
    evt.target.disabled = true;
  }

  changeHp(player1);
  changeHp(player2);
});

function playerWin(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = `${name} win`;

  return $loseTitle;
}

function randomValueFromRange(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function changeHp(player) {
  const $hpPlayer1 = document.querySelector(`.player${player.number} .life`);
  player.hp -= randomValueFromRange(1, 20);
  $hpPlayer1.style.width = `${player.hp}%`;
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

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

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));
