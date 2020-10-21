import glicko2 = require("glicko2");

export enum Choice {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export interface User {
  rating: number;
  rd: number;
  vol: number;
}

export interface Question {
  correctAnswer: Choice;
  rating: number;
  rd: number;
  vol: number;
}

//let choice: Choice = Choice.A;

/*
  function to execute when the user confirms an answer or time runs out
  if time runs out then choice = "timeRanOut"
*/
export const confirmChoice = function (
  user: User,
  question: Question,
  userAnswer: Choice
) {
  //initiate the settings for glicko2
  const settings = {
    tau: 0.5,
    rating: 1500,
    rd: 200,
    vol: 0.06,
  };

  // create an instance of glicko2 with the above settings
  const ranking = new glicko2.Glicko2(settings);

  //create a player to simulate the user
  const userPlayer = ranking.makePlayer(user.rating, user.rd, user.vol);

  //create a player to simulate the question
  const questionPlayer = ranking.makePlayer(
    question.rating,
    question.rd,
    question.vol
  );

  //we will actually have only one match
  const matches = [];

  if (userAnswer == question.correctAnswer) {
    //user answers correctly
    matches.push([userPlayer, questionPlayer, 1]);
  } else {
    //user answers incorrectly
    matches.push([userPlayer, questionPlayer, 0]);
  }

  //update
  ranking.updateRatings(matches);

  //update the actual user
  user.rating = userPlayer.getRating();
  user.rd = userPlayer.getRd();
  user.vol = userPlayer.getVol();

  //update the actual question
  question.rating = questionPlayer.getRating();
  question.rd = questionPlayer.getRd();
  question.vol = questionPlayer.getVol();

  //update the SEQ page
};
