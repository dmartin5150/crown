import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route }  from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { setCategories } from "../../store/categories/category.action";

const Shop = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        console.log('categoriesArray:',categoriesArray);
        dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
},[]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};
export default Shop;
