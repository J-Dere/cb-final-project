import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

//Item will be the basic item returned from the api query
const CollapsableMenuItem = ({ item }) => {
  const { setActiveRecipeId } = useContext(GlobalContext);
  const writeStars = (numStars) => {
    let starString = "";
    for (let i = 0; i < numStars; i++) {
      starString = starString.concat("*");
    }
    return starString;
  };

  const handleItemClick = (e, id) => {
    setActiveRecipeId(id);
  };

  return (
    <MenuItem onClick={(e) => handleItemClick(e, item.ID)}>
      <Icon src={`http://xivapi.com${item.ItemResult.IconHD}`} />
      <ItemInfoWrapper>
        <ItemInfoName>{item.Name}</ItemInfoName>
        <ItemInfoLv>
          Lv {item.RecipeLevelTable.ClassJobLevel}{" "}
          {item.RecipeLevelTable.Stars > 0 && (
            <>{writeStars(item.RecipeLevelTable.Stars)}</>
          )}
        </ItemInfoLv>
      </ItemInfoWrapper>
    </MenuItem>
  );
};

//One menu item should be flex row, first column is icon, second is item info
const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const Icon = styled.img`
  width: 40px;
  margin-right: 5px;
`;

//Item info is flex column, first row is name, second row is lv req
const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemInfoName = styled.div``;
const ItemInfoLv = styled.div``;

export default CollapsableMenuItem;
