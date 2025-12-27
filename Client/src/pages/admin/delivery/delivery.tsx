// import  DataTable  from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { usePageTitle } from "@/components/shared/hooks"


const Delivery = () => {
  usePageTitle("Delivery");

  return (
     <>
          <div className="flex flex-1 flex-col gap-4 ">
            <SectionCards />
          {/* <DataTable /> */}
    
          </div>
        </>
  )
}

export default Delivery