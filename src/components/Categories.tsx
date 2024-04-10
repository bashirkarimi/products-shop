import { useState, useEffect } from 'react';
import fetchData from '../services/fetchData';
import toCapitalise from '../utilities/toCapitalise';

interface CategoriesProps {
  onCategoryClick: (category: string) => void;
  onAllCategoryClick: () => void;
  selectedCategory: string;
  productsLength?: number;
}

const Categories = ({
  onCategoryClick,
  onAllCategoryClick,
  selectedCategory,
  productsLength,
}: CategoriesProps) => {
  const [categories, setCategories] = useState<string[]>();

  useEffect(() => {
    fetchData('https://dummyjson.com/products/categories').then(setCategories);
  }, []);

  return (
    <div className="mr-8">
      <div className="flex justify-between bg-slate-200 py-2 px-2 rounded">
        <button
          className="lg:block font-medium hover:text-slate-950"
          onClick={() => onAllCategoryClick()}
        >
          All categories
        </button>
        <span className="bg-fuchsia-800 text-slate-100 px-2 rounded ml-2">
          {productsLength}
        </span>
      </div>
      <div className="ml-3 pl-3 border-l border-slate-300">
        {categories?.map((category) => (
          <button
            key={category}
            className={`lg:block relative py-1 px-2 whitespace-nowrap text-slate-700 hover:text-slate-950 hover:transition-colors before:inline-block before:bg-slate-300 before:-ml-5 before:absolute before:top-1/2 inline-block before:w-4 before:h-px disabled:text-slate-950 disabled:font-medium`}
            disabled={selectedCategory === category ? true : false}
            onClick={() => onCategoryClick(category)}
          >
            {toCapitalise(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
