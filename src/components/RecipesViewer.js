import { useContext, useState } from "react";
import styled from "styled-components";
import CollapsableMenu from "./CollapsableMenu";
import { GlobalContext } from "./GlobalContext";
import Recipe from "./Recipe";

const RecipesViewer = () => {
  const { lv50Bucket, lv60Bucket, lv70Bucket, lv80Bucket, lv90Bucket, fav } =
    useContext(GlobalContext);

  return (
    <Wrapper>
      <RecipesList>
        <CollapsableMenu label="Favourites" items={fav} />
        {Object.values(lv50Bucket).length > 0 && (
          <CollapsableMenu label="Lv 1-50" items={lv50Bucket} />
        )}
        {Object.values(lv60Bucket).length > 0 && (
          <CollapsableMenu label="Lv 51-60" items={lv60Bucket} />
        )}
        {Object.values(lv70Bucket).length > 0 && (
          <CollapsableMenu label="Lv 61-70" items={lv70Bucket} />
        )}
        {Object.values(lv80Bucket).length > 0 && (
          <CollapsableMenu label="Lv 71-80" items={lv80Bucket} />
        )}
        {Object.values(lv90Bucket).length > 0 && (
          <CollapsableMenu label="Lv 81-90" items={lv90Bucket} />
        )}
      </RecipesList>
      <Recipe />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  column-gap: 10px;
`;
const RecipesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  max-height: 60vh;
`;

export default RecipesViewer;
