const express = require("express");
const morgan = require("morgan");
const {
  handleGetRecipe,
  handleGetRecipes,
  handleGetUser,
  handleUpdateFav,
} = require("./handlers");

const PORT = process.env.PORT || 3001;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .get("/api/get-recipes/:jobID", handleGetRecipes)
  .get("/api/get-recipe/:id", handleGetRecipe)
  .get("/api/get-user/:id", handleGetUser)
  .post("/api/update-fav/", handleUpdateFav)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
