"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Pizza,
  ShoppingCart,
  TrendingUp,
  Users,
  Sparkles,
  ArrowUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { pizzaOrders } from "@/lib/pizza-data";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      name: "Total Orders",
      value: pizzaOrders.length,
      icon: ShoppingCart,
      gradient: "from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Active Orders",
      value: pizzaOrders.filter((order) =>
        ["Pending", "Preparing", "Out for Delivery"].includes(order.status)
      ).length,
      icon: Clock,
      gradient: "from-orange-500 to-orange-600",
      change: "+5%",
      changeType: "positive",
    },
    {
      name: "Delivered Today",
      value: pizzaOrders.filter((order) => order.status === "Delivered").length,
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive",
    },
    {
      name: "Happy Customers",
      value: new Set(pizzaOrders.map((order) => order.customerName)).size,
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      change: "+15%",
      changeType: "positive",
    },
  ];

  const recentOrders = pizzaOrders
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Preparing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-orange-400/10 to-pink-400/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2,
                }}
                className="relative"
              >
                <img
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 border-3 border-white rounded-full"
                />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent"
                >
                  Hello, {session?.user?.name?.split(" ")[0]}! 👋
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-600 mt-2 text-lg"
                >
                  Welcome back to your pizza dashboard. Here's what's happening
                  today.
                </motion.p>
              </div>
            </div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden sm:block"
            >
              <Sparkles className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-1 text-green-600 text-sm font-medium"
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </motion.div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 mt-1">from last week</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enhanced Content Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Orders */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Recent Orders
            </h2>
            <Link
              href="/dashboard/orders"
              className="group flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <span>View All</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group flex items-center justify-between p-4 bg-gray-50/80 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-600">
                      {order.customerName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {order.pizzaType}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            {[
              {
                href: "/dashboard/orders",
                icon: ShoppingCart,
                title: "Manage Orders",
                description: "View and manage all pizza orders",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100",
                hoverBg: "from-blue-100 to-blue-200",
              },
              {
                href: "#",
                icon: Pizza,
                title: "Menu Management",
                description: "Update pizza menu and prices",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-50 to-orange-100",
                hoverBg: "from-orange-100 to-orange-200",
              },
              {
                href: "#",
                icon: TrendingUp,
                title: "Analytics",
                description: "View sales reports and insights",
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-50 to-green-100",
                hoverBg: "from-green-100 to-green-200",
              },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={action.href}
                    className={`group flex items-center space-x-4 p-4 bg-gradient-to-r ${action.bgGradient} hover:${action.hoverBg} rounded-xl border border-white/50 hover:border-white transition-all duration-200 shadow-sm hover:shadow-md`}
                  >
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {action.description}
                      </p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-gray-400 text-lg">→</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
