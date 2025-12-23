import { useLocation, Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { routeConfig, type RouteType } from "@/config/routeConfig"

export function AppBreadcrumb() {
  const { pathname } = useLocation()
  const paths = pathname.split("/").filter(Boolean)

  let current = ""

  const crumbs: RouteType[] = paths.length
    ? paths
        .map((p) => {
          current += `/${p}`
          return routeConfig.find((r) => r.path === current)
        })
        .filter((r): r is RouteType => Boolean(r))
    : [{ path: "/", label: "Dashboard" }]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <div key={c.path} className="flex items-center">
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={c.path}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

