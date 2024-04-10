import Rating from '../assets/svgs/rating.svg?react';

const Product = ({ ...product }) => {
  return (
    <div className="border rounded border-slate-200">
      <div className="relative">
        <img
          className="w-full aspect-[3/4] object-cover"
          src={product.thumbnail}
        />
        {product.discountPercentage && (
          <div className="absolute bottom-1">
            <span className="px-2 py-1 bg-fuchsia-800 text-gray-50">
              -{product.discountPercentage}%
            </span>
            <div className="pl-4 pr-2 px-3 mt-2 bg-slate-50/95 hidden">
              {product.description}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-2 flex flex-col gap-4">
        <div className="text-lg md:text-xl font-medium md:font-normal">
          {product.title}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="h-5 w-5 text-fuchsia-800">
              <Rating />
            </span>
            {product.rating}
          </div>
          <div className="text-xl">
            <span
              className={`${
                product.discountPercentage ? 'text-base line-through' : ''
              }`}
            >
              ${product.price}
            </span>
            {product.discountPercentage ? (
              <span className="ml-1 px-1 font-medium">
                {(product.price - product.discountPercentage).toFixed(2)}
              </span>
            ) : (
              <span className="ml-1 px-1 font-medium">{product.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
