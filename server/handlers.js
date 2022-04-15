const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { SEARCH_QUERY, getItemsFromAPI, getRecipeFromID } = require("./utils");

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const sendResponse = (res, status, data, message = "") => {
  return res.status(status).json({ status, data, message });
};

const handleGetRecipes = async (req, res) => {
  console.log("calling get recipes");
  const jobID = req.params.jobID;
  let queryString = "";
  //set job in query
  queryString = queryString.concat(`,ClassJob.ID=${jobID}`);

  const allRecipes = await getItemsFromAPI(SEARCH_QUERY.concat(queryString));
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
  const resObject = {
    "1-50": temp50Bucket,
    "51-60": temp60Bucket,
    "61-70": temp70Bucket,
    "71-80": temp80Bucket,
    "81-90": temp90Bucket,
  };
  sendResponse(res, 200, resObject);
};

const handleGetRecipe = async (req, res) => {
  const id = req.params.id;
  const recipe = await getRecipeFromID(id);
  return sendResponse(res, 200, recipe);
};

module.exports = { handleGetRecipe, handleGetRecipes };
