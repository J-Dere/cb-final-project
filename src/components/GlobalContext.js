import { createContext, useEffect, useState, useReducer } from "react";
import { SEARCH_QUERY, getItemsFromAPI, getRecipeFromID } from "./utils";
export const GlobalContext = createContext();

const initialEquipmentState = {
  head: true,
  body: true,
  hands: true,
  legs: true,
  feet: true,
  earrings: true,
  necklace: true,
};

const initialBooksState = {
  noBooks: false,
  bookDemi: true,
  book1: true,
  book2: true,
  book3: true,
  book4: true,
  book5: true,
  book6: true,
  book7: true,
  book8: true,
  book9: true,
};

const booksReducer = (state, action) => {
  switch (action.type) {
    case "bookDemi":
      return { ...state, bookDemi: action.isChecked };
    case "book1":
      return { ...state, book1: action.isChecked };
    case "book2":
      return { ...state, book2: action.isChecked };
    case "book3":
      return { ...state, book3: action.isChecked };
    case "book4":
      return { ...state, book4: action.isChecked };
    case "book5":
      return { ...state, book5: action.isChecked };
    case "book6":
      return { ...state, book6: action.isChecked };
    case "book7":
      return { ...state, book7: action.isChecked };
    case "book8":
      return { ...state, book8: action.isChecked };
    case "book9":
      return { ...state, book9: action.isChecked };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

const equipsReducer = (state, action) => {
  switch (action.type) {
    case "head":
      return { ...state, head: action.isChecked };
    case "body":
      return { ...state, body: action.isChecked };
    case "hands":
      return { ...state, hands: action.isChecked };
    case "legs":
      return { ...state, legs: action.isChecked };
    case "feet":
      return { ...state, feet: action.isChecked };
    case "earrings":
      return { ...state, earrings: action.isChecked };
    case "necklace":
      return { ...state, necklace: action.isChecked };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const GlobalProvider = ({ children }) => {
  //job will be set to the job ID number of the chosen job
  const [job, setJob] = useState(null);
  const [booksFilters, booksDispatch] = useReducer(
    booksReducer,
    initialBooksState
  );
  const [equipsFilters, equipsDispatch] = useReducer(
    equipsReducer,
    initialEquipmentState
  );
  const [lv50Bucket, setlv50Bucket] = useState({});
  const [lv60Bucket, setlv60Bucket] = useState({});
  const [lv70Bucket, setlv70Bucket] = useState({});
  const [lv80Bucket, setlv80Bucket] = useState({});
  const [lv90Bucket, setlv90Bucket] = useState({});

  useEffect(() => {
    const asyncInCallback = async () => {
      if (job !== null) {
        let queryString = "";
        //set job in query
        queryString = queryString.concat(`,ClassJob.ID=${job}`);

        //Filtering requires multiple queries, maybe filter on data locally instead of through query?
        //check books filters
        // for (let i = 1; i < Object.values(booksFilters).length; i++) {
        //   //if the don't check books flag is false
        //   if (!Object.values(booksFilters)[0]) {
        //     if (Object.values(booksFilters)[i]) {
        //     }
        //   } else {
        //     queryString = queryString.concat(",SecretRecipeBook!!");
        //   }
        // }

        const allRecipes = await getItemsFromAPI(
          SEARCH_QUERY.concat(queryString)
        );
        // console.log("in use effect", Object.keys(allRecipes).length);
        let temp50Bucket = {};
        let temp60Bucket = {};
        let temp70Bucket = {};
        let temp80Bucket = {};
        let temp90Bucket = {};
        for (let i = 0; i < Object.keys(allRecipes).length; i++) {
          //Variable declaration of a key must be done between []
          switch (true) {
            case allRecipes[Object.keys(allRecipes)[i]].RecipeLevelTable
              .ClassJobLevel <= 50:
              temp50Bucket = {
                ...temp50Bucket,
                [Object.keys(allRecipes)[i]]: {
                  display: true,
                  data: allRecipes[Object.keys(allRecipes)[i]],
                },
              };
              break;
            case allRecipes[Object.keys(allRecipes)[i]].RecipeLevelTable
              .ClassJobLevel <= 60:
              temp60Bucket = {
                ...temp60Bucket,
                [Object.keys(allRecipes)[i]]: {
                  display: true,
                  data: allRecipes[Object.keys(allRecipes)[i]],
                },
              };
              break;
            case allRecipes[Object.keys(allRecipes)[i]].RecipeLevelTable
              .ClassJobLevel <= 70:
              temp70Bucket = {
                ...temp70Bucket,
                [Object.keys(allRecipes)[i]]: {
                  display: true,
                  data: allRecipes[Object.keys(allRecipes)[i]],
                },
              };
              break;
            case allRecipes[Object.keys(allRecipes)[i]].RecipeLevelTable
              .ClassJobLevel <= 80:
              temp80Bucket = {
                ...temp80Bucket,
                [Object.keys(allRecipes)[i]]: {
                  display: true,
                  data: allRecipes[Object.keys(allRecipes)[i]],
                },
              };
              break;
            case allRecipes[Object.keys(allRecipes)[i]].RecipeLevelTable
              .ClassJobLevel <= 90:
              temp90Bucket = {
                ...temp90Bucket,
                [Object.keys(allRecipes)[i]]: {
                  display: true,
                  data: allRecipes[Object.keys(allRecipes)[i]],
                },
              };
              break;
            default:
          }
        }
        setlv50Bucket(temp50Bucket);
        setlv60Bucket(temp60Bucket);
        setlv70Bucket(temp70Bucket);
        setlv80Bucket(temp80Bucket);
        setlv90Bucket(temp90Bucket);
      }
    };
    asyncInCallback();
  }, [job]);

  //just a check on contents for debug purposes
  useEffect(() => {
    console.log("lv50 size", Object.keys(lv50Bucket).length);
  }, [lv50Bucket]);
  useEffect(() => {
    console.log("lv60 size", Object.keys(lv60Bucket).length);
  }, [lv60Bucket]);
  useEffect(() => {
    console.log("lv70 size", Object.keys(lv70Bucket).length);
  }, [lv70Bucket]);
  useEffect(() => {
    console.log("lv80 size", Object.keys(lv80Bucket).length);
  }, [lv80Bucket]);
  useEffect(() => {
    console.log("lv90 size", Object.keys(lv90Bucket).length);
  }, [lv90Bucket]);

  const updateBookFilter = (type, isChecked) => {
    booksDispatch({ type: type, isChecked });
  };

  const updateEquipFilter = (type, isChecked) => {
    equipsDispatch({ type: type, isChecked });
  };

  return (
    <GlobalContext.Provider
      value={{
        job,
        setJob,
        updateBookFilter,
        updateEquipFilter,
        lv50Bucket,
        lv60Bucket,
        lv70Bucket,
        lv80Bucket,
        lv90Bucket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
