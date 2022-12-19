
import {CategroryPreviewContainer,Title,Preview} from  "./category-preview.styles";
import ProductCard from "../product-card/product-card";
import {FC} from 'react';
import { CategoryItem } from "../../store/categories/category.types";

type CategoryPreviewProps = {
  title:string,
  products: CategoryItem[],
}


const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategroryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
            {
                products.filter((_, idx) => idx <4)
                .map(product => <ProductCard key={product.id} product={product} />)
            }
      </Preview>
    </CategroryPreviewContainer>
  );
};
export default CategoryPreview;
