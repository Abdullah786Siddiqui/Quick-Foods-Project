import { usePageTitle } from "@/components/shared/hooks"
import {
  Bell, Sun, LayoutDashboard,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Star, Tag,
  UtensilsCrossed
} from "@/components/shared/icons"
import { Input, Dialog, SidebarProvider   ,SidebarInset, SidebarTrigger ,DialogContent, Separator} from "@/components/shared/ui"
import { AppSidebar, AppBreadcrumb } from "@/components/shared/layout"
import { Outlet } from "@/components/shared/router"


const RestaurantDashboard = () => {
  usePageTitle("dashboard");
 
  const RestaurantSidebarItems = [
  { title: "Dashboard", url: "/restaurant", icon: LayoutDashboard },
  { title: "Orders", url: "/restaurant/orders", icon: ShoppingCart },
  { title: "Menu", url: "/restaurant/menu", icon: UtensilsCrossed },
  { title: "Deals", url: "/restaurant/deals", icon: Tag },
  { title: "Earnings", url: "/restaurant/earnings", icon: CreditCard },
  { title: "Reviews", url: "/restaurant/reviews", icon: Star }, // Star icon for reviews
  { title: "Reports", url: "/restaurant/reports", icon: BarChart3 },
];



  return (
    <SidebarProvider>
      <AppSidebar panelName="Restaurant" navItems={RestaurantSidebarItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
          <SidebarTrigger className="-ml-1" />
          <Dialog>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumb />

            <DialogContent showCloseButton={false} className="sm:max-w-lg w-full p-4">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Type to search..."
                className="w-full "
              />

            

            </DialogContent>
          </Dialog>

          {/* Right side icons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notification */}
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Bell className="h-5 w-5" />
            </div>

            {/* Theme Toggle */}
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Sun className="h-5 w-5" />
            </div>

            {/* Admin Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden border cursor-pointer">
              <img
                src="https://github.com/shadcn.png" // replace with your image path
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </header>

        <main>
          <Outlet />
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}

export default RestaurantDashboard