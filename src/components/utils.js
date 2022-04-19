export const writeStars = (numStars) => {
  let starString = "";
  for (let i = 0; i < numStars; i++) {
    starString = starString.concat("★");
  }
  return starString;
};

export const changeDisplayPropOfBucket = (
  itemBucket,
  display,
  filterType,
  idToMatch
) => {
  for (let i = 0; i < Object.keys(itemBucket).length; i++) {
    if (filterType === "equip") {
      if (
        itemBucket[Object.keys(itemBucket)[i]].data.ItemResult.ItemUICategory
          .ID === idToMatch
      ) {
        itemBucket[Object.keys(itemBucket)[i]].equipDisplay = display;
      }
    }
    if (filterType === "book") {
      if (
        itemBucket[Object.keys(itemBucket)[i]].data.SecretRecipeBook.ID ===
        idToMatch
      ) {
        itemBucket[Object.keys(itemBucket)[i]].bookDisplay = display;
      }
    }
  }
  return { ...itemBucket };
};

export const getBookIdByJob = (jobId, book) => {
  //This is going to be a lot of spaghetti
  //Probably a better way of doing it would be to do some math with modulo
  //check job
  switch (true) {
    //armorer
    case jobId === "10":
      switch (true) {
        case book === "noBook":
          return null;
        case book === "bookDemi":
          return 19;
        case book === "book1":
          return 3;
        case book === "book3":
          return 34;
        case book === "book4":
          return 42;
        case book === "book5":
          return 50;
        case book === "book6":
          return 58;
        case book === "book7":
          return 66;
        case book === "book8":
          return 74;
        case book === "book9":
          return 82;
        default:
      }
      break;
    //goldsmith
    case jobId === "11":
      switch (true) {
        case book === "noBook":
          return null;
        case book === "bookDemi":
          return 20;
        case book === "book1":
          return 4;
        case book === "book3":
          return 35;
        case book === "book4":
          return 43;
        case book === "book5":
          return 51;
        case book === "book6":
          return 59;
        case book === "book7":
          return 67;
        case book === "book8":
          return 75;
        case book === "book9":
          return 83;
        default:
      }
      break;
    //leatherworker
    case jobId === "12":
      switch (true) {
        case book === "noBook":
          return null;
        case book === "bookDemi":
          return 21;
        case book === "book1":
          return 5;
        case book === "book3":
          return 36;
        case book === "book4":
          return 44;
        case book === "book5":
          return 52;
        case book === "book6":
          return 60;
        case book === "book7":
          return 68;
        case book === "book8":
          return 76;
        case book === "book9":
          return 84;
        default:
      }
      break;
    //weaver
    case jobId === "13":
      switch (true) {
        case book === "noBook":
          return null;
        case book === "bookDemi":
          return 22;
        case book === "book1":
          return 6;
        case book === "book3":
          return 37;
        case book === "book4":
          return 45;
        case book === "book5":
          return 53;
        case book === "book6":
          return 61;
        case book === "book7":
          return 69;
        case book === "book8":
          return 77;
        case book === "book9":
          return 85;
        default:
      }
      break;
    //alchemist
    case jobId === "14":
      switch (true) {
        case book === "noBook":
          return null;
        case book === "bookDemi":
          return 13;
        case book === "book1":
          return 7;
        case book === "book3":
          return 38;
        case book === "book4":
          return 46;
        case book === "book5":
          return 54;
        case book === "book6":
          return 62;
        case book === "book7":
          return 70;
        case book === "book8":
          return 78;
        case book === "book9":
          return 86;
        default:
      }
      break;
    default:
  }
};
