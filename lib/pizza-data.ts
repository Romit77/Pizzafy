export interface PizzaOrder {
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
}

export const pizzaOrders: PizzaOrder[] = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2024-01-15 14:30",
    status: "Delivered",
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-01-15 15:45",
    status: "Out for Delivery",
  },
  {
    id: "PZA003",
    customerName: "Mike Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2024-01-15 16:20",
    status: "Preparing",
  },
  {
    id: "PZA004",
    customerName: "Sarah Wilson",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2024-01-15 17:10",
    status: "Pending",
  },
  {
    id: "PZA005",
    customerName: "David Brown",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2024-01-15 18:00",
    status: "Cancelled",
  },
  {
    id: "PZA006",
    customerName: "Emily Davis",
    pizzaType: "Four Cheese",
    quantity: 1,
    orderDate: "2024-01-15 19:30",
    status: "Delivered",
  },
  {
    id: "PZA007",
    customerName: "Alex Miller",
    pizzaType: "BBQ Chicken",
    quantity: 2,
    orderDate: "2024-01-15 20:15",
    status: "Preparing",
  },
  {
    id: "PZA008",
    customerName: "Lisa Anderson",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2024-01-15 21:00",
    status: "Pending",
  },
  {
    id: "PZA009",
    customerName: "Chris Taylor",
    pizzaType: "Pepperoni",
    quantity: 3,
    orderDate: "2024-01-16 12:30",
    status: "Out for Delivery",
  },
  {
    id: "PZA010",
    customerName: "Amanda White",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-01-16 13:45",
    status: "Delivered",
  },
];
