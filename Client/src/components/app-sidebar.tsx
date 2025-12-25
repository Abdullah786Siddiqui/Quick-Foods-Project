
import type * as React from "react"
import {

  Utensils,
  type LucideIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { Sidebar, SidebarContent, SidebarHeader,  } from "@/components/ui/sidebar"

// Sample data
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     { title: "Dashboard", url: "/", icon: LayoutDashboard, isActive: true },
//     { title: "Users", url: "/users", icon: Users },
//     { title: "Orders", url: "#", icon: ShoppingCart },
//     { title: "Restaurant Partners", url: "/restaurant", icon: Store },
//     { title: "Delivery Partners", url: "/delivery", icon: Truck },
//     { title: "Menu", url: "/menu", icon: UtensilsCrossed },
//     { title: "Promotions", url: "#", icon: Tag },
//     { title: "Payments", url: "#", icon: CreditCard },
//     { title: "Reports", url: "#", icon: BarChart3 },
//   ],
// }

export type SidebarItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  panelName: string
  navItems: SidebarItem[]
}

export function AppSidebar({ panelName, navItems, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
    <SidebarHeader>
  <div className="flex items-center gap-2 mt-1 group-data-[collapsible=icon]:justify-center">
    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-lg">
      <Utensils className="w-5 h-5 md:w-6 md:h-6" />
    </div>
    <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
      <span className="font-medium text-sm md:text-base">Quick Foods</span>
      <span className="text-xs md:text-sm">{panelName} Panel</span>
    </div>
  </div>
</SidebarHeader>


      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      
    </Sidebar>
  )
}
