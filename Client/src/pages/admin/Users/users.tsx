import { SectionCards } from '@/components/section-cards';
import usePageTitle from '@/hooks/usePageTitle';
import DataTable from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import api from '@/Api/api';

const Users = () => {
  usePageTitle("User");

  const fetchUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data; 
  };

  const { data, isLoading, error ,isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return   <p>     Error: {error.message ||  "Something went wrong"} </p>;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* <div className="max-w-xl mx-auto mt-10 border rounded shadow">
        {data?.map((user: any) => (
          <div key={user.id} className="p-4 border-b">
            <h2 className="font-bold">{user.firstName}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div> */}

      <SectionCards />
      <DataTable data={data} />
    </div>
  );
};

export default Users;
