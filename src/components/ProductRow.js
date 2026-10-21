import { formatMoney } from '../data';
import { Link } from 'react-router-dom';

function ProductRow({ product, onIncrease, onDecrease, onDelete }) {
  return (
    <tr>
      <td>
        <Link to={`/products/${product.id}`}>
          {product.name}
        </Link>
      </td>

      <td>{product.category}</td>

      <td>{formatMoney(product.price)}</td>

      <td
        style={{
          color: product.stock < 5 ? 'red' : 'inherit',
          fontWeight: product.stock < 5 ? 'bold' : 'normal'
        }}
      >
        {product.stock}
      </td>

      <td>
        <button onClick={() => onIncrease(product.id)}>+</button>{' '}

        <button
          onClick={() => onDecrease(product.id)}
          disabled={product.stock === 0}
        >
          -
        </button>{' '}

        <button onClick={() => onDelete(product.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
