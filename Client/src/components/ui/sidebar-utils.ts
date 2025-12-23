import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

export const sidebarMenuButtonVariants = cva(
  "flex items-center gap-2 rounded-md p-2 hover:bg-gray-100",
  {
    variants: {
      variant: {
        default: "text-gray-700",
        destructive: "text-red-600",
      },
      size: {
        default: "text-base md:text-lg", // mobile: text-base, desktop: text-lg
        sm: "text-sm md:text-base",       // mobile: text-sm, desktop: text-base
        lg: "text-lg md:text-xl",         // mobile: text-lg, desktop: text-xl
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>

export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}