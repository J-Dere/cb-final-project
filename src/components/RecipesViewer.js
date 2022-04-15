import { useContext, useState } from "react";
import styled from "styled-components";
import CollapsableMenu from "./CollapsableMenu";
import { GlobalContext } from "./GlobalContext";

const RecipesViewer = () => {
  const { lv50Bucket, lv60Bucket, lv70Bucket, lv80Bucket, lv90Bucket } =
    useContext(GlobalContext);
  const [lv50Active, setLv50Active] = useState(false);
  const [lv60Active, setLv60Active] = useState(false);
  const [lv70Active, setLv70Active] = useState(false);
  const [lv80Active, setLv80Active] = useState(false);
  const [lv90Active, setLv90Active] = useState(false);

  return (
    <Wrapper>
      <RecipesList>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vw;
`;
const RecipesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

export default RecipesViewer;
