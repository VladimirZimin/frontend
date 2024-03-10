import { useState } from "react";

import MedicineList from "../../components/MedicineList/MedicineList";
import ShopsList from "../../components/ShopsList/ShopsList";

import style from "./Shop.module.scss";

const Shop = () => {
  const [selectedShop, setSelectedShop] = useState(null);

  const handleSelectedShopChange = (shop) => {
    setSelectedShop(shop);
  };

  const handleSelectedShopFavoriteChange = (shop) => {
    setSelectedShop({ ...shop, favorite: !shop.favorite });
  };

  return (
    <div className={style.wrapper}>
      <ShopsList handleSelectedShopChange={handleSelectedShopChange} />
      <MedicineList
        selectedShop={selectedShop}
        handleSelectedShopFavoriteChange={handleSelectedShopFavoriteChange}
      />
    </div>
  );
};

export default Shop;
