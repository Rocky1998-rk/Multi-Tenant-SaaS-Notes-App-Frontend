import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 flex justify-between items-center shadow-lg fixed w-full top-0 z-10">
      {/* Brand */}
      <h1 className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer">
        SaaS <span className="text-yellow-300">Notes</span>
      </h1>

      {user && (
        <div className="flex gap-6 items-center">
          {/* Role Based Links */}
          {user.role === "Admin" && (
            <>
              <Link
                to="/invite"
                className="hover:text-yellow-300 transition-colors duration-300 font-medium"
              >
                Invite User
              </Link>
              <Link
                to="/tenants"
                className="hover:text-yellow-300 transition-colors duration-300 font-medium"
              >
                Manage Tenants
              </Link>
            </>
          )}

          <Link
            to="/dashboard"
            className="hover:text-yellow-300 transition-colors duration-300 font-medium"
          >
            My-Notes
          </Link>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
