const $arenas = document.querySelector(".arenas");
const $controlForm = document.querySelector(".control");

const player1 = {
  number: 1,
  name: "scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: [],
  changeHP,
  elHP,
  renderHP,
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
  changeHP,
  elHP,
  renderHP,
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

$controlForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const enemy = enemyAttack();
  const attack = {};

  for (let item of $controlForm) {
    if (item.checked && item.name === "hit") {
      attack.value = randomValueFromRange(1, HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  if (enemy.hit === attack.defence) {
    player1.changeHP(0);
    player1.renderHP();
  }

  if (attack.hit === enemy.defence) {
    player2.changeHP(0);
    player2.renderHP();
  }

  player1.changeHP(enemy.value);
  player1.renderHP();
  player2.changeHP(attack.value);
  player2.renderHP();

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.append(showFightResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.append(showFightResult(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.append(showFightResult());
  }

  if (player1.hp === 0 || player2.hp === 0) {
    evt.target.disabled = true;
    afterGameEnd();
  }
});

function enemyAttack() {
  const hit = ATTACK[randomValueFromRange(0, ATTACK.length - 1)];
  const defence = ATTACK[randomValueFromRange(0, ATTACK.length - 1)];

  return { value: HIT[hit], hit, defence };
}

function afterGameEnd() {
  $arenas.append(createReloadButton());

  const $reloadWrap = document.querySelector(".reloadWrap");

  $reloadWrap.addEventListener("click", () => window.location.reload());
}

function showFightResult(name) {
  const $resultTitle = createElement("div", "loseTitle");
  if (name) {
    $resultTitle.innerText = `${name} win`;
  } else {
    $resultTitle.innerText = "draw";
  }

  return $resultTitle;
}

function randomValueFromRange(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function changeHP(value) {
  this.hp -= value;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  const number = this.number;
  const $hpPlayer = document.querySelector(`.player${number} .life`);
  return $hpPlayer;
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
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

function createReloadButton() {
  const $buttonContainer = createElement("div", "reloadWrap");
  const $button = createElement("button", "button");
  $button.innerText = "Restart";

  $buttonContainer.append($button);

  return $buttonContainer;
}

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));
