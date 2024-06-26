import {ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";

import {DataTable} from "../ui/data-table";

import {UpdateLocationModal} from "./modals/update-location-modal";
import {DeleteLocationModal} from "./modals/delete-location-modal";

interface Props {
    refetch: () => void;
    localidades: Localidad[] | undefined;
}

export function LocationsTable({localidades, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});

    const columns: ColumnDef<Localidad>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            cell: ({row}) => {
                const items = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <UpdateLocationModal localidad={items} refetch={refetch} />
                        <DeleteLocationModal localidad={items} refetch={refetch} />
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: localidades ?? [],
        columns,
        pageCount: localidades ? Math.ceil(localidades.length / pagination.pageSize) : 0,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return <DataTable table={table} />;
}
