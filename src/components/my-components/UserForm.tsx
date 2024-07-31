"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as UserService from '../../services/userService'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  role: z.string()
})
interface ProfileFormProps {
  onCreateSuccess: () => void; // Define the prop type
  }
export default function ProfileForm({ onCreateSuccess }: ProfileFormProps) {
  // Initialize the form with useForm hook and zod schema validation

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fullname: "",
        email: "",
        password: "",
        role: 'user'
    },
  });
  
  
  // Define the onSubmit function
  const onSubmit = (data: any) => {
    UserService.createItem(data).then(() => {
      onCreateSuccess()
    })
  };

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 w-full">
        <FormField
                control={form.control}
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
                    <Input placeholder="password" {...field} />
                </FormControl>
              
                <FormMessage />
                </FormItem>
                )}
            />
             <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
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
