import React from "react";
import { Table, Button } from "react-bootstrap";
import Image from "next/image";

import Nodatafound from "../../../Assets/images/nodatafound.jpg";

const FlexibleTable = ({
  columns,
  data,
  onRowClick,
  actions,
  className,
  hideHeader = false,
  emptyMessage = "No data available",
  pageSize = 10,
  totalPages,
  currentPage = 1,
  setCurrentPage,
  onPageSizeChange,
  totalItems = 0,
  serverSidePagination = false,
}) => {

  let displayData = data;
  let calculatedTotalPages = totalPages;
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  if (!serverSidePagination) {

    calculatedTotalPages = Math.ceil(data.length / pageSize);
    displayData = data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  } else {
    // Server-side pagination - use data as is
    calculatedTotalPages = totalPages || Math.ceil(totalItems / pageSize);
  }

  const handlePrev = () => {
    if (currentPage > 1 && setCurrentPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < calculatedTotalPages && setCurrentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  const renderTableHeader = () => (
    <thead className="flexible_thead">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`p-2 text-left text-white  ${column.headerClassName || ""}`}
            style={column.headerStyle}
          >
            {column.title}
          </th>
        ))}

        {actions && (
          <th className="p-2 text-center"> {actions[0].actionname} </th>
        )}
      </tr>
    </thead>
  );


  const renderCell = (row, column) => {

    if (column.render) {
      return column.render(row[column.key], row);
    }


    return row[column.key];
  };


  const renderTableBody = () => {
    if (!displayData || displayData.length === 0) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={columns.length + (actions ? 1 : 0)}
              className="text-center p-4 text-black"
            >
              <div className="nodataimg">
                <Image
                  src={Nodatafound}
                  alt=""
                  width={200}
                  height={200}
                  className="img-fluid"
                />
              </div>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {displayData?.map((row, rowIndex) => (
          <tr
            key={row.id || rowIndex}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`p-2 ${column.cellClassName || ""}`}
                style={column.cellStyle}
              >
                {renderCell(row, column)}
              </td>
            ))}

            {actions && (
              <td className="p-2 text-center">
                <div
                  className={`actionBtn d-flex align-items-center gap-2 justify-content-center`}
                >
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                      className={action.className}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= calculatedTotalPages; i++) {
      buttons.push(
        <div
          key={i}
          onClick={() => handlePageClick(i)}
          className={`paginationBtn ${currentPage === i ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          {i}
        </div>,
      );
    }
    return buttons;
  };

  return (
    <div className={`tableCoomon ${className || ""}`}>
      <div className="pagenationTable">
        <Table responsive>
          {!hideHeader && renderTableHeader()}
          {renderTableBody()}
        </Table>
      </div>

      {totalItems > 0 && (
        <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-3">
        <div className="showingSelect d-flex align-items-center gap-2">
          <p className="m-0 showingEntries">
            Showing {start} to {end} of {totalItems} entries
          </p>

          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="paginationbtn d-flex align-items-center px-2 gap-2">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 paginationmainBtn"
          >
            Prev
          </Button>
          {renderPageButtons()}
          <Button
            onClick={handleNext}
            disabled={currentPage === calculatedTotalPages}
            className="px-3 paginationmainBtn"
          >
            Next
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default FlexibleTable;
