import { SectionCards } from '@/components/section-cards';
import usePageTitle from '@/hooks/usePageTitle';
import { DataTableDemo } from '@/components/data-table';
const Users = () => {
  usePageTitle("User");

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 ">
        <SectionCards />
      <DataTableDemo />

      </div>
    </>
  )
}

export default Users