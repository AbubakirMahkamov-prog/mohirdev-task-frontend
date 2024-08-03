"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as UserService from '../services/authService'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const formSchema = z.object({
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  return (
    <div className="px-40">

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto mt-36 p-8 w-96 rounded border">
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
    </div>

  )
}
