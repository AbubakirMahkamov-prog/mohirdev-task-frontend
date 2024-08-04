"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as UserService from '../../services/userService'
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
  role: z.enum(['user', 'admin']),
})
interface ProfileFormProps {
  onSuccess: () => void; // Define the prop type
  id?: string;
}
export default function ProfileForm({ onSuccess, id }: ProfileFormProps) {
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
  
  useEffect(() => {
    if(id) {
      UserService.getOne(id).then(res => {
        form.setValue('fullname', res.fullname);
        form.setValue('email', res.email);
        form.setValue('role', res.role);
      }) 
    }
  }, [])
  // Define the onSubmit function
  const onSubmit = (data: any) => {
    if(!id) {
      UserService.createItem(data).then(() => {
        onSuccess()
      })
    } else {
      UserService.updateItem(id, data).then(() => {
        onSuccess()
      })
    }
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
