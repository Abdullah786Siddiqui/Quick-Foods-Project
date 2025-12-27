import React from "react";


interface DataTableProps<T> {
  data: T[];
  headers: string[];
  isPending: boolean;
  isError: boolean;
  renderRow: (item: T, index: number) => React.ReactNode;
}

const DataTable = <T,>({
  data,
  headers,
  isPending,
  isError,
  renderRow,
}: DataTableProps<T>) => {
  return (
    <div className="px-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </th>
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* LOADING — UI SAME AS YOURS */}
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="bg-white border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                      <div className="flex flex-col gap-1">
                        <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                        <div className="w-32 h-2 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-gray-200 rounded-full animate-pulse" />
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
                  </td>

                  <td className="px-6 py-3">
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
                  </td>

                  <td className="px-6 py-3 flex gap-2">
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center py-4 text-red-500">
                  Error loading data.
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="text-center py-4 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DataTable;
