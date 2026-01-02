"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, MapPin, Search, ShoppingCart, User, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("San Francisco, CA")
  const locationDropdownRef = useRef<HTMLDivElement>(null)

  const cities = [
    "San Francisco, CA",
    "Los Angeles, CA",
    "New York, NY",
    "Chicago, IL",
    "Seattle, WA",
    "Austin, TX",
    "Denver, CO",
    "Miami, FL",
  ]

  const menuItems = [
    { label: "Restaurants", href: "#" },
    { label: "Offers", href: "#" },
    { label: "Help", href: "#" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-navbar-border bg-navbar-bg shadow-navbar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6 lg:h-24">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navbar-logo-bg sm:h-12 sm:w-12">
                <span className="text-lg font-bold text-navbar-logo-fg sm:text-xl">F</span>
              </div>
              <span className="hidden text-base font-bold text-navbar-fg sm:inline-block lg:text-lg">FoodHub</span>
            </a>
          </div>

          {/* Desktop Menu - Hidden on Mobile */}
          <div className="hidden flex-1 lg:flex lg:gap-8 lg:px-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors text-sm font-medium text-navbar-muted hover:text-navbar-fg"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Location Selector - Center/Hidden based on breakpoint */}
          <div className="hidden md:flex md:flex-shrink-0" ref={locationDropdownRef}>
            <div className="relative w-48">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex w-full items-center gap-2 rounded-lg border border-navbar-border bg-navbar-input px-3 py-2 transition-all duration-200 hover:border-navbar-accent hover:bg-navbar-input-hover active:scale-95 sm:px-4 sm:py-3"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-navbar-accent sm:h-5 sm:w-5" />
                <span className="flex-1 truncate text-left text-sm font-medium text-navbar-fg sm:text-base">
                  {selectedCity}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 sm:h-5 sm:w-5 ${
                    isLocationDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLocationDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-navbar-border bg-navbar-dropdown shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-56 overflow-y-auto">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city)
                          setIsLocationDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 text-left text-sm transition-colors sm:text-base ${
                          selectedCity === city
                            ? "bg-navbar-accent text-navbar-accent-fg font-medium"
                            : "text-navbar-fg hover:bg-navbar-hover"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Search Bar - Desktop Only */}
            <div className="hidden md:flex">
              <div className="flex items-center rounded-lg border border-navbar-border bg-navbar-input px-3 py-2 transition-all duration-200 hover:border-navbar-accent sm:px-4 sm:py-3">
                <Search className="h-4 w-4 text-navbar-muted sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="ml-2 w-32 border-0 bg-transparent text-sm outline-none placeholder:text-navbar-muted-lighter text-navbar-fg sm:ml-3 sm:w-40 sm:text-base"
                />
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 rounded-lg hover:bg-navbar-input transition-colors">
              <Search className="h-5 w-5 text-navbar-fg" />
            </button>

            {/* Cart Icon */}
            <button className="relative p-2 rounded-lg hover:bg-navbar-input transition-colors group">
              <ShoppingCart className="h-5 w-5 text-navbar-fg group-hover:text-navbar-accent sm:h-6 sm:w-6" />
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-navbar-badge text-xs font-bold text-navbar-badge-fg flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile Icon */}
            <button className="p-2 rounded-lg hover:bg-navbar-input transition-colors group">
              <User className="h-5 w-5 text-navbar-fg group-hover:text-navbar-accent sm:h-6 sm:w-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-navbar-input transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-navbar-fg" />
              ) : (
                <Menu className="h-6 w-6 text-navbar-fg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shows when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200 border-t border-navbar-border bg-navbar-mobile-menu lg:hidden pb-4">
            {/* Mobile Location Selector */}
            <div className="px-2 py-4">
              <div className="text-xs font-semibold text-navbar-muted-lighter uppercase tracking-wide mb-3">
                Delivery to
              </div>
              <button className="w-full flex items-center gap-2 rounded-lg border border-navbar-border bg-navbar-input px-3 py-2.5 text-sm font-medium text-navbar-fg transition-all hover:border-navbar-accent hover:bg-navbar-input-hover">
                <MapPin className="h-4 w-4 text-navbar-accent flex-shrink-0" />
                <span className="text-left">{selectedCity}</span>
              </button>
            </div>

            {/* Mobile Search */}
            <div className="px-2 pb-4">
              <div className="flex items-center rounded-lg border border-navbar-border bg-navbar-input px-3 py-2.5">
                <Search className="h-4 w-4 text-navbar-muted" />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="ml-2 w-full border-0 bg-transparent text-sm outline-none placeholder:text-navbar-muted-lighter text-navbar-fg"
                />
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="px-2 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navbar-fg transition-colors hover:bg-navbar-input"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
