import React, { useEffect, useState } from "react";
import StatusSwitch from "./StatusSwitch";
import userIcon from "../../img/UserIcon.png";
import sellerIcon from "../../img/ShopIcon.png";
import actionIcon from "../../img/toolswi.png";
import type { FullUser } from "../types/User";
import UserConfigModal from "./UserConfigModal";

interface UserTableProps {
  search?: string;
  filter?: string;
}

const UserTable: React.FC<UserTableProps> = ({ search = "", filter = "" }) => {
  const [users, setUsers] = useState<FullUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data: FullUser[]) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const openModal = (u: FullUser) => {
    setSelectedUser(u);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getUserType = (u: FullUser) =>
    u.client ? "User" : u.vendor ? "Seller" : u.staff ? "Staff" : "Unknown";

  const getUserIcon = (u: FullUser) =>
    u.client ? userIcon : u.vendor ? sellerIcon : u.staff ? actionIcon : userIcon;

  // Filter and search
  const filteredUsers = users.filter((u) => {
    const type = u.client ? "user" : u.vendor ? "seller" : "staff";
    const matchesFilter = filter ? type === filter : true;
    const username =
      u.client?.username || u.vendor?.name || `${u.staff?.first_name} ${u.staff?.last_name}`;
    const matchesSearch =
      username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
        <thead className="uppercase text-xs">
          <tr className="bg-gray-200 rounded-t-lg">
            <th className="px-4 py-2 rounded-tl-lg">ID</th>
            <th className="px-4 py-2">Username / Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Last Connection</th>
            <th className="px-4 py-2 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => {
            const username =
              u.client?.username || u.vendor?.name || `${u.staff?.first_name} ${u.staff?.last_name}`;
            return (
              <tr key={u.id} className="bg-gray-100 hover:bg-gray-200 rounded">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {getUserType(u)}
                  <img src={getUserIcon(u)} alt="type" className="w-4 h-4" />
                </td>
                <td className="px-4 py-2">
                  {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : "Never"}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <StatusSwitch initial={true} />
                  <button onClick={() => openModal(u)}>
                    <img
                      src={actionIcon}
                      alt="action"
                      className="w-5 h-5 cursor-pointer hover:opacity-80"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination footer */}
      <div className="flex justify-between items-center mt-4 bg-gray-200 px-1 rounded">
        <div className="text-sm">
          Show{" "}
          <select className="border px-1 py-0.5 rounded mx-1 bg-white">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>{" "}
          per page
        </div>
        <div className="text-gray-500 text-sm">1-25 of {filteredUsers.length}</div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <UserConfigModal onCancel={closeModal} onSave={closeModal} userId={selectedUser.id} />
      )}
    </div>
  );
};

export default UserTable;
