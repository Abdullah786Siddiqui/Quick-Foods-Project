import DataTable from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import usePageTitle from '@/hooks/usePageTitle';

const Restaurant = () => {
  usePageTitle("Restaurant");

  return (
    <>
         <div className="flex flex-1 flex-col gap-4 ">
           <SectionCards />
         <DataTable />
   
         </div>
       </>
  )
}

export default Restaurant