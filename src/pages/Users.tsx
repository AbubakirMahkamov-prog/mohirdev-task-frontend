"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect } from 'react'
import MyLayout from "./Layout"
import { ArrowUpDown, ChevronDown, Layout, MoreHorizontal } from "lucide-react"
import * as userService from '../services/userService';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import UserForm from '../components/my-components/UserForm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type User = {
  _id: string
  fullname: string
  email: string
  role: "user" | "admin"
}



export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const [formDialog, setFormDialog] = React.useState(false)
  const [selectedUserId, setSelectedUserId] = React.useState<string>('')
  const [tableData, setTableData] = React.useState<User[]>([])
  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  function getAllUser() {
    userService
      .getAll()
      .then((res: User[]) => {
        setTableData(res);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  }
  useEffect(() => {
    getAllUser()
  }, []);
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullname",
      header: "Fullname",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("fullname")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
              <Button onClick={() => {
                setSelectedUserId(row.original._id);
                setFormDialog(true)
              }}>Edit</Button>
              <Button variant={'destructive'} onClick={() => {setSelectedUserId(row.original._id); setDeleteDialog(true); }} className="ml-4">Delete</Button>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <MyLayout>
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => {
            setFormDialog(true);
        }} className="ml-2">Create</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
     {/* Delete Confirmation Dialog */}
     <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-4 mt-4">
              <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => {
                userService.deleteItem(selectedUserId).then(() => {
                    getAllUser(); setDeleteDialog(false)
                })
              }}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>

     {/* Form Dialog */}
    
    <Dialog open={formDialog} onOpenChange={setFormDialog}>
        <DialogContent>
            <DialogTitle>
                UserForm
            </DialogTitle>
            <UserForm id={selectedUserId} onSuccess={() => {
                getAllUser(); setFormDialog(false);
            }} />
        </DialogContent>
    </Dialog>
    </MyLayout>
  )
}
