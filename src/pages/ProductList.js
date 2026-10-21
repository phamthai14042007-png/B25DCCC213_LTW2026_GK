import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

function ProductList() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(
    location.state?.message || ''
  );

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

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleQueryShift = (event) => {
    setQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesCategory =
      category === '' || product.category === category;

    return matchesQuery && matchesCategory;
  });

  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem(
      'gk_products',
      JSON.stringify(updatedProducts)
    );
  };

  const handleIncrease = (id) => {
    updateProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + 1 }
          : product
      )
    );
  };

  const handleDecrease = (id) => {
    updateProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock - 1) }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    updateProducts(
      products.filter((product) => product.id !== id)
    );
  };

  if (loading) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="page">
      <h1>Danh sách sản phẩm</h1>

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}

      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        category={category}
        onCategoryChange={setCategory}
        resultCount={filteredProducts.length}
      />

      <ProductTable
        products={filteredProducts}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default ProductList;
