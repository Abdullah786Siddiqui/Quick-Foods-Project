import type { LucideIcon } from "lucide-react"

import { 
  Package,
  CheckCircle,
  AlertTriangle 
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

// --- 1. Define Card Data (for better maintainability and scalability) ---

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon; // Use the imported type for the icon component
  detail: string;
  detailColor: string; // Tailwind class for the color (e.g., 'text-fuchsia-500')
  bgColor: string; // Tailwind class for the background color (e.g., 'bg-fuchsia-100')
}

const cardData: StatCardProps[] = [
  {
    title: "Total Products",
    value: 7,
    Icon: Package,
    detail: "+120 this month",
    detailColor: "text-fuchsia-500",
    bgColor: "bg-fuchsia-100",
  },
  {
    title: "Completed",
    value: 6,
    Icon: CheckCircle,
    detail: "34% of total",
    detailColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Incomplete",
    value: 7,
    Icon: AlertTriangle,
    detail: "128 need attention",
    detailColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  // You can easily add more cards here
];

// --- 2. Create a Reusable Card Component (Optional but Recommended) ---

// This makes the main component cleaner and enforces a consistent structure for each card.
function StatCard({
  title,
  value,
  Icon,
  detail,
  detailColor,
  bgColor,
}: StatCardProps) {
  return (
    <Card className={bgColor}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${detailColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}


// --- 3. Main Component Implementation ---

export function SectionCards() {
  // Cleaned up the wrapper div classes:
  // - Combined `gap-4`
  // - Removed redundant/misplaced global gradient/shadow classes (they should usually be on the Card component itself or a specific wrapper if needed globally)
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((card) => (
        <StatCard 
          key={card.title} // A unique key is crucial when mapping
          {...card} 
        />
      ))}
    </div>
  )
}