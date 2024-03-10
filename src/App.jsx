import { Route, Routes } from "react-router-dom";

import Shop from "./pages/Shop/Shop";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
