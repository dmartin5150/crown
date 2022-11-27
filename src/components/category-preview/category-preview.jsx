
import {CategroryPreviewContainer,Title,Preview} from  "./category-preview.styles";
import ProductCard from "../product-card/product-card";

const CategoryPreview = ({ title, products }) => {
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
