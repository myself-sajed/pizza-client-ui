"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pizza } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { useQuery } from "@tanstack/react-query"
import { getMyOrder } from "@/lib/http/endpoints"
import DisplayError from "@/components/custom/DisplayError"
import Loading from "@/components/custom/Loading"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Order } from "@/types"
import moment from 'moment'
import GoButton from "@/components/custom/GoButton"

const OrderDataTable = () => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            return getMyOrder().then((res) => res.data)
        }
    })

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: orders || [],
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
        <div className="w-full">
            <div className="md:mx-20 sm:m-10 m-5">
                <div className="flex items-center gap-4 text-primary ">
                    <Pizza size={30} />
                    <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                        Your orders
                    </h3>
                </div>

                {
                    isLoading ? (
                        <div className="h-screen">
                            <Loading className="h-1/2" title="Fetching your orders" />
                        </div>
                    ) : orders ? (
                        <div>
                            <div className="flex items-center py-4 mt-2">
                                <Input
                                    placeholder="Search items..."
                                    value={(table.getColumn("cart")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("cart")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
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
                                                    className="h-40 text-center"
                                                >
                                                    <div className="mt-10">
                                                        <p>You have not ordered anything yet.</p>
                                                        <GoButton title="Order Now" className="mt-5" />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex items-center justify-end space-x-2 py-4">
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
                    ) : (
                        <div className="h-screen">
                            <DisplayError className="h-1/2" title="No orders found..." />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OrderDataTable

//@ts-ignore
const cartFilter: FilterFn<Order> = (row, columnId, filterValue) => {
    return row.original.cart?.some((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
};

const orderStatusColors = {
    "Received": 'text-yellow-600',
    "Confirmed": 'text-gray-600',
    "Preparing": 'text-blue-600',
    "Out for delivery": 'text-sky-600',
    "Delivered": 'text-green-600',
    "Failed": 'text-red-600',
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => (
            <Link href={`/order-tracking-status/${row.original?._id}`} className="capitalize text-primary underline">{row.getValue("_id")}</Link>
        ),
    },
    {
        accessorKey: "cart",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ordered Item(s)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <ul>
                {row.original.cart?.map((item, index) => (
                    <li key={`order-${index}`} className="mx-5 font-medium">
                        {item.name}
                    </li>
                ))}
            </ul>
        ),
        filterFn: cartFilter,
    },
    {
        accessorKey: "orderStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("orderStatus") as keyof typeof orderStatusColors
            return <Badge className={`mx-5 ${orderStatusColors[status]}`} variant="outline">{row.getValue("orderStatus")}</Badge>
        },
    },
    {
        accessorKey: "paymentStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <Badge className="mx-5 text-green-600" variant="outline">{row.getValue("paymentStatus")}</Badge>,
    },
    {
        accessorKey: "paymentMode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment Mode
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="mx-5">{row.getValue("paymentMode")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-center">Order Time</div>,
        cell: ({ row }) => {
            const time = row.getValue("createdAt")
            const formatted = moment(time!).format('DD/MM/YYYY HH:mm:ss')
            return <div className="text-right">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.paymentId!)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/order-tracking-status/${row.original?._id}`} >View order status</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
