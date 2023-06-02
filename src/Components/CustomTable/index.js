import React from "react";
import "./style.css";

const CustomTable = ({ children, headers }) => {
  return (
    <>
      <div className="customTable">
        <table>
          <thead>
            <tr>
              {headers.map((item, index) => (
                <th key={index}>{item.title}</th>
              ))}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </>
  );
};
export default CustomTable;
