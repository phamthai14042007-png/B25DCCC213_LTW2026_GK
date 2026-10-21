import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Kiểm tra trường bắt buộc trước
    if (
      name.trim() === '' ||
      category === '' ||
      price === '' ||
      stock === ''
    ) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    // Kiểm tra giá và số lượng theo đề
    if (
      numericPrice <= 0 ||
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      setError(
        'Giá phải lớn hơn 0, số lượng là số nguyên không âm'
      );
      return;
    }

    try {
      const savedProducts = localStorage.getItem('gk_products');
      let currentProducts;

      if (savedProducts !== null) {
        currentProducts = JSON.parse(savedProducts);

        if (!Array.isArray(currentProducts)) {
          throw new Error('Dữ liệu kho hàng không hợp lệ.');
        }
      } else {
        const response = await axios.get('/data/products.json');
        currentProducts = response.data;
      }

      const maxId = currentProducts.reduce(
        (max, product) => Math.max(max, Number(product.id) || 0),
        0
      );

      const newProduct = {
        id: maxId + 1,
        name: name.trim(),
        category,
        price: numericPrice,
        stock: numericStock
      };

      const updatedProducts = [...currentProducts, newProduct];

      localStorage.setItem(
        'gk_products',
        JSON.stringify(updatedProducts)
      );

      navigate('/products', {
        replace: true,
        state: {
          message: `Đã thêm sản phẩm "${newProduct.name}" thành công.`
        }
      });
    } catch {
      setError('Không thể lưu sản phẩm. Vui lòng thử lại.');
    }
  };

  return (
    <section className="page">
      <h1>Thêm sản phẩm</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="stock">Số lượng tồn kho</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </section>
  );
}

export default AddProduct;
