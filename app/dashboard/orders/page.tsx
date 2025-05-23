"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FunnelIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface PizzaOrder {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status:
    | "Pending"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  total: number;
}

const mockOrders: PizzaOrder[] = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2024-01-20 14:30",
    status: "Delivered",
    total: 24.99,
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-01-20 15:45",
    status: "Preparing",
    total: 18.5,
  },
  {
    id: "PZA003",
    customerName: "Mike Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2024-01-20 16:20",
    status: "Out for Delivery",
    total: 45.99,
  },
  {
    id: "PZA004",
    customerName: "Sarah Wilson",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2024-01-20 17:15",
    status: "Pending",
    total: 22.75,
  },
  {
    id: "PZA005",
    customerName: "Tom Brown",
    pizzaType: "Hawaiian",
    quantity: 2,
    orderDate: "2024-01-20 18:00",
    status: "Delivered",
    total: 36.5,
  },
  {
    id: "PZA006",
    customerName: "Lisa Davis",
    pizzaType: "Meat Lovers",
    quantity: 1,
    orderDate: "2024-01-20 19:30",
    status: "Cancelled",
    total: 28.99,
  },
  {
    id: "PZA007",
    customerName: "Chris Lee",
    pizzaType: "Margherita",
    quantity: 4,
    orderDate: "2024-01-21 12:15",
    status: "Preparing",
    total: 49.96,
  },
  {
    id: "PZA008",
    customerName: "Amy Taylor",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-01-21 13:45",
    status: "Out for Delivery",
    total: 19.99,
  },
];

type SortField = keyof PizzaOrder;
type SortDirection = "asc" | "desc";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = mockOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "orderDate") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, sortField, sortDirection]);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex px-3 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case "Delivered":
        return `${baseClasses} bg-gradient-to-r from-green-100 to-emerald-100 text-green-800`;
      case "Preparing":
        return `${baseClasses} bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800`;
      case "Out for Delivery":
        return `${baseClasses} bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800`;
      case "Pending":
        return `${baseClasses} bg-gradient-to-r from-orange-100 to-red-100 text-orange-800`;
      case "Cancelled":
        return `${baseClasses} bg-gradient-to-r from-red-100 to-pink-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const statuses = [
    "all",
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Pizza Orders
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track and manage all pizza orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100">
            Total Orders:{" "}
            <span className="font-bold text-orange-600">
              {filteredAndSortedOrders.length}
            </span>
          </span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-11 pr-8 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white/80 backdrop-blur-sm transition-all duration-200"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Order ID</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("customerName")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Customer</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("pizzaType")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Pizza Type</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("quantity")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Quantity</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("orderDate")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Order Date</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("total")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Total</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ChevronUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/60 backdrop-blur-sm divide-y divide-gray-200">
              {filteredAndSortedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                    {order.pizzaType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="text-6xl mb-4">🍕</div>
            <p className="text-gray-600 text-lg">
              No orders found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
