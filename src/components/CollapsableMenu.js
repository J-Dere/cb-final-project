import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CollapsableMenuItem from "./CollapsableMenuItem";
import { GlobalContext } from "./GlobalContext";

//items will be an object containing objects
const CollapsableMenu = ({ label, items }) => {
  const { job } = useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [job]);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <MenuLabel onClick={handleMenuClick}>
        <div>{label}</div>
        <div>{isActive ? "-" : "+"}</div>
      </MenuLabel>
      <Wrapper isActive={isActive}>
        {isActive &&
          Object.keys(items).map((itemKey) => {
            return (
              <CollapsableMenuItem key={itemKey} item={items[itemKey].data} />
            );
          })}
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

export default CollapsableMenu;
