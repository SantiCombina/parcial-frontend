import {Table, flexRender} from "@tanstack/react-table";

import {Button} from "./button";

import {TableBody, TableCell, TableHead, TableHeader, TableRow, Table as TableUI} from "@/components/ui/table";

interface Props {
    table: Table<any>;
}

export function DataTable({table}: Props) {
    return (
        <>
            <div className="border rounded-md">
                <TableUI>
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
                                <TableCell className="h-24 text-center" colSpan={table.getAllColumns().length}>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </TableUI>
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
