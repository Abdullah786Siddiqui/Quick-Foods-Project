"use client"

export default function FoodDeliveryNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Left Section: Logo (Desktop) / User Icon (Mobile) */}
          <div className="flex items-center gap-3 flex-shrink-0 md:flex-1 md:justify-start">
            {/* User Icon - Visible on Mobile Only */}
            <button
              className="md:hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="User profile"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Logo Section - Visible on Desktop Only */}
            <div className="hidden md:flex items-center gap-3">
              <img src="/images/logo.png" alt="Quickfood" className="h-10 md:h-11 w-auto" />
            </div>
          </div>

          {/* Center Section: Logo (Mobile) */}
          <div className="flex md:hidden items-center">
            <img src="/images/logo.png" alt="Quickfood" className="h-10 w-auto" />
          </div>

          {/* Center Section: Location (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-xs mx-auto">
            <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-900">
              <svg className="h-5 w-5 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-500 dark:text-slate-400">Delivering to</div>
                <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">San Francisco, CA</div>
              </div>
              <svg
                className="h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 md:flex-1 md:justify-end">
            {/* Mobile Location Button (Visible only on Mobile) */}
            <button className="md:hidden flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
              <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">SF</span>
            </button>

            {/* Favorites Icon (Desktop Only) */}
            <button
              className="hidden md:block relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Favorites"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Cart Icon with Badge */}
            <button
              className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Shopping cart"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                2
              </span>
            </button>

            {/* Profile Icon (Desktop Only) */}
            <button
              className="hidden md:block rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="User profile"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Location Bar (Visible only on Mobile, below navbar) */}
        <div className="md:hidden border-t border-slate-200 bg-slate-50 px-2 py-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <svg className="h-5 w-5 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 dark:text-slate-400">Delivering to</div>
              <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">San Francisco, CA</div>
            </div>
            <svg
              className="h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  )
}
