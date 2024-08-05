import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

// Define the type for the props
interface LayoutProps {
  children: ReactNode;
}



const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  useEffect(() => {
    setIsAdmin(localStorage.getItem('role') == 'admin' ? true: false)
  }, [])

  return (
    <div className='p-4'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
          <MenubarItem>
            <Button onClick={() => navigate('/')} variant={'link'}>Home</Button>
          </MenubarItem>
          {
            isAdmin && (
              <MenubarItem>
                <Button onClick={() => navigate('/users')} variant={'link'}>Users</Button>
              </MenubarItem>
            )
          }
          {
            isAdmin && (
              <MenubarItem>
                <Button onClick={() => navigate('/statistics')} variant={'link'}>Statistics</Button>
              </MenubarItem>
            )
          }
          <MenubarItem>
            <Button onClick={() => navigate('/task-bar')} variant={'link'}>Taskbar</Button>
          </MenubarItem>
          <MenubarItem>
            <Button onClick={() => navigate('/login')} variant={'link'}>Back to login</Button>
          </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <main>{children}</main>
      <footer className='text-center mt-12'>
        <p>© Developed by Abubakir in 2024</p>
      </footer>
    </div>
  );
}

export default Layout;
