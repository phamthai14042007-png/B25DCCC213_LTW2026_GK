import { CATEGORIES } from '../data';

function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  resultCount
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={onQueryChange}
      />

      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Tất cả danh mục</option>

        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <span>Số sản phẩm: {resultCount}</span>
    </div>
  );
}

export default FilterBar;
