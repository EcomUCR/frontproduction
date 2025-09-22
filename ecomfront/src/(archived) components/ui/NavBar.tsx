import { useNavigate } from "react-router-dom";
import {
  IconUser,
  IconShoppingBag,
  IconSearch,
  IconLogout,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import logo from "../../img/tucaShopLogo.png";
import type { MeResponse } from "../types/User";

export default function NavBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<MeResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data: MeResponse) => setUserData(data))
        .catch(() => setUserData(null));
    }
  }, []);

  const handleUserClick = () => {
    if (!userData) {
      navigate("/login");
      return;
    }
    if (userData.staff) {
      navigate("/user-list");
    } else if (userData.client) {
      navigate("/profile-user");
    } else if (userData.vendor) {
      navigate("/profile-vendor");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch("api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout failed", err);
    }

    // clear user and token
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between lg:flex-row bg-blue-main px-2 py-5 lg:px-20 lg:py-6">
      <div className="flex w-[25%] items-center align-middle space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-auto relative" />
        <a href="/" className="text-white pt-1 font-fugaz text-xl lg:text-3xl">
          TucaShop
        </a>
      </div>

      <div className="hidden w-[50%] lg:flex lg:flex-1 lg:mx-6 shadow-[2px_3px_3px_rgba(0,0,0,0.3)] rounded-lg">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-6 py-2.5 rounded-l-lg outline-none bg-white"
        />
        <button className="px-2 rounded-r-lg bg-yellow-main flex items-center justify-center text-white">
          <IconSearch className="w-5 h-5 lg:w-7 lg:h-7" />
        </button>
      </div>

      <div className="flex lg:w-[25%] justify-end items-center space-x-4 lg:space-x-6 text-white">
        <IconSearch className="lg:hidden" />

        {/* Profile/User button */}
        <button onClick={handleUserClick}>
          <IconUser className="lg:w-8 lg:h-8" />
        </button>

        <IconShoppingBag className="lg:w-8 lg:h-8"/>

        {/* Logout only if logged in */}
        {userData && (
          <button onClick={handleLogout}>
            <IconLogout className="lg:w-8 lg:h-8" />
          </button>
        )}
      </div>
    </header>
  );
}
