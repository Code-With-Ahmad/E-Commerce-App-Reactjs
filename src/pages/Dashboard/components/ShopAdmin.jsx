import React from "react";

import { AlertTriangle } from "lucide-react";

const ShopAdmin = ({ message = "Oops! No Data Available" }) => {
  return (
    <div className="flex flex-col h-full mt-40  items-center justify-center p-6 text-center">
      <AlertTriangle className="w-12 h-12 text-gray-400" />
      <h2 className="text-xl font-semibold text-gray-600 mt-2">{message}</h2>
    </div>
  );
};
export default ShopAdmin;
