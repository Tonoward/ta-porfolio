// Types
import { type TabCategoryKey, tabCategories } from "../lib/tabCategories";


export default function Card({
  Title,
  Img,
  Description,
  Tags
}: {
  Title: string;
  Img: string;
  Description: string;
  Tags: TabCategoryKey[];
}) {




  return (
    <div className="p-4 lg:w-2xl md:w-lg w-md bg-card text-textcolor border-2 border-borders rounded-md shadow">
      <div className="flex items-center flex-row">
        <div className="w-2/5 h-fit m-1">
          <img
            src={
              Img
                ? Img
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="Card image"
            className="object-cover rounded-lg"
          /> 
          <div></div>
        </div>
        <div className="flex flex-col items-center w-3/5 ml-4">
          <p className="mb-2 text-xl text-primary font-bold md:line-clamp-2 line-clamp-1">
            {Title ? Title : "Default Title"}
          </p>
          <div className="flex flex-wrap gap-2">
          {Tags.map((tagKey) => {
            const tag = tabCategories[tagKey];
            return (
              <span key={tagKey} className={`badge ${tag.badgeClass}`}>
                {tag.name}
              </span>
            );
          })}
          </div>
          <p className="lg:line-clamp-5 line-clamp-4 lg:text-base text-sm">
            {Description
              ? Description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </p>
            <button className="button w-full m-1">
                Read More
            </button>
        </div>
      </div>
    </div>
  );
}
