export const isAnswerCorrect = (correctAnswer, userAnswer) => {
  if (!correctAnswer || correctAnswer === '-') {
    return true;
  }

  return typeof correctAnswer === 'string'
    ? correctAnswer
        .split(';')
        .some(
          val =>
            val.trim().toLowerCase() === userAnswer?.trim?.().toLowerCase?.(),
        )
    : true;
};
