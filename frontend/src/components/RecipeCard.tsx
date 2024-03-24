import { AiOutlineHeart } from "react-icons/ai";

const RecipeCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="recipe-card">
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
