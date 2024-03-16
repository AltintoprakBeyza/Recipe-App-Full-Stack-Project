import { useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import * as api from "./api";
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="app-container">
      <div className="header">
        <img src="/hero-image.jpg"></img>
        <div className="title">My Recipe App</div>
      </div>
      <div className="tabs">
        <h1>Recipe Search</h1>
        <h1>Favourites</h1>
      </div>

      <>
        <form>
          <input
            type="text"
            required
            placeholder="Enter a search term ..."
          ></input>
          <button type="submit">
            <AiOutlineSearch size={40} />
          </button>
        </form>
        <button>Submit</button>
        {recipes.map((recipe) => (
          <div>
            recipe image location: {recipe.image}
            recipe title: {recipe.title}
          </div>
        ))}
        <div className="recipe-grid">
          <RecipeCard />
        </div>

        <button className="view-more-button">View More</button>
      </>
    </div>
  );
};

export default App;
