import React from "react";

function Filters({ filters, setFilters, setSortOrder }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Filter by author"
        value={filters.author}
        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year Start"
        value={filters.yearStart}
        onChange={(e) => setFilters({ ...filters, yearStart: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year End"
        value={filters.yearEnd}
        onChange={(e) => setFilters({ ...filters, yearEnd: e.target.value })}
      />
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Sort: Year Asc</option>
        <option value="desc">Sort: Year Desc</option>
      </select>
    </div>
  );
}

export default Filters;
