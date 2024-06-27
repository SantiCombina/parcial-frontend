import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {useState} from "react";

import {DataTable} from "../ui/data-table";
import {Input} from "../ui/input";

import {DeletePromoterModal} from "./modals/delete-promoter-modal";
import {UpdatePromoterModal} from "./modals/update-promoter-modal";
import {AddPromoterModal} from "./modals/add-promoter-modal";

interface Props {
    refetch: () => void;
    promotores: Promotor[] | undefined;
}

export function PromotersTable({promotores, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});
    const [search, setSearch] = useState("");

    const columns: ColumnDef<Promotor>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
        },
        {
            accessorKey: "actions",
            size: 50,
            header: () => {
                return <div className="text-center">Acciones</div>;
            },
            cell: ({row}) => {
                const items = row.original;

                return (
                    <div className="flex items-center justify-center">
                        <span className="flex gap-2">
                            <UpdatePromoterModal promotor={items} refetch={refetch} />
                            <DeletePromoterModal promotor={items} refetch={refetch} />
                        </span>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: promotores ?? [],
        columns,
        pageCount: promotores ? Math.ceil(promotores.length / pagination.pageSize) : 0,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
            globalFilter: search,
        },
    });

    return (
        <>
            <div className="flex justify-between w-full text-right">
                <Input
                    className="max-w-56"
                    placeholder="Buscar promotor"
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <AddPromoterModal refetch={refetch} />
            </div>
            <DataTable table={table} />
        </>
    );
}
