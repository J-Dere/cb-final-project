import { createContext, useEffect, useState, useReducer } from "react";
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

  //just a check on contents for debug purposes
  // useEffect(() => {
  //   console.log("lv50 size", Object.keys(lv50Bucket).length);
  // }, [lv50Bucket]);
  // useEffect(() => {
  //   console.log("lv60 size", Object.keys(lv60Bucket).length);
  // }, [lv60Bucket]);
  // useEffect(() => {
  //   console.log("lv70 size", Object.keys(lv70Bucket).length);
  // }, [lv70Bucket]);
  // useEffect(() => {
  //   console.log("lv80 size", Object.keys(lv80Bucket).length);
  // }, [lv80Bucket]);
  // useEffect(() => {
  //   console.log("lv90 size", Object.keys(lv90Bucket).length);
  // }, [lv90Bucket]);
  // useEffect(() => {
  //   console.log("active recipe updated", activeRecipe);
  // }, [activeRecipe]);

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
