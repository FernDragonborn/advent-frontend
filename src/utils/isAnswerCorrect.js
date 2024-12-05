export const isAnswerCorrect = (correctAnswer, userAnswer) =>
  correctAnswer && correctAnswer !== '-' && userAnswer !== correctAnswer;
