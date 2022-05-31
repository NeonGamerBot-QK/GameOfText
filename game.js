const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerHTML = textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

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
    text: "You open a strange door and find yourself in a world, which is weirdly beautiful.",
    options: [
      {
        text: "You ask people where you are",
        //requiredState: (currentState) => currentState.sword,
        nextText: 3,
      },
      { text: "You explore the world", nextText: 4 },
    ],
  },
];

startGame();
