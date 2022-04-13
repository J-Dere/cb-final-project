const request = require("request-promise");

const SEARCH_QUERY =
  "https://xivapi.com/search?indexes=Recipe&filters=ItemResult.LevelItem=1,ItemResult.EquipSlotCategoryTargetID>0,ItemResult.EquipSlotCategoryTargetID<22,ItemResult.BaseParamValue0=0&columns=ID,Icon,Name,ClassJob.NameEnglish,RecipeLevelTable.ClassJobLevel,ItemResult.ItemUICategory.Name&sort_field=RecipeLevelTable.ClassJobLevel";

const getRecipeFromID = async (id) => {
  let recipe = null;
  try {
    const res = await request(`https://xivapi.com/Recipe/${id}`);
    const data = await JSON.parse(res);
    if (!data.Error) {
      recipe = data;
    }
  } catch (err) {
    console.log("err", err);
  }
  return recipe;
};

const getItemsFromAPI = async () => {
  let Page = 1;
  let PageTotal = 1;
  //Get pagination information for num pages
  await request(`${SEARCH_QUERY}`)
    .then((res) => JSON.parse(res))
    .then((data) => {
      PageTotal = data.Pagination.PageTotal;
    })
    .catch((err) => {
      console.log("err", err);
    });

  let breakout = false;
  let container = {};
  try {
    while (Page <= PageTotal && !breakout) {
      const res = await request(`${SEARCH_QUERY}&Page=${Page}`);
      const data = await JSON.parse(res);
      let PageNext = data.Pagination.PageNext;
      data.Results.forEach((item) => {
        container[item.ID] = getRecipeFromID(item.ID);
      });

      if (PageNext === null) {
        breakout = true;
      }
      if (!breakout) {
        Page++;
      }
    }
  } catch (err) {
    console.log("err", err);
  }
  return container;
};

getItemsFromAPI().then((res) => {
  let container = {};
  // for (let i = 0; i < Object.keys(res).length; i++) {
  //   const recipeID = res[Object.keys(res)[i]].Recipes[0].ID;
  //   console.log(recipeID);
  //   // getRecipeFromID(recipeID).then((recipeRes) => {
  //   //   container[recipeID] = recipeRes;
  //   // });
  // }
  console.log(Object.keys(res).length);
});
