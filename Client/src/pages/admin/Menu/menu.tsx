
// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardDescription, CardTitle } from "@/components/ui/card"
// import { Edit2, Trash2, Search, Package, Star, Info, UploadCloud } from "lucide-react"

// // Mock data for demonstration
// const mockCategories = [
//   {
//     id: 1,
//     name: "Burgers",
//     description: "Premium handcrafted burgers",
//     image:
//       "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
//     itemCount: 4,
//     items: [
//       {
//         id: 101,
//         name: "Classic Cheeseburger",
//         price: "$8.99",
//         image:
//           "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
//       },
//       {
//         id: 102,
//         name: "Bacon BBQ Burger",
//         price: "$10.99",
//         image:
//           "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
//       },
//       {
//         id: 103,
//         name: "Mushroom Swiss Burger",
//         price: "$9.99",
//         image:
//           "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
//       },
//       {
//         id: 104,
//         name: "Spicy Jalapeño Burger",
//         price: "$9.49",
//         image:
//           "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
//       },
//     ],
//   },

//   {
//     id: 2,
//     name: "Pizza",
//     description: "Wood-fired pizzas",
//     image:
//       "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
//     itemCount: 3,
//     items: [
//       {
//         id: 201,
//         name: "Margherita",
//         price: "$12.99",
//         image:
//           "https://images.unsplash.com/photo-1548365328-8b849e6f7d8a?w=800&q=80",
//       },
//       {
//         id: 202,
//         name: "Pepperoni",
//         price: "$13.99",
//         image:
//           "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
//       },
//       {
//         id: 203,
//         name: "Vegetarian",
//         price: "$12.49",
//         image:
//           "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
//       },
//     ],
//   },

//   {
//     id: 3,
//     name: "Salads",
//     description: "Fresh salad options",
//     image:
//       "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
//     itemCount: 2,
//     items: [
//       {
//         id: 301,
//         name: "Caesar Salad",
//         price: "$7.99",
//         image:
//           "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
//       },
//       {
//         id: 302,
//         name: "Greek Salad",
//         price: "$8.49",
//         image:
//           "https://images.unsplash.com/photo-1568600891621-2dc1e8d8b7e4?w=800&q=80",
//       },
//     ],
//   },
// ];

