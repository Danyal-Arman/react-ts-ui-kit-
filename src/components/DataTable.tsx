import  { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];
    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleRowSelect = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (data.length === 0) return <p className="p-4 text-gray-500">No data available</p>;

  return (
    <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="p-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-left cursor-pointer"
                onClick={() => handleSort(col)}
              >
                {col.title}{" "}
                {col.sortable &&
                  (sortConfig?.key === col.dataIndex
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : "⇅")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {selectable && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
