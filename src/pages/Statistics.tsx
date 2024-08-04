import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Layout from "./Layout"
  import * as taskService from '../services/taskService'
import { useEffect, useState } from "react"
interface IResult {
    _id: string;
    fullname: string;
    newTasksCount: number;
    completedTasksCount: number;
    totalTasksCount: number;
    completionPercentage: number;
} 

  export default function TableDemo() {
    const [results, setResults] = useState<IResult[]>([]);
    useEffect(() => {
        taskService.getStatistics().then((res: IResult[]) => {
            setResults(res)
        })
    }, [])
    return (
    <Layout>
        <p className="py-4 border-b-2">This table contains statistics of users</p>
        <Table className="mt-2">
            <TableCaption>Statistics</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>Fullname</TableHead>
                <TableHead className="w-[200px] text-right">Completed task count</TableHead>
                <TableHead className="w-[200px] text-right">New task count</TableHead>
                <TableHead className="w-[300px] text-right">Percentage of completed task</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {results.map((result) => (
                <TableRow key={result._id}>
                <TableCell className="font-medium">{result.fullname}</TableCell>
                <TableCell className="text-right">{result.completedTasksCount}</TableCell>
                <TableCell className="text-right">{result.newTasksCount}</TableCell>
                <TableCell className="text-right">{result.completionPercentage}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    </Layout>
    )
  }
  