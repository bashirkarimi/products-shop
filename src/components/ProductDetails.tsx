import { useState, useEffect } from 'react';
import fetchData from '../services/fetchData';
import { useParams } from 'react-router-dom';

interface Product {
  thumbnail: string;
  discountPercentage?: string;
  images?: string[];
  title?: string;
  price?: string;
  stock?: string;
  brand?: string;
  category?: string;
  description?: string; // Add description property to the Product interface
}
const ProductDetails = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const { id: productId } = useParams<{ id: string }>(); // Use object destructuring and specify type for useParams
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchData(`https://dummyjson.com/products/${productId}`).then(setProduct);
    setIsLoading(false);
  }, [productId]);

  return (
    <div className="md:flex gap-10">
      <div className="relative shrink-0 basis-3/5 flex gap-3">
        <div className="relative order-2 basis-4/5">
          <img
            className="w-full aspect-[3/4] object-cover"
            src={product?.thumbnail}
          />
          {product?.discountPercentage && (
            <div className="absolute top-1">
              <span className="px-2 py-1 bg-fuchsia-800 text-gray-50">
                -{product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        <div className="mr-2 order-1 basis-1/5">
          {product?.images?.map((image) => (
            <img
              className="w-full object-cover aspect-[3/4] mb-3"
              key={image}
              src={image}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="text-xl font-medium md:text-3xl font-medium md:font-normal">
          {product?.title}
        </div>
        <div className="flex justify-between">
          <div className="text-xl">
            <span
              className={`${
                product?.discountPercentage ? 'text-base line-through' : ''
              }`}
            >
              ${product?.price}
            </span>
            {product?.discountPercentage ? (
              <span className="ml-1 px-1 font-medium">
                {(
                  Number(product?.price) - Number(product?.discountPercentage)
                ).toFixed(2)}
              </span>
            ) : (
              <span className="ml-1 px-1 font-medium">{product?.price}</span>
            )}
          </div>
        </div>
        <div className="bg-slate-50/95">{product?.description}</div>
        <div className="flex flex-col gap-1 text-sm">
          {product?.stock && (
            <div>
              In Stock: <span className="font-medium">{product.stock}</span>
            </div>
          )}
          {product?.brand && (
            <div>
              Brand: <span className="font-medium">{product.brand}</span>
            </div>
          )}
          {product?.category && (
            <div>
              Category: <span className="font-medium">{product.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
