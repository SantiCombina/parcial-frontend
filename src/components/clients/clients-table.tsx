import {ColumnDef} from "@tanstack/react-table";

import {DataTable} from "./data-table";

export function ClientsTable({clientes}: {clientes: Cliente[] | undefined}) {
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
    ];

    return (
        <DataTable columns={columns} data={clientes!} />
        // <Table>
        //     <TableHeader>
        //         <TableRow>
        //             <TableHead className="w-[100px]">Nombre</TableHead>
        //             <TableHead>Domicilio</TableHead>
        //             <TableHead>Localidad</TableHead>
        //             <TableHead className="text-right">Promotor</TableHead>
        //             <TableHead className="text-right">Saldo</TableHead>
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //         {clientes?.map((cliente) => (
        //             <TableRow key={cliente.id}>
        //                 <TableCell className="font-medium">{cliente.nombre}</TableCell>
        //                 <TableCell>{cliente.domicilio}</TableCell>
        //                 <TableCell className="text-right"> {cliente.idLocalidad}</TableCell>
        //                 <TableCell className="text-right">{cliente.idPromotor}</TableCell>
        //                 <TableCell className="text-right">$ {cliente.saldo}</TableCell>
        //             </TableRow>
        //         ))}
        //     </TableBody>
        //     <TableFooter>
        //         <TableRow>
        //             <TableCell colSpan={4}>Total</TableCell>
        //             <TableCell className="text-right">
        //                 $ {clientes?.reduce((acc, el) => acc + el.saldo, 0).toFixed(2)}
        //             </TableCell>
        //         </TableRow>
        //     </TableFooter>
        // </Table>
    );
}
