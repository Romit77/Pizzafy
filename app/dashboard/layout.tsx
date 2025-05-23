"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pizza,
  User,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-12 h-12 border-3 border-gradient-to-r from-blue-500 to-purple-500 border-t-transparent rounded-full shadow-lg"
        />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const navigation = [
    {
      name: "Welcome",
      href: "/dashboard",
      icon: User,
      current: pathname === "/dashboard",
    },
    {
      name: "Pizza Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
      current: pathname === "/dashboard/orders",
    },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 lg:translate-x-0 lg:static lg:inset-0"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100/50">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <Pizza className="w-8 h-8 text-orange-500" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Pizza Dashboard
            </span>
          </motion.div>
          <motion.button
            onClick={() => setSidebarOpen(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        item.current
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          item.current
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      />
                      <span>{item.name}</span>
                      {item.current && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute right-2 w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Enhanced Top Bar */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 px-4 py-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="hidden lg:block">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {pathname === "/dashboard" ? "Welcome" : "Pizza Orders"}
              </motion.h1>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Page Content */}
        <motion.main
          className="p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
