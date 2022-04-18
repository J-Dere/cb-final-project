import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";
import { writeStars } from "./utils";

//Item will be the basic item returned from the api query
const CollapsableMenuItem = ({ item }) => {
  const { setActiveRecipeId, fav, setFav } = useContext(GlobalContext);
  const { isFav, setIsFav } = useState(false);

  useEffect(() => {
    for (let i = 0; i < fav.length; i++) {
      if (fav[i] === item.ID) {
        setIsFav(true);
      }
      break;
    }
  }, []);

  const handleItemClick = (e, id) => {
    setActiveRecipeId(id);
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    let tempArray = fav;
    if (isFav) {
      //remove from favourites
    } else {
      //add to favourites
    }
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
      <FavButtonWrapper>
        <FavButton onClick={() => {}}>
          {isFav ? "Remove Favourite" : "Add Favourite"}
        </FavButton>
      </FavButtonWrapper>
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

const FavButtonWrapper = styled.div`
  align-self: flex-end;
  align-items: center;
  justify-content: right;
`;
const FavButton = styled.button``;

export default CollapsableMenuItem;
