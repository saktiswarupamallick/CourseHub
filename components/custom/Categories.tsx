"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  const onClick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };

  return (
    <div className="flex flex-wrap justify-center my-10 border-b-2 border-gray-200 pb-4">
      <span
        onClick={() => onClick(null)}
        className={`cursor-pointer mx-4 text-lg ${
          selectedCategory === null ? "text-lime-600 font-semibold" : "text-gray-600"
        }`}
      >
        All Categories
      </span>
      {categories.map((category) => (
        <span
          key={category.id}
          onClick={() => onClick(category.id)}
          className={`cursor-pointer mx-4 text-lg ${
            selectedCategory === category.id ? "text-lime-600 font-semibold" : "text-gray-600"
          }`}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default Categories;
