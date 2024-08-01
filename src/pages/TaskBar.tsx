import { Button } from "@/components/ui/button"
import Layout from './Layout'
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsDemo() {
  const tasks = [
    { status: 'new', name: 'Alice', content: "test" },
    { status: 'new', name: 'Bob', content: "test"},
    { status: 3, name: 'Charlie', content: "test" }
  ]
  return (
    <Layout>
        <Tabs defaultValue="new">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
            <Button>Create</Button>
            <div className="grid grid-cols-4 gap-4 mt-2">
                {
                    tasks.map(task => (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between align-middle">
                                <CardTitle>{task.name}</CardTitle>
                                <Badge variant={'secondary'}>{task.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {task.content}
                        </CardContent>
                        <CardFooter>
                            <Button className="p-2 w-full">Mark done</Button>
                        </CardFooter>
                    </Card>
                    ))
                }
            </div>
           
        </TabsContent>
        <TabsContent value="completed">
            <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                Change your password here. After saving, you'll be logged out.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save password</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </Layout>
  )
}
