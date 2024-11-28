export const GRADES = Array.from(Array(7).keys()).map(val => {
  const classNumber = (val + 5).toString();
  return { id: classNumber, title: classNumber };
});
