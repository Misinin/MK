const $arenas = document.querySelector(".arenas");
const $controlForm = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

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

window.onload = function () {
  const startText = `<p>${generateLogs("start", player1, player2)}</p>`;
  $chat.insertAdjacentHTML("afterbegin", startText);
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
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    const logElement = `<p>${generateLogs("hit", player2, player1)} [-${
      player.value
    }hp] [${player1.hp}/100]</p>`;
    $chat.insertAdjacentHTML("afterbegin", logElement);
  }

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    const logElement = `<p>${generateLogs("hit", player1, player2)} [-${
      enemy.value
    }hp] [${player2.hp}/100]</p>`;
    $chat.insertAdjacentHTML("afterbegin", logElement);
  }

  showResults();
});

function generateLogs(type, player1, player2) {
  let date = new Date();

  switch (type) {
    case "start": {
      const text = logs["start"]
        .replace("[time]", `${date.getHours()}:${date.getMinutes()}`)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      return text;
    }

    case "hit": {
      const text = logs["hit"][randomValueFromRange(0, logs["hit"].length - 1)]
        .replace("[playerDefence]", player2.name)
        .replace("[playerKick]", player1.name);
      return `[${date.getHours()}:${date.getMinutes()}] ${text}`;
    }

    case "draw": {
      const text = logs["draw"];

      return `${text}`;
    }

    case "end": {
      const text = logs["end"][randomValueFromRange(0, logs["end"].length - 1)]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name);

      return `${text}`;
    }

    default:
      break;
  }
}

function showResults(evt) {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.append(showFightResult(player2.name));
    afterGameEnd();
    const endText = `<p>${generateLogs("end", player2, player1)}</p>`;
    $chat.insertAdjacentHTML("afterbegin", endText);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.append(showFightResult(player1.name));
    afterGameEnd();
    const endText = `<p>${generateLogs("end", player1, player2)}</p>`;
    $chat.insertAdjacentHTML("afterbegin", endText);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.append(showFightResult());
    afterGameEnd();
    const startText = `<p>${generateLogs("draw")}</p>`;
    $chat.insertAdjacentHTML("afterbegin", startText);
  }

  if (player1.hp === 0 || player2.hp === 0) {
    evt.target.disabled = true;
    afterGameEnd();
  }
}

function playerAttack() {
  const player = {};

  for (let item of $controlForm) {
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
