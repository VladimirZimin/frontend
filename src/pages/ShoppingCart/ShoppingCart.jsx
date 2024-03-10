import { useEffect, useState } from "react";
import api from "../../api/apiShop";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [initTotal, setInitTotal] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchCartItems = () => {
      const cartItemsFromStorage = localStorage.getItem("cartItems");
      const user = localStorage.getItem("user");
      if (cartItemsFromStorage) {
        setCartItems(JSON.parse(cartItemsFromStorage));
      } else {
        setCartItems([]);
      }

      if (user) {
        const { name, email, phone, address } = JSON.parse(user);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      } else {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    setInitTotal(cartItems.reduce((acc, item) => acc + item.price, 0));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const user = {
      name,
      email,
      phone,
      address,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }, [address, email, name, phone]);

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    const newTotal = updatedCartItems.reduce((acc, item) => {
      return acc + item.price * (item.quantity || 1);
    }, 0);

    setTotal(newTotal);
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orders = cartItems.map((order) => ({
      id: order.product?.id,
      name: order.product?.name,
      price: order.product?.price,
      quantity: order.quantity || order.product?.quantity,
      photo: order.product?.photo,
    }));

    try {
      api.addOrders({
        product: orders,
        user: {
          name,
          email,
          phone,
          address,
        },
        total: total,
      });

      setCartItems([]);
      setTotal(0);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      localStorage.removeItem("cartItems");
    }
  };

  return (
    <div className="container mx-auto text-center px-5 py-24">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-lg flex">
        <div className="flex flex-col w-1/4 py-4 px-6 bg-gray-200">
          <input
            type="text"
            className="p-2 rounded-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="p-2 mt-2 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="p-2 mt-2 rounded-lg"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            className="p-2 mt-2 rounded-lg"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-3/4">
          <ul className="flex flex-col w-full">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id} className="flex w-full px-2 py-4">
                  <img
                    className=" object-fill rounded-lg"
                    src={item.photo}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="150"
                    height="150"
                  />
                  <div className="w-full ml-3 flex flex-col justify-between items-center ">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-500">${item.price}</p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Delete
                    </button>
                    <div className="text-gray-500">
                      <button
                        className="mt-8 ml-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded "
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Number(item.quantity || 1) - 1
                          )
                        }
                      >
                        -
                      </button>{" "}
                      <input
                        type="number"
                        className="w-20 p-2 mt-2 rounded-lg"
                        value={item.quantity || 1}
                        onChange={(event) =>
                          handleQuantityChange(item.id, event.target.value)
                        }
                      />
                      <button
                        className="mt-8 ml-1 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Number(item.quantity || 1) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-2xl m-5">No items in the cart</div>
            )}
          </ul>
        </div>
      </div>
      <p className="mt-8">Total: ${total ? total : initTotal}</p>
      <button
        onClick={handleSubmit}
        className="mt-8 w-1/2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default ShoppingCart;
