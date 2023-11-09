const query = {
  app_id:import.meta.env.VITE_APP_ID,
  app_key:import.meta.env.VITE_APP_KEY,
};



export const fetchData = async (searchQuery) => {
  const { app_id, app_key } = query;
  try {
    const data = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${query.app_id}&app_key=${query.app_key}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error, "Error on fetching data");
    return error;
  }
};
export const fetchDataFromTab = async (QueryId) => {
  const { app_id, app_key } = query;
  try {
    const data =  await fetch(`https://api.edamam.com/api/recipes/v2/${QueryId}?type=public&app_id=${query.app_id}&app_key=${query.app_key}`);
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error, "Error on fetching data");
    return error;
  }
};
