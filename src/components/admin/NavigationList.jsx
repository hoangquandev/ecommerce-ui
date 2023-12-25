import duotone from "../icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/admin",
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      {
        name: "Product List",
        path: "/admin/products",
      },
      {
        name: "Create Product",
        path: "/admin/products/create",
      },
      {
        name: "Category",
        path: "/admin/products/categories",
      },
      {
        name: "Brand",
        path: "/admin/products/brands",
      }
    ],
  },
  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      {
        name: "Order List",
        path: "/admin/orders",
      }
    ],
  },
  {
    name: "Customers",
    icon: duotone.Customers,
    path: "/admin/customers",
  },
  {
    name: "Users",
    icon: duotone.Customers,
    path: "/admin/users",
  },
  {
    type: "label",
    label: "Vendor",
  },

  {
    name: "Shop Setting",
    icon: duotone.SiteSetting,
    path: "/admin/shop-settings",
  },
  {
    name: "Support Tickets",
    icon: duotone.ElementHub,
    path: "/admin/support-tickets",
  },
  {
    name: "Account Setting",
    icon: duotone.AccountSetting,
    path: "/admin/account-setting",
  },
  {
    name: "Site Setting",
    icon: duotone.SiteSetting,
    path: "/admin/site-settings",
  },
  {
    name: "Logout",
    icon: duotone.Session,
    path: "/",
  },
];
