import "./App.scss";
import Header from "./components/ImgSlider";
import DefaultTab from "./components/DefaultTab";
import ReccipeList from "./components/ReccipeList";
import { useState } from "react";

function App() {
  const [loader, setLoader] = useState(true);
  return (
    <>
      <Header setLoader={setLoader} />
      <DefaultTab setLoader={setLoader} />
      <ReccipeList setLoader={setLoader} />
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default App;
