import { NavLink } from 'react-router-dom';

function NavBar() {
  const getLinkStyle = ({ isActive }) => ({
    marginRight: '16px',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#333',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
      <NavLink to="/" style={getLinkStyle}>Trang chủ</NavLink>
      <NavLink to="/products" style={getLinkStyle}>Sản phẩm</NavLink>
      <NavLink to="/products/new" style={getLinkStyle}>Thêm sản phẩm</NavLink>
    </nav>
  );
}

export default NavBar;
