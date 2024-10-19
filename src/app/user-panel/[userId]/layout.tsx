"use client";

import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { usePathname } from "next/navigation";
import { useState } from "react";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/user-panel/:id": "Admin",
  "/user-panel/:id/dashboard": "Dashboard",
  "/user-panel/:id/posts": "All Posts",
  "/user-panel/:id/newPosts": "New Post",
  "/user-panel/:id/categories": "Categories",
  "/user-panel/:id/tags": "Tags",
  "/users": "Users",
  "/user-panel/:id/account": "Account",
};

const routeTitles: Record<string, string> = {
  "/": "Welcome",
  "/user-panel/:id": "Admin Panel",
  "/user-panel/:id/dashboard": "Dashboard Overview",
  "/user-panel/:id/posts": "All Posts",
  "/user-panel/:id/newPosts": "New Posts",
  "/user-panel/:id/categories": "View Categories",
  "/user-panel/:id/tags": "Explore Tags",
  "/users": "User Management",
  "/user-panel/:id/account": "Account Settings",
};


const matchRoutePattern = (pathname: string, routes: Record<string, string>) => {
  for (const route in routes) {
    
    const pattern = route.replace(/:id/g, "([^/]+)");
    const regex = new RegExp(`^${pattern}$`);

    
    if (regex.test(pathname)) {
      return routes[route]; 
    }
  }
  return null; 
};

export default function demoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const id = pathSegments[1] || "default-id";
  // console.log(id);
  

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${
      pathSegments.slice(0, index + 2).join("/")
    }`;
    const label = matchRoutePattern(href, routeLabels) || segment;
    

    return { href, label };
  });

  console.log(breadcrumbs, "r");

  const title = matchRoutePattern(pathname, routeTitles) || "Default Title";

  return (
    <AdminPanelLayout>
      <ContentLayout title={title}>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              if (index < breadcrumbs.length - 1) {
                return (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                    {index < breadcrumbs.length - 2 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                );
              }
            })}
            {/* <BreadcrumbItem>
              <BreadcrumbPage>{children}</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <PlaceholderContent children={children} />
      </ContentLayout>
    </AdminPanelLayout>
  );
}
