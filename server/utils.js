const request = require("request-promise");

const SEARCH_QUERY =
  "https://xivapi.com/search?indexes=Recipe&columns=ID,ItemResult.IconHD,Name,ClassJob.NameEnglish,RecipeLevelTable.ClassJobLevel,RecipeLevelTable.Stars,ItemResult.ItemUICategory.Name,ItemResult.ItemUICategory.ID,SecretRecipeBook.Name,SecretRecipeBook.ID&sort_field=RecipeLevelTable.ClassJobLevel&filters=ItemResult.LevelItem=1,ItemResult.EquipSlotCategoryTargetID>0,ItemResult.EquipSlotCategoryTargetID<22,ItemResult.BaseParamValue0=0";

const getItemsFromAPI = async (query) => {
  let Page = 1;
  let PageTotal = 1;
  //Get pagination information for num pages
  await request(`${query}`)
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
      const res = await request(`${query}&Page=${Page}`);
      const data = await JSON.parse(res);
      let PageNext = data.Pagination.PageNext;
      data.Results.forEach((item) => {
        container[item.ID] = item;
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

module.exports = {
  getItemsFromAPI,
  getRecipeFromID,
  SEARCH_QUERY,
};
