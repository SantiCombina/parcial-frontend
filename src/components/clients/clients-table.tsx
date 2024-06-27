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

import {DeleteClientModal} from "./modals/delete-client-modal";
import {UpdateClientModal} from "./modals/update-client-modal";
import {AddClientModal} from "./modals/add-client-modal";

interface Props {
    refetch: () => void;
    clientes: Cliente[] | undefined;
}

export function ClientsTable({clientes, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});
    const [search, setSearch] = useState("");

    const columns: ColumnDef<Cliente>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
            size: 100,
            cell: ({row}) => {
                const items = row.original;

                return <div className="w-full">{items.nombre}</div>;
            },
        },
        {
            accessorKey: "domicilio",
            header: "Domicilio",
            size: 100,
            cell: ({row}) => {
                const items = row.original;

                return <div className="w-full">{items.domicilio}</div>;
            },
        },
        {
            accessorKey: "localidad",
            header: "Localidad",
            size: 100,
            cell: ({row}) => {
                const items = row.original;

                return <div className="w-full">{items.localidad}</div>;
            },
        },
        {
            accessorKey: "promotor",
            header: "Promotor",
            size: 100,
            cell: ({row}) => {
                const items = row.original;

                return <div className="w-full">{items.promotor}</div>;
            },
        },
        {
            accessorKey: "saldo",
            size: 50,
            header: () => {
                return <div className="text-right">Saldo</div>;
            },
            cell: ({row}) => {
                const items = row.original;

                return <div className="text-right">$ {items.saldo}</div>;
            },
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
                            <UpdateClientModal cliente={items} refetch={refetch} />
                            <DeleteClientModal cliente={items} refetch={refetch} />
                        </span>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: clientes ?? [],
        columns,
        pageCount: clientes ? Math.ceil(clientes.length / pagination.pageSize) : 0,
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
                    placeholder="Buscar cliente"
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <AddClientModal refetch={refetch} />
            </div>
            <DataTable table={table} />
        </>
    );
}
