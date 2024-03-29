import { FormEvent, useRef, useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      console.log({ recipes });
      setRecipes(recipes.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecepies = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecepies.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
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

        {/* ------------------------- */}

        <div>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* --------------------------- */}
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              image={recipe.image}
              title={recipe.title}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>

        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>

        {selectedRecipe ? (
          <RecipeModal
            recipeId={selectedRecipe.id.toString()}
            onClose={() => setSelectedRecipe(undefined)}
          />
        ) : null}
      </>
    </div>
  );
};

export default App;
