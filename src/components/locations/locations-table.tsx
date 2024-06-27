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

import {UpdateLocationModal} from "./modals/update-location-modal";
import {DeleteLocationModal} from "./modals/delete-location-modal";
import {AddLocationModal} from "./modals/add-location-modal";

interface Props {
    refetch: () => void;
    localidades: Localidad[] | undefined;
}

export function LocationsTable({localidades, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});
    const [search, setSearch] = useState("");

    const columns: ColumnDef<Localidad>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
            size: 100,
        },
        {
            accessorKey: "provincia",
            header: "Provincia",
            size: 100,
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
                            <UpdateLocationModal localidad={items} refetch={refetch} />
                            <DeleteLocationModal localidad={items} refetch={refetch} />
                        </span>
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
                    placeholder="Buscar localidad"
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <AddLocationModal refetch={refetch} />
            </div>
            <DataTable table={table} />
        </>
    );
}
