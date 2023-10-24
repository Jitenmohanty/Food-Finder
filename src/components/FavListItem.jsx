import React, { useEffect, useState } from "react";
import { fetchDataFromTab } from "../service/Api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeListItem from "./RecipeListItem";

const FavListItem = () => {
  const [favList, setFavList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [recipeList, setRecipeList] = useState(false);
  const [tabData, setTabData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const favListItems = JSON.parse(localStorage.getItem("Recipe"));

    if (favListItems && favListItems.length > 0) {
      setFavList(favListItems);
    }
    console.log(favList);
  }, []);

  useEffect(() => {
    if (favList.length > 0) {
      fetchDataFromTab(favList[currentIndex])
        .then((response) => {
          setTabData(response);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [favList, currentIndex, setLoader]);

  const handleNextClick = () => {
    if (currentIndex < favList.length - 1) {
      setLoader(true);
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.warning("No More items On Fav List");
    }
  };

  return (
    <div>
      {favList.length > 0 ? (
        <div className="flexbox">
          {tabData && favList && (
            <div className="flexItem">
              <div className="img-wrapper">
                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
              </div>
              {/* <p style={{ display: "none" }}>
                {apiArray.push(item._links.self.href)}
              </p> */}
              <p
                onClick={() => {
                  setRecipeList(true);
                }}
              >
                {tabData.recipe.label}
              </p>
            </div>
          )}
        </div>
      ) : (
        <h5>FavList is Empty</h5>
      )}
      <button
        className="btn"
        onClick={handleNextClick}
        style={{ height: "40px" }}
      >
        Next
      </button>
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      {recipeList && <RecipeListItem tabData={tabData} />}
    </div>
  );
};

export default FavListItem;
