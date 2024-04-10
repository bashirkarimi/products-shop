import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../services/fetchData';
import toCapitalise from '../utilities/toCapitalise';
import ProductCard from './ProductCard';
import Categories from './Categories';
import Loading from '../assets/svgs/loading.svg?react';
import Search from './Search';
import Pagination from './Pagination';

type Product = {
  id: number;
};

export type Products = {
  total: number;
  skip: number;
  limit: number;
  products: Product[];
};

const Products = () => {
  const [data, setdata] = useState<Products>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const postsPerPage = 30;

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      let param = '';
      let paginationParam = `limit=${data?.limit ?? 0}&skip=${skip}`;
      if (searchTerm) {
        param = `/search?q=${searchTerm}`;
      } else if (selectedCategory) {
        param = `/category/${selectedCategory}`;
      } else if (data?.limit) {
        param = `/${selectedCategory}?${paginationParam}`;
      }

      await fetchData(`https://dummyjson.com/products${param}`).then(setdata);
      setIsLoading(false);
    };

    fetchDataAsync();
  }, [selectedCategory, searchTerm, skip, data?.limit ?? 0]);

  const handleCategoryClick = (category: string) => {
    setSearchTerm('');
    setSelectedCategory(category);
  };

  const resetCategories = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const handleSearch = (searchTerm: string) => {
    setSelectedCategory('');
    setSearchTerm(searchTerm);
  };

  const handlePageNumber = (pageNumber: number) => {
    setSkip((pageNumber - 1) * postsPerPage);
  };

  return (
    <>
      <div className="py-8 flex">
        {selectedCategory && (
          <h2 className="text-3xl">{toCapitalise(selectedCategory)}</h2>
        )}
        {searchTerm && (
          <h2 className="text-3xl">
            Search result of {toCapitalise(searchTerm)}
          </h2>
        )}
        <div className="w-2/5 inline-block ml-auto">
          <Search onSearchTerm={handleSearch} />
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-3 lg:col-span-1">
          <Categories
            onCategoryClick={handleCategoryClick}
            onAllCategoryClick={resetCategories}
            selectedCategory={selectedCategory}
            productsLength={data?.total ?? 0}
          />
        </div>
        {isLoading ? (
          <div className="col-span-3 w-full h-lvh flex items-center place-content-center">
            <span className="animate-spin w-16 h-16 text-fuchsia-800">
              <Loading />
            </span>
          </div>
        ) : (
          <>
            {data?.total ? (
              <div className="grid col-span-3 gap-x-5 grid-cols-subgrid gap-y-8 xl:gap-y-10 xl:gap-x-8 w-full">
                {data?.products.map((product) => (
                  <Link key={product.id} to={`/productDetails/${product.id}`}>
                    <ProductCard {...product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="col-span-3 w-full pt-12 flex place-content-center">
                <h2 className="text-2xl"> No record found!</h2>
              </div>
            )}
            <div className="mt-4 col-span-3 col-start-2">
              <Pagination
                total={data?.total}
                skip={data?.skip}
                limit={postsPerPage}
                onPageNumber={handlePageNumber}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
