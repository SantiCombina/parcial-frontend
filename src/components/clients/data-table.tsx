import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";

import {Button} from "../ui/button";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: Cliente[];
}

export function DataTable<TValue>({columns, data}: DataTableProps<Cliente, TValue>) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});

    const table = useReactTable({
        data: data ?? [],
        columns,
        pageCount: Math.ceil(data?.length / pagination.pageSize),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="even:bg-gray-100"
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="even:bg-gray-100">
                                <TableCell className="h-24 text-center" colSpan={columns.length}>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <span>
                    Página
                    <strong> {table.options.pageCount ? table.getState().pagination.pageIndex + 1 : 0} </strong>
                    de
                    <strong> {table.options.pageCount ? table.options.pageCount : 0}</strong>
                </span>
                <div className="flex items-center justify-end py-4 space-x-2">
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        size="sm"
                        variant="outline"
                        onClick={() => table.previousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        disabled={!table.getCanNextPage()}
                        size="sm"
                        variant="outline"
                        onClick={() => table.nextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    );
}
