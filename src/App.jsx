import "./App.scss";
import Header from "./components/ImgSlider";
import DefaultTab from "./components/DefaultTab";
import ReccipeList from "./components/ReccipeList";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loader, setLoader] = useState(true);
  return (
    <>
      <Header setLoader={setLoader} />
      <DefaultTab setLoader={setLoader} />
      <ReccipeList setLoader={setLoader} />
      <ToastContainer className='toast-font' autoClose={2000} theme="colored"/>
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default App;
