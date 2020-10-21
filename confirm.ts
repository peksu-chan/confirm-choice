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

//function to execute when the user confirms an answer or time runs out
export const confirmChoice = function (
  user: User,
  question: Question,
  userAnswer: Choice
) {
  //initiate the settings for glicko2
  //maybe move settings outside of the function
  const settings = {
    tau: 0.5,
    rating: 1500,
    rd: 200,
    vol: 0.06,
  };

  // create an instance of glicko2 with the above settings
  const ranking = new glicko2.Glicko2(settings);

  //create a player for the user
  const userPlayer = ranking.makePlayer(user.rating, user.rd, user.vol);

  //create a player for the question
  const questionPlayer = ranking.makePlayer(
    question.rating,
    question.rd,
    question.vol
  );

  //var to store the result
  let result;

  if (userAnswer == question.correctAnswer) {
    //user answers correctly
    result = [userPlayer, questionPlayer, 1];
  } else {
    //user answers incorrectly
    result = [userPlayer, questionPlayer, 0];
  }

  //update the ranking ([] because updateRatings() metod expects an array of results)
  ranking.updateRatings([result]);

  //update the actual user
  user.rating = userPlayer.getRating();
  user.rd = userPlayer.getRd();
  user.vol = userPlayer.getVol();

  //update the actual question
  question.rating = questionPlayer.getRating();
  question.rd = questionPlayer.getRd();
  question.vol = questionPlayer.getVol();

  //update the SEQ page
  //...
};
