import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CollapsableMenuItem from "./CollapsableMenuItem";
import { GlobalContext } from "./GlobalContext";

//items will be an object containing objects
const CollapsableMenu = ({ label, items }) => {
  const { job, globalMenuActive, setGlobalMenuActive } =
    useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [job]);

  useEffect(() => {
    if (isActive && !globalMenuActive) {
      setIsActive(false);
    }
  }, [globalMenuActive]);

  const handleMenuClick = async () => {
    await setGlobalMenuActive(false);
    await setIsActive(!isActive);
    await setGlobalMenuActive(true);
  };
  return (
    <>
      <MenuLabel onClick={handleMenuClick}>
        <div>{label}</div>
        <div>{isActive ? "-" : "+"}</div>
      </MenuLabel>
      <Wrapper isActive={isActive}>
        {isActive && (
          <StyledUl>
            {Object.keys(items).map((itemKey) => {
              return (
                <StyledLi key={itemKey}>
                  {/*This should be done in a more elegant manner for larger number of filters */}
                  {items[itemKey].bookDisplay &&
                    items[itemKey].equipDisplay && (
                      <CollapsableMenuItem
                        key={itemKey}
                        item={items[itemKey].data}
                      />
                    )}
                </StyledLi>
              );
            })}
          </StyledUl>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
  background-color: #989898;
  padding-bottom: ${(props) => props.isActive && "5px"};
  overflow-y: ${(props) => props.isActive && "scroll"};
`;
const MenuLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  background-color: darkgray;
  padding: 0 5px;
`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  list-style-type: none;
`;

export default CollapsableMenu;
