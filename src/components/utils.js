export const writeStars = (numStars) => {
  let starString = "";
  for (let i = 0; i < numStars; i++) {
    starString = starString.concat("★");
  }
  return starString;
};
