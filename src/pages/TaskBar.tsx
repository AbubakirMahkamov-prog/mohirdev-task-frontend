import { Button } from "@/components/ui/button"
import Layout from './Layout'
import { Badge } from "@/components/ui/badge"
import * as taskService from "../services/taskService";
import * as userService from "../services/userService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import TaskForm from '../components/my-components/TaskForm'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"

interface ITask {
  _id: string;
  title: string;
  status: 'new' | 'completed';
  content: string;
}
interface IUser {
  _id: string;
  fullname: string;
  email: string;
}

export default function TabsDemo() {
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  useEffect(() => {
    setIsAdmin(localStorage.getItem('role') == 'admin' ? true: false)
  }, [])
  const getMineNew = () => {
    taskService.getMineNew().then((res: ITask[]) => setNewTasks(res))
  }
  const getMineCompleted = () => {
    taskService.getMineCompleted().then((res: ITask[]) => setCompletedTasks(res))
  }
  const getAllUser = () => {
    userService.getAll().then((res: IUser[]) => {
      setUsers(res)
    })
  }
  useEffect(() => {
    getMineNew();
    getMineCompleted();
    getAllUser()
  }, [])

  const setCompleted = (id: string) => {
    taskService.setCompleted(id).then(() => {
      if (!isAdmin) {
        getMineNew();
        getMineCompleted();
      } else {
        handleUserChange(selectedUserId)
      }
    })
  }
  const setNew = (id: string) => {
    taskService.setNew(id).then(() => {
      if (!isAdmin) {
        getMineNew();
        getMineCompleted();
      } else {
        handleUserChange(selectedUserId)
      }
    })
  }
  const openEditDialog = (_id: string) => {
    setSelectedId(_id);
    setEditDialogOpen(true)
  }
  const handleUserChange = (value: string) => {
    taskService.getByUser(value, 'new').then((res) => {
        setNewTasks(res) 
    })
    taskService.getByUser(value, 'completed').then((res) => {
      setCompletedTasks(res)
    })
    setSelectedUserId(value)
  }
  return (
    <Layout>
      {
         isAdmin &&
         <Select value={selectedUserId} onValueChange={handleUserChange}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Users</SelectLabel>
              {
                users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>{user.fullname}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      }
        <Tabs className="mt-2" defaultValue="new">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
            <Button onClick={() => {
                setDialogOpen(true)
            }}>Create</Button>
            <div className="grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 mt-2">
                {
                    newTasks.map(task => (
                    <Card key={task._id}>
                        <CardHeader>
                            <div className="flex justify-between align-middle">
                                <CardTitle>{task.title}</CardTitle>
                                <Badge variant={'secondary'}>{task.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {task.content}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setCompleted(task._id)} className="p-2 w-full">Mark done</Button>
                            <Button variant={'destructive'} onClick={() => openEditDialog(task._id)} className="p-2 ml-2">Edit</Button>
                        </CardFooter>
                    </Card>
                    ))
                }
            </div>
           
        </TabsContent>
        <TabsContent value="completed">
        <div className="grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 mt-2">
                {
                    completedTasks.map(task => (
                    <Card key={task._id}>
                        <CardHeader>
                            <div className="flex justify-between align-middle">
                                <CardTitle>{task.title}</CardTitle>
                                <Badge variant={'secondary'}>{task.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {task.content}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={ () => {
                              setNew(task._id)
                            }} className="p-2 w-full">Mark new</Button>
                        </CardFooter>
                    </Card>
                    ))
                }
            </div>
        </TabsContent>
        </Tabs>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTitle>
              </DialogTitle>
            <DialogContent>
                  <TaskForm  onSuccess={() => {
                    getMineNew();
                    setDialogOpen(false);
                  }} />
            </DialogContent>
        </Dialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTitle>
              </DialogTitle>
            <DialogContent>
                  <TaskForm id={selectedId} onSuccess={() => {
                    getMineNew();
                    setEditDialogOpen(false);
                  }} />
            </DialogContent>
        </Dialog>
    </Layout>
  )
}
