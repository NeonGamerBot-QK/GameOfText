const textElement = document.getElementById("text");
const optionButtons = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerHTML = textNode.text;
}

function selectOption(option) {}

const textNodes = [
  {
    id: 1,
    text: "You see a sword beside you...",
    options: [
      { text: "Take it", setState: { sword: true }, nextText: 2 },
      { text: "Leave it", nextText: 2 },
    ],
  },
  {
    id: 2,
  },
];

startGame();
