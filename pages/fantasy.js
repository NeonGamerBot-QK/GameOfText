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
        setState: { friends: true },

        nextText: 3,
      },
      {
        text: "You explore the world",
        setState: { knowledge: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text: "People tell you that this is a planet which is just like an RPG and you make some friends!",
    options: [
      {
        text: "Explore the world",
        setState: { knowledge: true },
        nextText: 4,
      },
      {
        text: "You sit on a bench on a park",
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: "You learn that this world is going to be attacked by monsters...",
    options: [
      {
        text: "You get ready to fight!",
        setState: { fight: true },
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "You hide in the nearest building",
        setState: { shelter: true },
        nextText: 6,
      },
      { text: "You ignore it as it's probably just a rumour", nextText: 5 },
    ],
  },
  {
    id: 5,
    text: "You hear some rumbling noises... And then you are killed by the monsters...",
    options: [{ text: "Restart", nextText: -1 }],
  },
  {
    id: 6,
    text: "The monsters arrived... And they are just beside the building you're in.",
    options: [
      {
        text: "You get out of the building and seek shelter somewhere else",
        requiredState: (currentState) => currentState.shelter,
        nextText: 8,
      },
      {
        text: "You stay where you are",
        requiredState: (currentState) => currentState.shelter,
        nextText: 5,
      },
    ],
  },
];

startGame();
