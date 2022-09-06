import React from "react";

const Pagination = (props) => {
  const { page, totalPages, onLeftClick, onRightClick } = props;
  return (
    <div className="pagination-container">
      <button onClick={onLeftClick}>
        <div>◀</div>{" "}
      </button>
      <p>
        {" "}
        {page} de {totalPages}
      </p>
      <button onClick={onRightClick}>
        <div>▶</div>
      </button>
    </div>
  );
};

export default Pagination;
