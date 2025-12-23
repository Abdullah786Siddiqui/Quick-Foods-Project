import { Card, CardDescription, CardTitle , } from "@/components/shared/ui"
import { Button } from "@/components/ui/button"
import CategoryItem from "./categoryList"

const Menu = () => {
  return (
    <>
<Card className="px-4 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 mx-4">
  {/* Left section: Title & Description */}
  <div className="flex-1 text-center sm:text-left">
    <CardTitle className="text-lg font-semibold">
      Menu Management
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground mt-0.5">
      Manage details for your menu items
    </CardDescription>
  </div>

  {/* Right section: Buttons */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
    <Button variant="secondary" className="w-full sm:w-auto cursor-pointer">
      Save Draft
    </Button>
    <Button
      variant="default"
      className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
    >
      Add Category
    </Button>
  </div>
</Card>



<CategoryItem />

      </>  )
}

export default Menu