import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '../data';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem('gk_products');

    if (savedProducts !== null) {
      try {
        const products = JSON.parse(savedProducts);
        const foundProduct = products.find(
          (item) => item.id === Number(id)
        );

        setProduct(foundProduct || null);
        setLoading(false);
      } catch {
        setProduct(null);
        setLoading(false);
      }

      return;
    }

    axios
      .get('/data/products.json')
      .then((response) => {
        const foundProduct = response.data.find(
          (item) => item.id === Number(id)
        );

        setProduct(foundProduct || null);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Đang tải chi tiết sản phẩm...</p>;
  }

  if (!product) {
    return (
      <section className="page">
        <h1>Không tìm thấy sản phẩm</h1>
        <p>Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <button onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Chi tiết sản phẩm</h1>

      <div className="product-detail">
        <p><strong>Mã sản phẩm:</strong> {product.id}</p>
        <p><strong>Tên sản phẩm:</strong> {product.name}</p>
        <p><strong>Danh mục:</strong> {product.category}</p>
        <p><strong>Giá:</strong> {formatMoney(product.price)}</p>
        <p><strong>Tồn kho:</strong> {product.stock}</p>
      </div>

      <button onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  );
}

export default ProductDetail;
