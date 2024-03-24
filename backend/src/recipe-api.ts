/* const apiKey = process.env.API_KEY; */
const apiKey = "d322b9c6ff694f8b9d7d076b3932ceed";

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getRecepieSummary = async (recipeId: string) => {
  if(!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);

  const params = {
    apiKey
  };
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  const json = await response.json();
  
  return json; 
};
