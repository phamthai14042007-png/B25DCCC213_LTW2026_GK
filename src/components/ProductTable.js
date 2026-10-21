import ProductRow from './ProductRow';

function ProductTable({
  products,
  onIncrease,
  onDecrease,
  onDelete
}) {
  if (products.length === 0) {
    return <p>Không có sản phẩm phù hợp.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
