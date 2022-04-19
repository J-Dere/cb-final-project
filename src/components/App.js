import { useContext } from "react";
import styled from "styled-components";
import Filters from "./Filters";
import { GlobalContext } from "./GlobalContext";
import RecipesViewer from "./RecipesViewer";

function App() {
  const { job, setJob } = useContext(GlobalContext);
  const handleSelectChange = (e) => {
    setJob(e.target.value);
  };
  //value of the selected option is the ID of the job to query
  return (
    <Wrapper>
      <div>Glamour recipe viewer</div>
      <select name="jobs" onChange={handleSelectChange}>
        <option value="" hidden>
          Select a job
        </option>
        <option value={10}>Armorer</option>
        <option value={11}>Goldsmith</option>
        <option value={12}>Leatherworker</option>
        <option value={13}>Weaver</option>
        <option value={14}>Alchemist</option>
      </select>
      <Filters />
      <RecipesViewer />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default App;
