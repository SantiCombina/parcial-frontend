import {ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";

import {DataTable} from "../ui/data-table";

import {DeleteClientModal} from "./modals/delete-client-modal";
import {UpdateClientModal} from "./modals/update-client-modal";

interface Props {
    refetch: () => void;
    clientes: Cliente[] | undefined;
}

export function ClientsTable({clientes, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});

    const columns: ColumnDef<Cliente>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
        },
        {
            accessorKey: "domicilio",
            header: "Domicilio",
        },
        {
            accessorKey: "idLocalidad",
            header: "Localidad",
        },
        {
            accessorKey: "idPromotor",
            header: "Promotor",
        },
        {
            accessorKey: "saldo",
            header: "Saldo",
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            cell: ({row}) => {
                const items = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <UpdateClientModal cliente={items} refetch={refetch} />
                        <DeleteClientModal cliente={items} refetch={refetch} />
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
        state: {
            pagination,
        },
    });

    return <DataTable table={table} />;
}
