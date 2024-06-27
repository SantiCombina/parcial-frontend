import {useEffect, useState} from "react";

import {ClientsTable} from "@/components/clients/clients-table";
import {PageTitle} from "@/components/ui/page-title";

export function Clients() {
    const [clientes, setClientes] = useState<Cliente[] | undefined>(undefined);

    const getClientes = async () => {
        const clientesResponse = await fetch("http://localhost:3000/api/clientes");
        const clientesData = await clientesResponse.json();

        const localidadResponse = await fetch("http://localhost:3000/api/localidades");
        const localidadData = await localidadResponse.json();

        const promotorResponse = await fetch("http://localhost:3000/api/promotores");
        const promotorData = await promotorResponse.json();

        setClientes(
            clientesData.map((cliente: Cliente) => {
                const localidad = localidadData.find((localidad: Localidad) => localidad.id === cliente.idLocalidad);
                const promotor = promotorData.find((promotor: Promotor) => promotor.id === cliente.idPromotor);

                return {
                    ...cliente,
                    localidad: localidad?.nombre,
                    promotor: promotor?.nombre,
                };
            }),
        );
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div className="flex flex-col w-full gap-5">
            <PageTitle title="Clientes" />
            <ClientsTable clientes={clientes} refetch={getClientes} />
        </div>
    );
}
