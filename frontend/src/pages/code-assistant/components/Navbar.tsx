import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Navbar.css';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    window.open('https://qelyx.com', '_blank');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSignOut = () => {
    window.location.href = 'https://qelyx.com';
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: 'Home',
      onClick: handleHomeClick,
    },
    {
      key: 'solutions',
      label: 'Qelyx Solutions',
    },
    {
      key: 'case-studies',
      label: 'Case Studies',
    },
    {
      key: 'blogs',
      label: 'Blogs',
    },
    {
      key: 'technology',
      label: 'Technology',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'signout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      onClick: handleSignOut,
    },
  ];

  return (
    <Header className="navbar-header">
      <div className="navbar-content">
        <div className="navbar-logo" onClick={handleLogoClick}>
          Qelyx
        </div>
        
        <Menu
          mode="horizontal"
          items={menuItems}
          selectedKeys={location.pathname === '/' ? ['home'] : []}
          className="navbar-menu"
        />

        <div className="navbar-user">
          <Space>
            <span className="logged-in-text">Logged in as:</span>
            <span className="username">admin</span>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar
                className="user-avatar"
                style={{
                  backgroundColor: '#00d9ff',
                  color: '#020617',
                  cursor: 'pointer',
                }}
              >
                a
              </Avatar>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
