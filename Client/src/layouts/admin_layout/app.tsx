import { usePageTitle } from "@/components/shared/hooks"
import { Bell, Sun, ArrowRight } from "@/components/shared/icons"
import { Input, Dialog, SidebarProvider   ,SidebarInset, SidebarTrigger ,DialogContent, Separator} from "@/components/shared/ui"
import { AppSidebar, AppBreadcrumb } from "@/components/shared/layout"
import { cn } from "@/lib/utils"
import { Outlet } from "@/components/shared/router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu"


const AdminDashboard = () => {
  usePageTitle("dashboard");
  const sidebarItems = [
    { name: "Dashboard", active: true },
    { name: "Orders", active: false },
    { name: "Products", active: false },
    { name: "Customers", active: false },
  ]


  return (
    <SidebarProvider>
      <AppSidebar />
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

              {/* Sidebar-like Navigation */}
              <div className="w-full p-4 bg-white border rounded-md">
                <p className="text-sm text-muted-foreground mb-4">Pages</p>
                <NavigationMenu orientation="vertical">
                  <NavigationMenuList className="flex flex-col space-y-1">
                    {sidebarItems.map((item) => (
                      <NavigationMenuItem
                        key={item.name}
                        className="w-full md:w-[430px]"
                      >
                        <NavigationMenuLink
                          className={cn(
                            "flex items-center flex-row justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            item.active
                              ? "bg-muted text-foreground"
                              : "hover:bg-muted text-muted-foreground"
                          )}
                        >
                          <div className="flex gap-3">
                            <ArrowRight className="w-4 h-4" />
                            {item.name}
                          </div>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

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

export default AdminDashboard