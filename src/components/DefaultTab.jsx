import React, { useState, useEffect } from "react";
import { CiPizza } from "react-icons/ci";
import { GiNoodles, GiFruitBowl, GiCheckMark } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

import { MdOutlineIcecream } from "react-icons/md";
import { fetchDataFromTab } from "../service/Api";

function DefaultTab(props) {
  const [active, setActive] = useState("Pizza");
  const [tabData, setTabData] = useState("");
  const [tabLabel, setTabLabel] = useState([
    {
      name: "Pizza",
      icon: <CiPizza />,
      id: "45cda77c5d4d34861bf4a8971651263f",
    },
    {
      name: "Noodles",
      icon: <GiNoodles />,
      id: "6f0aa13f7872defd5297cb924e28dc9c",
    },
    {
      name: "Desert",
      icon: <GiFruitBowl />,
      id: "bc865476ffe2b8a03fbe9aee2f739740",
    },
    {
      name: "Ice cream",
      icon: <MdOutlineIcecream />,
      id: "c0987781ce43dece75272c4ddd6d17f3",
    },
  ]);

  const handleClick = (name, id) => {
    setActive(name);
    fetchDataFromTab(id).then((response) => {
      setTabData(response);
      props.setLoader(false);
    });
  };

  useEffect(() => {
    fetchDataFromTab(tabLabel[0].id).then((response) => {
      setTabData(response);
      props.setLoader(false);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {tabLabel.map((item, index) => (
          <div
            onClick={() => (
              handleClick(item.name, item.id), props.setLoader(true)
            )}
            key={index}
            className={`tablist ${active === item.name ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      
      </div>
      <div className="recipe_banner">
        {tabData !== "" && tabData.recipe && (
          <>
            <div className="left-col">
              <span className="badge">
                {tabData.recipe?.cuisineType[0].toUpperCase()}
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
          </>
        )}
      </div>
    </div>
  );
}

export default DefaultTab;
