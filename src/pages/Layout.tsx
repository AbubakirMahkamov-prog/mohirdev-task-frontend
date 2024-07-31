import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

// Define the type for the props
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className='p-4'>
      <header className='border p-2 rounded'>
        <ul className='p-0 flex'>
          <li>
            <Button onClick={() => navigate('/users')} variant={'link'}>Users</Button>
          </li>
          <li>
            <Button onClick={() => navigate('/about')} variant={'link'}>About</Button>
          </li>
        </ul>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
}

export default Layout;
