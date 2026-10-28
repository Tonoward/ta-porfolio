//NextJS

// Types
import { type TabCategoryKey, tabCategories } from "@/lib/tabCategories";

export default function Card({
  Title,
  Img,
  Description,
  Tags,
}: {
  Title: string;
  Img: string;
  Description: string;
  Tags: TabCategoryKey[];
}) {
  return (
    <div className="bg-card w-md rounded-md border-2 border-borders p-4 text-textcolor shadow md:w-lg lg:w-2xl">
      <div className="flex flex-row items-center">
        <div className="m-1 h-fit w-2/5">
          <img
            src={
              Img
                ? Img
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt="Card image"
            className="rounded-lg object-cover"
          />
          <div></div>
        </div>
        <div className="ml-4 flex w-3/5 flex-col items-center">
          <p className="mb-2 line-clamp-1 text-xl font-bold text-primary md:line-clamp-2">
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
          <p className="line-clamp-4 text-sm lg:line-clamp-5 lg:text-base">
            {Description
              ? Description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </p>
          <button className="button m-1 w-full">Read More</button>
        </div>
      </div>
    </div>
  );
}
