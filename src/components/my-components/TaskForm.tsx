"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import * as taskService from '../../services/taskService'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  })
})
interface ProfileFormProps {
  onSuccess: () => void; // Define the prop type
  id?: string;
}
interface ITask {
  title: string;
  content: string;
}
export default function ProfileForm({ onSuccess, id }: ProfileFormProps) {
  // Initialize the form with useForm hook and zod schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        content: "",
    },
  });
  
  useEffect(() => {
    if (id) {
        taskService.getOne(id).then((res: ITask) => {
          form.setValue('title', res.title);
          form.setValue('content', res.content);
        });
     
  };
  
  }, [id]);
  
  // Define the onSubmit function
  const onSubmit = (data: any) => {
    if(!id) {
      taskService.createItem(data).then(() => {
        onSuccess()
      })
    } else {
      taskService.updateItem(id, data).then(() => {
        onSuccess()
      });
    }
  };

  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 w-full">
        <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="Title" {...field} />
                </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                    <Textarea placeholder="Content" {...field} />
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