// const Menu = () => {
//   const [categories, setCategories] = useState(mockCategories)
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(mockCategories[0]?.id || null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [formData, setFormData] = useState({ name: "", description: "" })

//   const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
//   const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

//   const handleAddCategory = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (formData.name.trim()) {
//       const newCategory = {
//         id: Math.max(...categories.map((c) => c.id), 0) + 1,
//         name: formData.name,
//         description: formData.description,
//         image: "/diverse-food-spread.png",
//         itemCount: 0,
//         items: [],
//       }
//       setCategories([...categories, newCategory])
//       setFormData({ name: "", description: "" })
//       setShowAddForm(false)
//     }
//   }



//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header Section */}

//       <Card className="px-4 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 mx-4">
//         <div className="flex-1 text-center sm:text-left">
//           <CardTitle className="text-lg font-semibold">
//             Menu Management
//           </CardTitle>
//           <CardDescription className="text-sm text-muted-foreground mt-0.5">
//             Manage details for your menu items
//           </CardDescription>
//         </div>


//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
//           <Button variant="secondary" className="w-full sm:w-auto cursor-pointer">
//             Save Draft
//           </Button>
//           <Button
//             onClick={() => setShowAddForm(!showAddForm)}
//             variant="default"
//             className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
//           >
//             Add Category
//           </Button>
//         </div>
//       </Card>

//       {/* Main Two-Pane Layout */}
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         {/* Add Category Form - Full Width above panes */}
//         {showAddForm && (
//     <Card className="mb-8 p-0 bg-card border border-border shadow-md">
//   <div className="p-4 md:p-6">
//     {/* Header */}
//     <div className="flex items-center gap-3 mb-6">
//       <div className="w-1.5 h-7 bg-primary rounded-full"></div>
//       <h2 className="text-xl md:text-2xl font-bold text-foreground">Add New Category</h2>
//     </div>

//     {/* Form */}
//     <form onSubmit={handleAddCategory} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//         {/* Category Name */}
//         <div>
//           <label className="block text-sm font-semibold text-foreground mb-2.5">
//             Category Name *
//           </label>
//           <Input
//             type="text"
//             placeholder="e.g., Appetizers, Desserts"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="bg-background border-border text-foreground h-12 placeholder:text-muted-foreground/60 px-3 rounded-md w-full"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//     <div>
//   <label className="block text-sm font-semibold text-foreground mb-2.5">
//     Upload Image *
//   </label>
//   <div className="flex items-center justify-center w-full">
//     <label
//       className="cursor-pointer w-full h-40 md:h-48 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg transition-all text-muted-foreground text-center px-4"
//       style={{ backgroundColor: "#E0E7FF" }}
//     >
//       <span className="mb-2 text-primary">
//         <UploadCloud className="w-7 h-7 md:w-8 md:h-8" />
//       </span>
//       <span className="text-sm md:text-base">
//         Click to upload or drag and drop
//       </span>
//       <Input
//         type="file"
//         accept="image/png, image/jpeg, image/svg+xml"
//         onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//         className="hidden"
//         required
//       />
//     </label>
//   </div>
// </div>


//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col justify-end sm:flex-row gap-3 mt-4">
//         <Button
//           type="submit"
//           className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-6 py-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto rounded-md"
//         >
//           Create Category
//         </Button>
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => {
//             setShowAddForm(false);
//             setFormData({ name: "", image: null });
//           }}
//           className="border-border text-foreground hover:bg-muted/50 w-full sm:w-auto rounded-md px-6 py-2"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   </div>
// </Card>


//         )}

//         {/* Two Pane Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
//           {/* LEFT PANE - Category List */}
//           <div className="lg:col-span-1">
//             <Card className="bg-card border gap-2 border-border shadow-sm p-0 h-full flex flex-col rounded-xl overflow-hidden">

//               {/* Header */}
//               <div className="p-4 sm:p-5 border-b border-border space-y-4">

//                 {/* Title + Icon */}
//                 <div className="flex items-center gap-3">

//                   <div className="flex items-center justify-center
//                     w-9 h-9
//                     rounded-lg
//                     bg-primary/10 text-primary
//                     flex-shrink-0">
//                     <Package className="w-5 h-5" />
//                   </div>

//                   <div className="leading-tight">
//                     <h3 className="text-base sm:text-lg font-semibold text-foreground">
//                       Categories
//                     </h3>
//                     <p className="text-xs sm:text-sm text-muted-foreground">
//                       Browse & manage food categories
//                     </p>
//                   </div>

//                 </div>

//                 {/* Search */}
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     type="text"
//                     placeholder="Search categories..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="
//         pl-9 h-10
//         text-sm
//         bg-background
//         border-border
//         focus-visible:ring-1
//         focus-visible:ring-primary
//       "
//                   />
//                 </div>

//               </div>



//               {/* Scrollable List */}
//               <div className="flex-1 overflow-y-auto">

//                 {filteredCategories.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full px-4 text-center">
//                     <Package className="w-9 h-9 text-muted-foreground/40 mb-2" />
//                     <p className="text-sm text-muted-foreground">
//                       {searchTerm ? "No categories found" : "No categories yet"}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="p-3 sm:p-4 space-y-2">
//                     {filteredCategories.map((category) => {
//                       const active = selectedCategory === category.id;

//                       return (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`
//     w-full text-left
//     p-3 sm:p-4
//     rounded-xl
//     border
//     transition-all duration-200
//     focus:outline-none
//     ${active
//                               ? "bg-primary/15 border-primary/40 shadow-sm"
//                               : "bg-muted/30 border-transparent hover:bg-muted/50 hover:border-border"
//                             }
//   `}
//                         >
//                           <div className="flex items-start gap-3">
//                             {/* Image */}
//                             <img
//                               src={category.image || "/placeholder.svg?height=60&width=60&query=food"}
//                               alt={category.name}
//                               className="
//         w-11 h-11 sm:w-12 sm:h-12
//         rounded-lg
//         object-cover
//         flex-shrink-0
//       "
//                             />

//                             {/* Content */}
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center justify-between">
//                                 <h4 className="text-sm font-semibold text-foreground truncate">
//                                   {category.name}
//                                 </h4>

//                                 {/* Item count badge in front of text */}
//                                 <span
//                                   className="
//             inline-flex items-center
//             text-[11px]
//             font-medium
//             px-2 py-0.5
//             rounded-md
//             bg-primary/20 text-primary
//           "
//                                 >
//                                   {category.itemCount} items
//                                 </span>
//                               </div>

//                               <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
//                                 {category.description}
//                               </p>
//                             </div>
//                           </div>
//                         </button>

//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </Card>
//           </div>


//           {/* RIGHT PANE - Menu Items Details */}
//           <div className="lg:col-span-2 ">
//             {selectedCategoryData ? (
//               <Card className="bg-card border border-border p-0 gap-2 shadow-md h-full flex flex-col">
//                 {/* Header */}
//               <div className="p-3 sm:p-5 border-border flex-shrink-0 bg-white shadow-sm rounded-xl">
//   <div className="flex gap-3 sm:gap-4 items-start">
//     {/* Category Image */}
//     <img
//       src={selectedCategoryData.image || "/placeholder.svg?height=80&width=80&query=food"}
//       alt={selectedCategoryData.name}
//       className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-md"
//     />

//     {/* Category Info */}
//     <div className="flex-1 flex flex-col">
//       <h3 className="text-lg sm:text-2xl font-bold text-foreground">
//         {selectedCategoryData.name}
//       </h3>
//       <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">
//         {selectedCategoryData.description}
//       </p>

//       {/* Stats / Badges */}
//       <div className="flex flex-wrap gap-2 mt-1 sm:mt-2">
//         <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-primary/10 text-primary font-medium text-xs sm:text-sm">
//           <Package className="w-3 h-3 sm:w-4 sm:h-5" />
//           {selectedCategoryData.itemCount} items
//         </span>
//         <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-green-100 text-green-700 font-medium text-xs sm:text-sm">
//           <Star className="w-3 h-3 sm:w-4 sm:h-5" />
//           {selectedCategoryData.rating || 4.5} rating
//         </span>
//       </div>
//     </div>

//     {/* Optional Action / Info Icon */}
//     <div className="flex-shrink-0">
//       <button className="bg-primary/10 text-primary p-1.5 sm:p-2.5 rounded-lg hover:bg-primary/20 transition">
//         <Info className="w-4 h-4 sm:w-5 sm:h-5" />
//       </button>
//     </div>
//   </div>
// </div>






//                 {/* Menu Items Grid */}
//                 <div className="flex-1 overflow-y-auto p-4">
//                   {selectedCategoryData.items.length === 0 ? (
//                     <div className="h-full flex flex-col items-center justify-center text-center">
//                       <Package className="w-12 h-12 text-muted-foreground/40 mb-3" />
//                       <p className="text-muted-foreground">No menu items in this category</p>
//                     </div>
//                   ) : (
//                     <div>
//                       <h4 className="font-bold text-lg text-foreground mb-5 flex items-center gap-2">
//                         <div className="w-1.5 h-6 bg-primary rounded-full"></div>
//                         Menu Items
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {selectedCategoryData.items.map((item) => (
//                           <Card
//                             key={item.id}
//                             className="bg-white p-0 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group w-full"
//                           >
//                             {/* Image Section */}
//                             <div className="relative">
//                               <img
//                                 src={item.image || "/placeholder.svg?height=120&width=240&query=food"}
//                                 alt={item.name}
//                                 className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
//                               />
//                               {/* Badge */}
//                               <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow">
//                                 {item.badge || "New"}
//                               </span>

//                             </div>

//                             {/* Content Section */}
//                             <div className="p-3 flex flex-col gap-1">
//                               {/* Name */}
//                               <h5 className="font-semibold text-foreground text-sm line-clamp-2">{item.name}</h5>

//                               {/* Rating Stars */}
//                               <div className="flex items-center gap-1 text-yellow-400 text-xs">
//                                 {[...Array(5)].map((_, i) => (
//                                   <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill={i < (item.rating || 4) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                                   </svg>
//                                 ))}
//                                 <span className="text-gray-500">({item.reviews || 20})</span>
//                               </div>

//                               {/* Description */}
//                               <p className="text-gray-500 text-xs line-clamp-2">{item.description || "Delicious food item made with fresh ingredients."}</p>

//                               {/* Price and Actions */}
//                               <div className="flex items-center justify-between mt-1">
//                                 <span className="text-sm font-bold text-primary">{item.price}</span>
//                                 <div className="flex gap-1">
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     className="text-foreground hover:bg-primary/10 hover:text-primary h-6 w-6 p-0 rounded-full"
//                                   >
//                                     <Edit2 className="w-3 h-3" />
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     className="text-destructive hover:bg-destructive/10 h-6 w-6 p-0 rounded-full"
//                                   >
//                                     <Trash2 className="w-3 h-3" />
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </Card>
//                         ))}
//                       </div>

//                     </div>
//                   )}
//                 </div>
//               </Card>
//             ) : (
//               <Card className="bg-card border border-border   shadow-md h-full flex items-center justify-center">
//                 <div className="text-center">
//                   <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
//                   <p className="text-muted-foreground">Select a category to view items</p>
//                 </div>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Menu












