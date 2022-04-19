import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const Filters = () => {
  const { equipsFilters, booksFilters, updateBookFilter, updateEquipFilter } =
    useContext(GlobalContext);

  const handleEquipChange = (e, type) => {
    updateEquipFilter(type, !equipsFilters[type]);
  };

  const handleBookChange = (e, type) => {
    updateBookFilter(type, !booksFilters[type]);
  };

  return (
    <>
      <FiltersWrapper>
        <div>Equipment:</div>
        <StyledUl>
          {Object.keys(equipsFilters).map((key) => {
            let label = "";
            switch (true) {
              case key === "head":
                label = "Head";
                break;
              case key === "body":
                label = "Body";
                break;
              case key === "hands":
                label = "Hands";
                break;
              case key === "legs":
                label = "Legs";
                break;
              case key === "feet":
                label = "Feet";
                break;
              case key === "earrings":
                label = "Earrings";
                break;
              case key === "necklace":
                label = "Necklace";
                break;
              default:
            }
            return (
              <li key={key}>
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  value={key}
                  checked={equipsFilters[key]}
                  onChange={(e) => handleEquipChange(e, key)}
                />
                <label htmlFor={key}>{label}</label>
              </li>
            );
          })}
        </StyledUl>
      </FiltersWrapper>
      <FiltersWrapper>
        <div>Master Books:</div>
        <StyledUl>
          {Object.keys(booksFilters).map((key) => {
            let label = "";
            switch (true) {
              case key === "noBook":
                label = "No Requirement";
                break;
              case key === "bookDemi":
                label = "Master Demimateria";
                break;
              case key === "book1":
                label = "Master I";
                break;
              case key === "book3":
                label = "Master III";
                break;
              case key === "book4":
                label = "Master IV";
                break;
              case key === "book5":
                label = "Master V";
                break;
              case key === "book6":
                label = "Master VI";
                break;
              case key === "book7":
                label = "Master VII";
                break;
              case key === "book8":
                label = "Master VIII";
                break;
              case key === "book9":
                label = "Master IX";
                break;
              default:
            }
            return (
              <li key={key}>
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  value={key}
                  checked={booksFilters[key]}
                  onChange={(e) => handleBookChange(e, key)}
                />
                <label htmlFor={key}>{label}</label>
              </li>
            );
          })}
        </StyledUl>
      </FiltersWrapper>
    </>
  );
};

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin: 5px 0px;
`;

const StyledUl = styled.ul`
  display: flex;
  column-gap: 5px;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export default Filters;
