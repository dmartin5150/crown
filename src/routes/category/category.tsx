import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

import { useState, useEffect, Fragment } from "react";
import Spinner from "../../components/spinner/spinner";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card";


type CategoryRouteParams = {
  category: string;
}


const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
