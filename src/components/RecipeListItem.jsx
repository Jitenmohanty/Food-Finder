import React, { useState, useEffect, useCallback } from "react";
import { GiCheckMark } from "react-icons/gi";
import { fetchDataFromTab } from "../service/Api";
import { toast } from "react-toastify";

function RecipeListItem(props) {
  const [tabData, setTabData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [addId, setAddId] = useState(
    JSON.parse(localStorage.getItem("Recipe")) || []
  );
  useEffect(() => {
    fetchDataFromTab(props.apiId)
      .then((response) => {
        setTabData(response);
        setLoader(false);
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  }, [props.apiId, setLoader]);

  useEffect(() => {
    const apiId = JSON.parse(localStorage.getItem("Recipe"));
  }, [props.apiId]);

  useEffect(() => {
    localStorage.setItem("Recipe", JSON.stringify(addId));
  }, [addId]);

  const handleClick = useCallback(() => {
    if (!addId.includes(props.apiId)) {
      setAddId((prevAddId) => [...prevAddId, props.apiId]);
      toast.success("Added Favorite List");
    } else {
      toast.warning("Already on Favorite List");
    }
  }, [addId, props.apiId]);

  if (loader) {
    return (
      <div className="container">
        <div className="loader">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!tabData || !tabData.recipe) {
    return <h2>Container Is Empty</h2>;
  }

  return (
    <div className="container">
      <h1 className="recipeHeading">Best of Luck for recipe </h1>
      <div className="button-container">
        <button onClick={handleClick} className="btn">
          Add To Fav
        </button>
      </div>
      <div className="recipe_banner">
        <div className="left-col">
          <span className="badge">
            {tabData.recipe.cuisineType[0]?.toUpperCase()}
          </span>
          <h1 className="gradient-text">{tabData.recipe.label}</h1>
          <p>
            <strong>Recipe by:</strong>
            <small>{tabData.recipe.source}</small>
          </p>
          <h3 className="gradient-ingredient">Ingredients</h3>
          <div className="ingredients">
            <ul>
              {tabData.recipe.ingredientLines.map((list, index) => (
                <li key={index}>
                  <GiCheckMark size="18px" color="#6fcb9f" />
                  &nbsp;<span>{list}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-col">
          <div className="image-wrapper">
            <img src={tabData.recipe.image} alt={tabData.recipe.label} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeListItem;
