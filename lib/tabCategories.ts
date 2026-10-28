export type TabCategory = {
  name: string;
  badgeClass: string;
};

export const tabCategories = {
  frontend: { name: "Frontend", badgeClass: "bg-blue-500 text-white" },
  backend: { name: "Backend", badgeClass: "bg-green-500 text-white" },
  ai: { name: "AI", badgeClass: "bg-yellow-500 text-black" },
  ml: { name: "Machine Learning", badgeClass: "bg-red-500 text-white" },
  embedded: { name: "Embedded", badgeClass: "bg-indigo-500 text-white" },
} as const;

export type TabCategories = typeof tabCategories;
export type TabCategoryKey = keyof typeof tabCategories;
