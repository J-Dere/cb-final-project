import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";
import { writeStars } from "./utils";

const Recipe = () => {
  const { activeRecipe } = useContext(GlobalContext);
  return (
    <>
      {activeRecipe !== null ? (
        <Wrapper>
          <ItemInfoAndIconWrapper>
            <Icon src={`http://xivapi.com${activeRecipe.ItemResult.IconHD}`} />
            <ItemInfoWrapper>
              <div>{activeRecipe.Name}</div>
              <div>
                Lv {activeRecipe.RecipeLevelTable.ClassJobLevel}
                {activeRecipe.RecipeLevelTable.Stars > 0 && (
                  <span>{writeStars(activeRecipe.RecipeLevelTable.Stars)}</span>
                )}
              </div>
              <div>Durability: {activeRecipe.RecipeLevelTable.Durability}</div>
              <div>{`Required craftsmanship: ${activeRecipe.RequiredCraftsmanship}`}</div>
              <div>{`Required control: ${activeRecipe.RequiredControl}`}</div>
              {activeRecipe.SecretRecipeBook !== null && (
                <div>{`${activeRecipe.SecretRecipeBook.Name} required`}</div>
              )}
            </ItemInfoWrapper>
          </ItemInfoAndIconWrapper>
          <Divider />
          <MaterialsWrapper>
            <CrystalsRow>
              <>
                {activeRecipe.AmountIngredient8 > 0 && (
                  <Crystal>
                    <MaterialsIcon
                      src={`http://xivapi.com${activeRecipe.ItemIngredient8.IconHD}`}
                    />
                    <div>x{activeRecipe.AmountIngredient8}</div>
                  </Crystal>
                )}
                {activeRecipe.AmountIngredient9 > 0 && (
                  <Crystal>
                    <MaterialsIcon
                      src={`http://xivapi.com${activeRecipe.ItemIngredient9.IconHD}`}
                    />
                    <div>x{activeRecipe.AmountIngredient9}</div>
                  </Crystal>
                )}
              </>
            </CrystalsRow>
            <Divider />
            <>
              {activeRecipe.AmountIngredient0 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient0.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient0}</div>
                  <div>{activeRecipe.ItemIngredient0.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient1 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient1.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient1}</div>
                  <div>{activeRecipe.ItemIngredient1.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient2 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient2.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient2}</div>
                  <div>{activeRecipe.ItemIngredient2.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient3 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient3.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient3}</div>
                  <div>{activeRecipe.ItemIngredient3.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient4 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient4.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient4}</div>
                  <div>{activeRecipe.ItemIngredient4.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient5 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient5.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient5}</div>
                  <div>{activeRecipe.ItemIngredient5.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient6 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient6.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient6}</div>
                  <div>{activeRecipe.ItemIngredient6.Name}</div>
                </Material>
              )}
              {activeRecipe.AmountIngredient7 > 0 && (
                <Material>
                  <MaterialsIcon
                    src={`http://xivapi.com${activeRecipe.ItemIngredient7.IconHD}`}
                  />
                  <div>x{activeRecipe.AmountIngredient7}</div>
                  <div>{activeRecipe.ItemIngredient7.Name}</div>
                </Material>
              )}
            </>
          </MaterialsWrapper>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: #989898;
  padding: 10px;
`;

const Divider = styled.div`
  margin: 10px 0px;
  height: 1px;
  background: gray;
`;

const ItemInfoAndIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const Icon = styled.img`
  align-self: center;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const MaterialsIcon = styled.img`
  width: 40px;
`;

const CrystalsRow = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const Crystal = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Material = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`;

export default Recipe;
