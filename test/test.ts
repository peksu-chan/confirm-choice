import { Choice, User, Question, confirmChoice } from "../confirm";

const question: Question = {
  correctAnswer: Choice.A,
  rating: 1944,
  rd: 59.5,
  vol: 0.04,
};

const user: User = {
  rating: 1763,
  rd: 61.5,
  vol: 0.06,
};

const choice: Choice = Choice.A;

console.log(`User's initial rating: ${user.rating}`);
console.log(`Question's initial rating: ${question.rating}`);
console.log(`User answers ${choice.toUpperCase()} to the question`);
console.log(
  `Correct answer to the question is ${question.correctAnswer.toUpperCase()}`
);

console.log("---------------");

confirmChoice(user, question, choice);

console.log(`User's current rating: ${Math.round(user.rating)}`);
console.log(`Question's current rating: ${Math.round(question.rating)}`);
