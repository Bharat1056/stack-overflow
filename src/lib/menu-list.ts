import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

function replaceIdInRoute(route: string, id: string) {
  return route.replace(":id", id);
}

export function getMenuList(pathname: string): Group[] {
  
  const pathSegments = pathname.split("/").filter(Boolean);
  const id = pathSegments[1] || "default-id"; 

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: replaceIdInRoute(`/user-panel/:id/dashboard`, id),
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: replaceIdInRoute("/user-panel/:id/posts", id),
              label: "All Posts"
            },
            {
              href: replaceIdInRoute("/user-panel/:id/newPosts", id),
              label: "New Post"
            }
          ]
        },
        {
          href: replaceIdInRoute("/user-panel/:id/categories", id),
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark
        },
        {
          href: replaceIdInRoute("/user-panel/:id/tags", id),
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag
        },
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: replaceIdInRoute("/user-panel/:id/account", id),
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings
        }
      ]
    }
  ];
}