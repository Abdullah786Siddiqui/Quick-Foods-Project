// routeConfig.ts
export interface RouteType {
  path: string
  label: string
}

export const routeConfig: RouteType[] = [
  { path: "/", label: "Dashboard" },
  { path: "/users", label: "Users" },
  { path: "/restaurant", label: "Restaurant" },
  { path: "/delivery", label: "Delivery" },
  { path: "/menu", label: "Menu" },




]


