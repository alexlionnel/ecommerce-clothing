import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [ categoriesMap, setCategoriesMap ] = useState({});
  const value = { categoriesMap };

  // à effectuer une seule fois : useEffect => firebase.utils.addCollectionAndDocuments('categories', shop-data.js.SHOP_DATA)

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};