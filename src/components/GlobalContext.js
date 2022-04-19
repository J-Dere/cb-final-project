import { createContext, useEffect, useState, useReducer } from "react";
import { changeDisplayPropOfBucket, getBookIdByJob } from "./utils";
export const GlobalContext = createContext();

const initialEquipmentState = {
  head: true, //id=34
  body: true, //id=35
  hands: true, //id=37
  legs: true, //id=36
  feet: true, //id=38
  earrings: true, //id=41
  necklace: true, //id=40
};

const initialBooksState = {
  noBook: true, //id=null
  bookDemi: true,
  book1: true,
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
    case "noBook":
      return { ...state, noBook: action.isChecked };
    case "bookDemi":
      return { ...state, bookDemi: action.isChecked };
    case "book1":
      return { ...state, book1: action.isChecked };
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

  const [globalMenuActive, setGlobalMenuActive] = useState(false);

  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const [init, setInit] = useState(false);
  const [fav, setFav] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    //only using one user as proof of concept that database can be used
    fetch(`/api/get-user/0`)
      .then((res) => res.json())
      .then((data) => {
        setFav({ ...data.data.fav });
        setInit(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  //Object containing favourited item objects
  useEffect(() => {
    if (init) {
      fetch(`/api/update-fav/`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: "0", favObject: { ...fav } }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.data.success) {
            setError(true);
          } else {
            setError(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setError(true);
        });
    }
  }, [fav]);

  //set each level bucket with object containing item objects
  useEffect(() => {
    if (job !== null) {
      fetch(`/api/get-recipes/${job}`)
        .then((res) => res.json())
        .then((data) => {
          setlv50Bucket(data.data["1-50"]);
          setlv60Bucket(data.data["51-60"]);
          setlv70Bucket(data.data["61-70"]);
          setlv80Bucket(data.data["71-80"]);
          setlv90Bucket(data.data["81-90"]);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [job]);

  useEffect(() => {
    if (activeRecipeId !== null) {
      fetch(`/api/get-recipe/${activeRecipeId}`)
        .then((res) => res.json())
        .then((data) => {
          setActiveRecipe(data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [activeRecipeId]);

  useEffect(() => {
    //check equip filters
    //show items that match filters
    Object.keys(equipsFilters).forEach((key) => {
      //if filter is checked
      let id = 0;
      switch (true) {
        case key === "head":
          id = 34;
          break;
        case key === "body":
          id = 35;
          break;
        case key === "hands":
          id = 37;
          break;
        case key === "legs":
          id = 36;
          break;
        case key === "feet":
          id = 38;
          break;
        case key === "earrings":
          id = 41;
          break;
        case key === "necklace":
          id = 40;
          break;
        default:
      }
      if (equipsFilters[key]) {
        //display all items that match filter
        setlv50Bucket(changeDisplayPropOfBucket(lv50Bucket, true, "equip", id));
        setlv60Bucket(changeDisplayPropOfBucket(lv60Bucket, true, "equip", id));
        setlv70Bucket(changeDisplayPropOfBucket(lv70Bucket, true, "equip", id));
        setlv80Bucket(changeDisplayPropOfBucket(lv80Bucket, true, "equip", id));
        setlv90Bucket(changeDisplayPropOfBucket(lv90Bucket, true, "equip", id));
      } else {
        //do not display all items that match filter
        setlv50Bucket(
          changeDisplayPropOfBucket(lv50Bucket, false, "equip", id)
        );
        setlv60Bucket(
          changeDisplayPropOfBucket(lv60Bucket, false, "equip", id)
        );
        setlv70Bucket(
          changeDisplayPropOfBucket(lv70Bucket, false, "equip", id)
        );
        setlv80Bucket(
          changeDisplayPropOfBucket(lv80Bucket, false, "equip", id)
        );
        setlv90Bucket(
          changeDisplayPropOfBucket(lv90Bucket, false, "equip", id)
        );
      }
    });

    //check book filters (ignore items that are already not displayed)
    //book ids are based on job
    Object.keys(booksFilters).forEach((key) => {
      let id = getBookIdByJob(job, key);
      if (booksFilters[key]) {
        //display all items that match filter
        setlv50Bucket(changeDisplayPropOfBucket(lv50Bucket, true, "book", id));
        setlv60Bucket(changeDisplayPropOfBucket(lv60Bucket, true, "book", id));
        setlv70Bucket(changeDisplayPropOfBucket(lv70Bucket, true, "book", id));
        setlv80Bucket(changeDisplayPropOfBucket(lv80Bucket, true, "book", id));
        setlv90Bucket(changeDisplayPropOfBucket(lv90Bucket, true, "book", id));
      } else {
        //do not display all items that match filter
        setlv50Bucket(changeDisplayPropOfBucket(lv50Bucket, false, "book", id));
        setlv60Bucket(changeDisplayPropOfBucket(lv60Bucket, false, "book", id));
        setlv70Bucket(changeDisplayPropOfBucket(lv70Bucket, false, "book", id));
        setlv80Bucket(changeDisplayPropOfBucket(lv80Bucket, false, "book", id));
        setlv90Bucket(changeDisplayPropOfBucket(lv90Bucket, false, "book", id));
      }
    });
  }, [job, booksFilters, equipsFilters]);

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
        equipsFilters,
        booksFilters,
        updateBookFilter,
        updateEquipFilter,
        lv50Bucket,
        lv60Bucket,
        lv70Bucket,
        lv80Bucket,
        lv90Bucket,
        globalMenuActive,
        setGlobalMenuActive,
        setActiveRecipeId,
        activeRecipe,
        fav,
        setFav,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
