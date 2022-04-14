export const SEARCH_QUERY =
  "https://xivapi.com/search?indexes=Recipe&columns=ID,Icon,Name,ClassJob.NameEnglish,RecipeLevelTable.ClassJobLevel,ItemResult.ItemUICategory.Name,ItemResult.ItemUICategory.ID,SecretRecipeBook.Name,SecretRecipeBook.ID&sort_field=RecipeLevelTable.ClassJobLevel&filters=ItemResult.LevelItem=1,ItemResult.EquipSlotCategoryTargetID>0,ItemResult.EquipSlotCategoryTargetID<22,ItemResult.BaseParamValue0=0";

export const getItemsFromAPI = async (query) => {
  let Page = 1;
  let PageTotal = 1;
  //Get pagination information for num pages
  await fetch(`${query}`)
    .then((res) => res.json())
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
      const res = await fetch(`${query}&Page=${Page}`);
      const data = await res.json();
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
  console.log(Object.keys(container).length);
  return container;
};

export const getRecipeFromID = async (id) => {
  let recipe = null;
  try {
    const res = await fetch(`https://xivapi.com/Recipe/${id}`);
    const data = await res.json();
    if (!data.Error) {
      recipe = data;
    }
  } catch (err) {
    console.log("err", err);
  }
  return recipe;
};
