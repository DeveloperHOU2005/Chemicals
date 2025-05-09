import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * SortableTable - A reusable table component with sortable columns
 * 
 * @param {Object} props - Component props
 * @param {Array} props.headers - Array of header objects with { key, label } format
 * @param {Array} props.data - Array of data objects to display
 * @param {string} props.initialSortField - The initial field to sort by (default: 'id')
 * @param {string} props.initialSortDirection - The initial sort direction ('asc' or 'desc', default: 'asc')
 * @param {Object} props.tableClasses - Custom CSS classes for table elements
 * @param {Function} props.onRowClick - Optional callback when a row is clicked (receives row data)
 * @param {boolean} props.isLoading - Whether the table is in loading state
 * @param {string} props.emptyMessage - Message to display when there's no data
 * @returns {JSX.Element} The rendered table component
 */
const SortableTable = ({ 
  headers = [], 
  data = [], 
  initialSortField = 'id', 
  initialSortDirection = 'asc',
  tableClasses = {},
  onRowClick,
  isLoading = false,
  emptyMessage = "Không có dữ liệu để hiển thị"
}) => {
  const [sortField, setSortField] = useState(initialSortField);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  
  // Default CSS classes that can be overridden
  const defaultClasses = {
    table: "min-w-full bg-white border border-gray-200",
    headerRow: "bg-gray-100",
    headerCell: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer border-b border-gray-300",
    row: "hover:bg-gray-50 transition-colors",
    cell: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100",
    container: "overflow-x-auto shadow-md rounded-lg",
    loadingContainer: "flex justify-center py-8",
    loadingSpinner: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
    emptyContainer: "text-center py-8 text-gray-500"
  };
  
  // Merge default classes with custom classes
  const classes = {
    table: tableClasses.table || defaultClasses.table,
    headerRow: tableClasses.headerRow || defaultClasses.headerRow,
    headerCell: tableClasses.headerCell || defaultClasses.headerCell,
    row: tableClasses.row || defaultClasses.row,
    cell: tableClasses.cell || defaultClasses.cell,
    container: tableClasses.container || defaultClasses.container,
    loadingContainer: tableClasses.loadingContainer || defaultClasses.loadingContainer,
    loadingSpinner: tableClasses.loadingSpinner || defaultClasses.loadingSpinner,
    emptyContainer: tableClasses.emptyContainer || defaultClasses.emptyContainer
  };
  
  const handleSort = (field) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, sort ascending by default
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort the data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    // Handle null or undefined values
    if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    // Handle string or number sorting
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
  });
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <div className={classes.loadingSpinner}></div>
      </div>
    );
  }
  
  // Handle empty state
  if (data.length === 0) {
    return (
      <div className={classes.emptyContainer}>
        {emptyMessage}
      </div>
    );
  }
  
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headerRow}>
            {headers.map((header) => (
              <th
                key={header.key}
                className={classes.headerCell}
                onClick={() => handleSort(header.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{header.label}</span>
                  {sortField === header.key && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-4 w-4 text-blue-600" /> : 
                      <ArrowDown className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={classes.row}
              onClick={() => onRowClick && onRowClick(row)}
              style={onRowClick ? { cursor: 'pointer' } : {}}
            >
              {headers.map((header) => (
                <td
                  key={`${rowIndex}-${header.key}`}
                  className={classes.cell}
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;