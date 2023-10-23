import React, { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchData } from "../service/Api";
import RecipeListItem from "./RecipeListItem";

function RecipeLists(props) {
  const [searchedTearm, setSearchedTearm] = useState("");
  const [query, setQuery] = useState("biriyani");
  const [data, setData] = useState("");
  const [resipeList, setRecipeList] = useState(false);
  const [apiId, setApiId] = useState("");
  const [favList, setFavList] = useState([]);
  const [fshow, setfshow] = useState(false);
  const apiArray = [];

  const searchrecipe = (searchQuery) => {
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("Recipe"));

    if (list && list.length > 0) {
      setFavList(list);
    }
  }, []);
  const handleFavoriteRecipe = useCallback(() => {
    setfshow(true);
  });

  const handleRecipieListPage = (index) => {
    setRecipeList(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight + 3000,
        behavior: "smooth",
      });
      function extractIdFromUrl(apiUrl) {
        const idPattern = /\/([^/]+)\?type=public/;
        const idMatch = apiUrl.match(idPattern);
        if (idMatch) {
          return setApiId(idMatch[1]); // Extract the matched ID
        } else {
          return null; // Return null if no match is found
        }
      }
      extractIdFromUrl(apiArray[index]);
      console.log(apiId);
      clearTimeout();
      // console.log(apiArray[index]);
      // console.log(apiArray);
    }, 1000);
    console.log(document.body.scrollHeight);
  };

  useEffect(() => {
    fetchData(query).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  }, []);
  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="tablist">
          <button
            className="btn"
            onClick={handleFavoriteRecipe}
            style={{ fontWeight: "bolder", fontSize: "20px", color: "Black" }}
          >
            Favoruite List
          </button>
          {fshow && <RecipeListItem />}
        </div>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchedTearm(e.target.value)}
            value={searchedTearm}
            type="text"
            placeholder="Search you recipe"
          />
          <button
            onClick={() => (searchrecipe(searchedTearm), props.setLoader(true))}
          >
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
        {data &&
          data.hits.map((item, index) => (
            <div key={index} className="flexItem">
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <p style={{ display: "none" }}>
                {apiArray.push(item._links.self.href)}
              </p>
              <p onClick={() => handleRecipieListPage(index)}>
                {item.recipe.label}
              </p>
            </div>
          ))}
      </div>
      {resipeList && (
        <RecipeListItem
          apiId={apiId}
          setRecipeList={setRecipeList}
          setApiId={setApiId}
        />
      )}
    </div>
  );
}

export default RecipeLists;
