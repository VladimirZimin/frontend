import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Container from "../Container/Container";

import style from "./Layout.module.scss";

const Layout = () => {
  return (
    <Container>
      <div className="content">
        <header>
          <nav>
            <ul className={style.list}>
              <li className={style.item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.active : style.inactive
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li className={style.item}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? style.active : style.inactive
                  }
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <footer className="footer">
        <p>&copy; 2024. developed by Volodimir Zimin.</p>
        <p></p>
      </footer>
    </Container>
  );
};

export default Layout;
