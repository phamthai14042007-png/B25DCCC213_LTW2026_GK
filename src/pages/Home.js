import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedProducts = localStorage.getItem('gk_products');

    if (savedProducts !== null) {
      try {
        const parsedProducts = JSON.parse(savedProducts);

        if (!Array.isArray(parsedProducts)) {
          throw new Error('Dữ liệu không hợp lệ');
        }

        setProducts(parsedProducts);
        setLoading(false);
      } catch {
        setError('Dữ liệu sản phẩm đã lưu không hợp lệ.');
        setLoading(false);
      }

      return;
    }

    axios
      .get('/data/products.json')
      .then((response) => {
        setProducts(response.data);
        localStorage.setItem(
          'gk_products',
          JSON.stringify(response.data)
        );
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải dữ liệu sản phẩm.');
        setLoading(false);
      });
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const lowStock = products.filter(
    (product) => product.stock < 5
  ).length;

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="page">
      <h1>Quản lý kho hàng</h1>
      <p>Tổng quan tình hình kho hàng của bạn.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng sản phẩm</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Tổng tồn kho</h3>
          <p>{totalStock}</p>
        </div>

        <div className="stat-card">
          <h3>Tổng giá trị kho</h3>
          <p>{totalValue.toLocaleString('vi-VN')} đ</p>
        </div>

        <div className="stat-card">
          <h3>Sản phẩm sắp hết</h3>
          <p>{lowStock}</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
