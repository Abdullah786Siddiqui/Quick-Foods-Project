import { SectionCards  } from '@/components/section-cards'
import {  Bike,  Home,  User } from 'lucide-react';

const Dashboard = () => {
 const data = [
    {
      title: "Total Users",
      value: 5,
      Icon: User,
      detail: "+120 this month",
      detailColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-100",
    },
    {
      title: "Total Restaurant Partners",
      value:6,
      Icon: Home,
      detail: "34% of total",
      detailColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Delivery Partners",
      value: 1,
      Icon: Bike,
      detail: "128 need attention",
      detailColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    // You can easily add more cards here
  ];
    
    return (
        <>
               <div className="flex flex-1 flex-col gap-4 ">
            <SectionCards cardData={data} />
        </div>
        </>
    )
}

export default Dashboard