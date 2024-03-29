import { AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  title,
  image,
  onClick,
}: {
  title: string;
  image: string;
  onClick: () => void;
}) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={image}></img>
      <div className="recipe-card-title">
        <span>
          <AiOutlineHeart size={25} />
        </span>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
