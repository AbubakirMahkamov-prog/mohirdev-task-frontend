"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as UserService from '../services/authService'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const formRegistrationSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Fullname must be at least 2 characters'
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})
interface ProfileFormProps {
    onLoginSuccess: () => void; // Define the prop type
  }
export default function ProfileForm({ onLoginSuccess }: ProfileFormProps) {
  // Initialize the form with useForm hook and zod schema validation
  const navigate = useNavigate(); // Initialize the navigate function
  const [activeTab, setActiveTab] = useState("login"); // State to manage the active tab
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  });
  const formRegistration = useForm({
    resolver: zodResolver(formRegistrationSchema),
    defaultValues: {
        fullname: "",
        email: "",
        password: ""
    },
  });
  
  
  // Define the onSubmit function
  const onSubmit = (data: any) => {
    UserService.Login(data).then((res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role', res.role)
        onLoginSuccess()
        navigate('/')
    })
  };
  const onSubmitRegistration = (data: any) => {
    UserService.Registration(data).then(() => {
      setActiveTab('login')
    })
  };
  return (
    <div className='px-2 py-8'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto mt-36 p-8 w-1/2 max-sm:w-full max-md:w-2/3 rounded border">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input placeholder="Email" {...field} />
                  </FormControl>
                
                  <FormMessage />
                  </FormItem>
                  )}
              />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                      <Input type='password' placeholder="password" {...field} />
                  </FormControl>
                
                  <FormMessage />
                  </FormItem>
                  )}
              />
                  <Button className="mt-2 w-full" type="submit">Submit</Button>
          </form>
          </Form>
        </TabsContent>
        <TabsContent value="registration">
        <Form {...formRegistration}>
          <form onSubmit={formRegistration.handleSubmit(onSubmitRegistration)} className="m-auto mt-36 p-8 w-1/2 max-sm:w-full max-md:w-2/3 rounded border">
                <FormField
                  control={formRegistration.control}
                  name="fullname"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                      <Input placeholder="Fullname" {...field} />
                  </FormControl>
                
                  <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={formRegistration.control}
                  name="email"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input placeholder="Email" {...field} />
                  </FormControl>
                
                  <FormMessage />
                  </FormItem>
                  )}
              />
                <FormField
                  control={formRegistration.control}
                  name="password"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                      <Input type='password' placeholder="password" {...field} />
                  </FormControl>
                
                  <FormMessage />
                  </FormItem>
                  )}
              />
                  <Button className="mt-2 w-full" type="submit">Submit</Button>
          </form>
          </Form>
        </TabsContent>
        </Tabs>
        
    </div>

  )
}
