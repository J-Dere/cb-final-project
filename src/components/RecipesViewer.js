import { useContext } from "react";
import { styled } from "styled-components";
import { GlobalContext } from "./GlobalContext";

const RecipesViewer = () => {
  const { lv50Bucket, lv60Bucket, lv70Bucket, lv80Bucket, lv90Bucket } =
    useContext(GlobalContext);

  return <></>;
};

const Wrapper = styled.div``;

export default RecipesViewer;
