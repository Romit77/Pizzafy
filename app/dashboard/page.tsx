"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      name: "Total Orders",
      value: "24",
      icon: ShoppingBagIcon,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Revenue",
      value: "$1,234",
      icon: CurrencyDollarIcon,
      change: "+8%",
      changeType: "positive",
    },
    {
      name: "Customers",
      value: "18",
      icon: UserGroupIcon,
      change: "+4%",
      changeType: "positive",
    },
    {
      name: "Avg Order Value",
      value: "$51.40",
      icon: ChartBarIcon,
      change: "-2%",
      changeType: "negative",
    },
  ];

  const recentOrders = [
    {
      id: "PZA001",
      customer: "John Doe",
      total: "$24.99",
      status: "Delivered",
    },
    {
      id: "PZA002",
      customer: "Jane Smith",
      total: "$36.50",
      status: "Preparing",
    },
    {
      id: "PZA003",
      customer: "Mike Johnson",
      total: "$18.75",
      status: "Out for Delivery",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const statCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-lg shadow-sm p-6"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {session?.user?.image ? (
              <motion.div
                className="relative h-16 w-16 rounded-full ring-4 ring-orange-100 overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/user.png"
                  alt={session?.user?.name || "User"}
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </motion.div>
            ) : (
              <motion.div
                className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  👋
                </motion.span>
              </motion.div>
            )}
          </motion.div>
          <div>
            <motion.h1
              className="text-3xl font-bold text-gray-900"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Hello, {session?.user?.name?.split(" ")[0] || "User"}!
              <motion.span
                className="ml-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                🍕
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-gray-600 mt-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Welcome back to your pizza dashboard. Here's what's happening
              today.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white overflow-hidden shadow-sm rounded-lg cursor-pointer"
            variants={statCardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </motion.div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <motion.div
                        className="text-2xl font-semibold text-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <motion.div
                        className={`ml-2 text-sm font-medium ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {stat.change}
                      </motion.div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white shadow-sm rounded-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="px-6 py-4 border-b border-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </motion.div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <motion.thead
              className="bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </motion.thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgb(249, 250, 251)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Preparing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Out for Delivery"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {order.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <motion.div
          className="px-6 py-3 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/dashboard/orders"
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            View all orders →
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
