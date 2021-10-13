const player1 = {
  name: "scorpion",
  hp: 60,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} fight{this.name} Fight...`);
  },
};

const player2 = {
  name: "kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} fight{this.name} Fight...`);
  },
};

function createPlayer(className, hero) {
  const { name, hp, img } = hero;

  const $arenas = document.querySelector(".arenas");

  const $player = document.createElement("div");
  $player.classList.add(className);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = `${hp}%`;

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = name;

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $image = document.createElement("img");
  $image.src = img;

  $character.append($image);
  $progressbar.append($life);
  $progressbar.append($name);
  $player.append($character);
  $player.append($progressbar);

  $arenas.append($player);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
