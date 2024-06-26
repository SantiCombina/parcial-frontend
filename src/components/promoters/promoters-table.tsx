import {ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";

import {DataTable} from "../ui/data-table";

import {DeletePromoterModal} from "./modals/delete-promoter-modal";
import {UpdatePromoterModal} from "./modals/update-promoter-modal";

interface Props {
    refetch: () => void;
    promotores: Promotor[] | undefined;
}

export function PromotersTable({promotores, refetch}: Props) {
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 8});

    const columns: ColumnDef<Promotor>[] = [
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
                        <UpdatePromoterModal promotor={items} refetch={refetch} />
                        <DeletePromoterModal promotor={items} refetch={refetch} />
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
        state: {
            pagination,
        },
    });

    return <DataTable table={table} />;
}
