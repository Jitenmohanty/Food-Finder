import React, { useEffect, useState } from "react";
import { fetchDataFromTab } from "../service/Api";

const FavListItem = () => {
  const [favList, setFavList] = useState([]);
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [favList,currentIndex]);

  const handleNextClick = () => {
    if (currentIndex < favList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else{
        
    }
    
  };

  return (
    <div>
      {favList.length > 0 ? (
        <div className="flexbox">
          {tabData && favList && (
            <div  className="flexItem">
              <div className="img-wrapper">
                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
              </div>
              {/* <p style={{ display: "none" }}>
                {apiArray.push(item._links.self.href)}
              </p> */}
              <p>{tabData.recipe.label}</p>
            </div>
          )}
          
        </div>
      ) : (
        <h3>FavList is Empty</h3>
      )}
       <button className="btn" onClick={handleNextClick} style={{height:"40px"}}>Next</button>
    </div>
  );
};

export default FavListItem;
