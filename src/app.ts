type questionType = {
  id: number;
  answer: string;
};

type answerType = {
  id: number;
  crucialWords: string[];
  answer: string;
};

interface chatInterface {
  activateChatButton: HTMLButtonElement;
  input: HTMLInputElement;
  chatWindow: HTMLDivElement;
  questions: NodeList;
  screen: HTMLDivElement;
  submitButton: HTMLButtonElement;
  clearButon: HTMLButtonElement;
  userQuestionFromInput: string;
  answersForPredefinedQuestions: questionType[];
  answersForUserQuestions: answerType[];
  handleSubmitAnswer(e: Event): void;
  handleButtonClick(): void;
  handlePickQuestion(e: Event): void;
  handleDisplayMessages(message: string, id?: number): void;
  handleDisplay(firstMessage: string, secondMessage: string): void;
  clearChat(): void;
  addListeners(): void;
}

class Chat implements chatInterface {
  constructor(
    public activateChatButton: HTMLButtonElement,
    public input: HTMLInputElement,
    public chatWindow: HTMLDivElement,
    public questions: NodeList,
    public screen: HTMLDivElement,
    public submitButton: HTMLButtonElement,
    public clearButon: HTMLButtonElement
  ) {}

  userQuestionFromInput = "";

  //odpowiedzi na zdefiniowane wcześniej pytania
  answersForPredefinedQuestions = [
    {
      id: 1,
      answer: "Cześć, mam 20 lat",
    },
    {
      id: 2,
      answer: "Piłka nożna, czytanie, jazda na nartach",
    },
    {
      id: 3,
      answer: "Mój ulubiony klub do Real Madryt",
    },
  ];

  answersForUserQuestions = [
    {
      id: 1,
      crucialWords: ["gdzie", "mieszkasz", "skąd", "pochodzisz", "jesteś"],
      answer: "Mieszkam w Wiśle",
    },
    {
      id: 2,
      crucialWords: ["czym", "zajmujesz"],
      answer: "Jestem programistą",
    },
  ];

  //metoda która na podstawie słów kluczy wyszukuje odpowiedznią odpowiedź
  handleSubmitAnswer(e: Event) {
    this.userQuestionFromInput = input.value;

    if (this.userQuestionFromInput === " ") {
      console.log(this.userQuestionFromInput);

      return;
    } else {
      console.log(this.userQuestionFromInput);
      const newInputValue = this.userQuestionFromInput.split(" ");

      let matching = 0;

      let element1 = null;

      for (let element of newInputValue) {
        for (let answer of this.answersForUserQuestions) {
          if (answer.crucialWords.includes(element)) {
            matching++;
            {
              if (matching >= 2) {
                element1 = answer;
              }
            }
          }
        }
      }

      this.handleDisplay(
        this.userQuestionFromInput,
        element1 ? element1.answer : "Na znam odpowiedzi :("
      );
    }
  }
  // metoda która umożliwia odtarcie okna chatu
  handleButtonClick() {
    chatWindow.classList.add("active");
    activateChatButton.classList.add("remove");
  }
  //metoda odpowiadająca za wybór zdefiniowanych wcześniej pytań
  handlePickQuestion(e: Event) {
    const target = e.target as Element;

    this.handleDisplayMessages(
      target.textContent,
      parseFloat(target.getAttribute("data-id"))
    );
  }
  //wyszukiwanie odpowiedzi na podstawie id dla zdefiniowanych wcześniej pytań
  handleDisplayMessages(message: string, id?: number) {
    const message1 = message;
    const answer1 = this.answersForPredefinedQuestions.find((item) => {
      return item.id === id;
    }).answer;

    this.handleDisplay(message1, answer1);
    input.value = " ";
  }
  //metoda która odpowiada za wyświetlanie pyatń i odpowiedzi na ekranie na podstawie otrzymanych danych
  handleDisplay(firstMessage: string, secondMessage: string) {
    const messageHTML = document.createElement("div");
    messageHTML.textContent = firstMessage;
    messageHTML.classList.add("answer");

    const answerHTML = document.createElement("div");
    answerHTML.textContent = secondMessage;
    answerHTML.classList.add("question");

    this.screen.appendChild(messageHTML);
    this.screen.appendChild(answerHTML);
    input.value = " ";
  }

  //metoda która czyści okno chatu
  clearChat() {
    const answers = document.querySelectorAll(".answer");
    const questions = document.querySelectorAll(".question");

    for (let answer of answers) {
      answer.remove();
    }

    for (let question of questions) {
      question.remove();
    }
  }

  // metoda dodająca listenery na poszczególne elementy
  addListeners() {
    activateChatButton.addEventListener("click", this.handleButtonClick);
    questions.forEach((question) => {
      question.addEventListener("click", (e) => this.handlePickQuestion(e));
    });
    submitButton.addEventListener("click", (e) => this.handleSubmitAnswer(e));
    clearButon.addEventListener("click", this.clearChat);
  }
}

///
const activateChatButton = document.querySelector(
  ".activateButton"
) as HTMLButtonElement;
const input = document.querySelector(".input") as HTMLInputElement;
const chatWindow = document.querySelector(".chatContainer") as HTMLDivElement;
const questions = document.querySelectorAll(".singleQuestion");
const screenContainer = document.querySelector(
  ".screenContainer"
) as HTMLDivElement;
const submitButton = document.querySelector(
  ".submitButton"
) as HTMLButtonElement;

const clearButon = document.querySelector(".clearButton") as HTMLButtonElement;

const chat = new Chat(
  activateChatButton,
  input,
  chatWindow,
  questions,
  screenContainer,
  submitButton,
  clearButon
);

chat.addListeners();
