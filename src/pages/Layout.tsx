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
            <Button onClick={() => navigate('/')} variant={'link'}>Home</Button>
          </li>
          <li>
            <Button onClick={() => navigate('/users')} variant={'link'}>Users</Button>
          </li>
          <li>
            <Button onClick={() => navigate('/about')} variant={'link'}>About</Button>
          </li>
        </ul>
      </header>
      <main>{children}</main>
      <footer className='text-center mt-12'>
        <p>© Developed by Abubakir in 2024</p>
      </footer>
    </div>
  );
}

export default Layout;
