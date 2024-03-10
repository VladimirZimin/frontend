import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import api from "../../api/apiShop";

const ShopsList = ({ handleSelectedShopChange }) => {
  const [shops, setShops] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const getAllShops = async () => {
      const { data } = await api.getShops();
      setShops(data);
      setSelected(data[1]);
    };
    getAllShops();
  }, []);

  const handleSelectedChange = (shop) => {
    setSelected(shop);
  };

  useEffect(() => {
    handleSelectedShopChange(selected);
  }, [selected, handleSelectedShopChange]);

  return (
    <div>
      <h2 className="text-xl text-center m-3">Shops:</h2>
      <div>
        <RadioGroup value={selected} onChange={handleSelectedChange}>
          <div className="space-y-2">
            {shops.map((shop) => (
              <RadioGroup.Option
                key={shop._id}
                value={shop}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {shop.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ShopsList;
