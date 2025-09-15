// import { useState, useEffect } from "react";
// import API from "../api/axios";

// const ManageTenants = () => {
//   const [tenants, setTenants] = useState([]);
//   console.log("data T:", tenants)

//   const fetchTenants = async () => {
//     const res = await API.get("/tenants");
//     setTenants(res.data);
//   };

//   const upgradePlan = async (id) => {
//     await API.put(`/tenants/${id}/upgrade`);
//     fetchTenants();
//   };

//   useEffect(() => {
//     fetchTenants();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Manage Tenants</h2>
//       <ul className="space-y-3">
//         {tenants.map((tenant) => (
//           <li key={tenant._id} className="p-4 bg-white shadow rounded-xl flex justify-between items-center">
//             <div>
//               <h3 className="font-semibold">Name: {tenant.name}</h3>
//               <p className="text-gray-600">Plan: {tenant.subscription}</p>
//             </div>
//             <button
//               onClick={() => upgradePlan(tenant._id)}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               Upgrade
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageTenants;




import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { motion } from "framer-motion";

const ManageTenants = () => {
  const [tenants, setTenants] = useState([]);

  // Fetch Tenants
  const fetchTenants = async () => {
    try {
      const res = await API.get("/tenants");
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants:", err);
    }
  };

  // Upgrade Tenant
  const handleUpgrade = async (id) => {
    try {
      const res = await API.post(`/tenants/${id}/upgrade`, {
        subscription: "Pro",
      });
      alert(res.data.message);
      fetchTenants();
    } catch (err) {
      console.error("Error upgrading tenant:", err);
      alert("Failed to upgrade tenant");
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex justify-center items-start py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8 mt-15"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Manage Tenants
        </h2>

        {tenants.length === 0 ? (
          <p className="text-center text-gray-700">No tenants found</p>
        ) : (
          <div className=" ">
            <table className="min-w-full text-center border-collapse ">
              <thead>
                  <tr className="bg-white/40 text-indigo-900 ">
                  <th className="p-3 border border-white/30">Name</th>
                  <th className="p-3 border border-white/30">Subscription</th>
                  <th className="p-3 border border-white/30">Action</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <motion.tr
                    key={tenant._id}
                    className="bg-white/20 backdrop-blur-md border border-white/30 transition-all"
                  >
                    <td className="p-3 border border-white/20 font-medium text-indigo-900">
                      {tenant.name}
                    </td>
                    <td className="p-3 border border-white/20 text-gray-800">
                      {tenant.subscription}
                    </td>
                    <td className="p-3 border border-white/20">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpgrade(tenant._id)}
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        Upgrade to Pro
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageTenants;
