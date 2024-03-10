import { useState } from "react";
import { MdStarBorder } from "react-icons/md";
import { MdStar } from "react-icons/md";

import api from "../../api/apiShop";

const MedicineList = ({ selectedShop }) => {
  const [selectedMedicine, setSelectedMedicine] = useState("");

  const handleClickAddToCart = (medicine) => {
    if (!medicine) {
      return null;
    }

    const currentCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const updatedCartItems = [
      ...currentCartItems,
      {
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        photo: medicine.photo,
        quantity: 1,
      },
    ].filter(
      (item, index, array) => index === array.findIndex((i) => i.id === item.id)
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleSort = (sort) => {
    setSelectedMedicine(sort);

    if (sort === "name") {
      selectedShop.medicines.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "price") {
      selectedShop.medicines.sort((a, b) => a.price - b.price);
    }

    if (sort === "favorite") {
      selectedShop.medicines.sort((a, b) => b.favorite - a.favorite);
    }
  };

  const handleAddToCart = (event) => {
    const target = event.currentTarget;
    if (target) {
      target.classList.add("scale-95");
    }
    setTimeout(() => {
      if (target) {
        target.classList.remove("scale-95");
      }
    }, 150);
  };

  const handleClickAddToFavorite = async (medicineId) => {
    const shopId = selectedShop?._id;

    const currentFavorite = selectedShop?.medicines.find(
      (medicine) => medicine.id === medicineId
    );

    try {
      if (currentFavorite.favorite) {
        await api.updateFavorite(shopId, {
          medicineId,
          favorite: false,
        });
      } else {
        await api.updateFavorite(shopId, {
          medicineId,
          favorite: true,
        });
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  if (!selectedShop) {
    return null;
  }
  return (
    <div className="w-3/4 my-5">
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{selectedShop.name}</h1>
        <select
          className="w-1/4"
          name="sort"
          value={selectedMedicine}
          onChange={(event) => handleSort(event.target.value)}
        >
          <option value="favorite" defaultValue={true}>
            Sort by favorite
          </option>
          <option value="name">Sort by name</option>
          <option value="price">Sort by price</option>
        </select>
      </div>
      <ul className="w-full flex flex-wrap gap-4">
        {selectedShop.name &&
          selectedShop.medicines.map((medicine) => {
            return (
              <li
                className="bg-white shadow-md rounded-lg p-4 w-1/4 flex flex-col justify-between"
                key={medicine.id}
              >
                <img
                  src={medicine.photo}
                  alt={medicine.name}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="flex flex-col ">
                  <p className="text-lg font-semibold">{medicine.name}</p>
                  <p className="text-gray-500">Price: ${medicine.price}</p>
                  <button
                    className="text-gray-500"
                    onClick={() => handleClickAddToFavorite(medicine.id)}
                  >
                    {medicine.favorite ? (
                      <MdStar color="red" size={20} />
                    ) : (
                      <MdStarBorder color="red" size={20} />
                    )}
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded shadow-md transition duration-150 ease-in-out transform"
                    style={{ alignSelf: "flex-end" }}
                    onClick={(event) => {
                      handleAddToCart(event);
                      handleClickAddToCart(medicine);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MedicineList;
