import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

export function AdminSidebar() {
  const navigate = useNavigate(); //mengubah rute
  const location = useLocation(); // mengambil rute

  // Menu khusus admin
  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-6 w-6" />, path: "/dashboard/admin" },
    { label: "User", icon: <UserCircleIcon className="h-6 w-6" />, path: "/dashboard/admin/pengguna" },
    { label: "Menu", icon: <ShoppingBagIcon className="h-6 w-6" />, path: "/dashboard/admin/menu" },
    { label: "Table", icon: <PresentationChartBarIcon className="h-6 w-6" />, path: "/dashboard/admin/meja" },
  ];

  // aktif item menu berdasarkan url saat ini
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = menuItems.findIndex(item => item.path === location.pathname);
    return savedIndex !== -1 ? savedIndex : 0;
  });

  // memperbarui ketika URL berubah
  useEffect(() => {
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, menuItems]);

  // fungsi untuk menangani klik menu
  const handleItemClick = (index, path) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    navigate(path);
  };


  //fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem("id_user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("activeIndex");
    navigate("/login");
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl bg-white border border-gray-200">
      <div className="mb-6 p-4 text-center">
        <Typography variant="h1" color="blue" className="font-bold text-3xl text-blue-600">
          Cafe Wikusama
        </Typography>
      </div>
      <List className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            className={`hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-md flex items-center p-2 ${activeIndex === index ? "bg-blue-100" : ""}`}
            onClick={() => handleItemClick(index, item.path)}
          >
            <ListItemPrefix>
              <span className={`${activeIndex === index ? "text-blue-700" : "text-gray-700"} transition-colors duration-300 ease-in-out`}>
                {item.icon}
              </span>
            </ListItemPrefix>
            <span className={`ml-2 ${activeIndex === index ? "text-blue-700" : "text-gray-800"} transition-colors duration-300 ease-in-out`}>
              {item.label}
            </span>
          </ListItem>
        ))}

        {/* Logout list item */}
        <ListItem
          className="hover:bg-red-100 transition-colors duration-300 ease-in-out rounded-md flex items-center p-2"
          onClick={handleLogout}
        >
          <ListItemPrefix>
            <span className="text-red-700 transition-colors duration-300 ease-in-out">
              <PowerIcon className="h-6 w-6" />
            </span>
          </ListItemPrefix>
          <span className="ml-2 text-red-700 transition-colors duration-300 ease-in-out">
            Logout
          </span>
        </ListItem>
      </List>
    </Card>
  );
}
