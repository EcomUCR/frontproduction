import React, { useState } from "react";
import { Button } from "../ui/button";
import searchIcon from "../../img/searchIcon.png";
import UserTable from "../ui/UserTable";
import NavBar from "../ui/NavBarUser";

const UserListPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <>
      <NavBar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Lista de usuarios</h1>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden px-45 text-left">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-1 pr-0 focus:outline-none text-left"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="border border-gray-300 rounded-lg px-10 py-2 text-left"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Sin Filtros</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="seller">Seller</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center rounded-2xl p-2"
              onClick={() => console.log("Search clicked", search, filter)}
            >
              <img src={searchIcon} alt="search" className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="default"
            size="default"
            className="text-white px-4 py-2 rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#5B2A86" }}
          >
            Crear nuevo usuario
          </Button>
        </div>

        {/* Pass search & filter to UserTable */}
        <UserTable search={search} filter={filter} />
      </div>
    </>
  );
};

export default UserListPage;
