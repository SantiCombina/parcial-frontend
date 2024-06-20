import {useEffect, useState} from "react";

import {ClientsTable} from "@/components/clients/clients-table";

export function Clients() {
    const [clientes, setClientes] = useState<Cliente[] | undefined>(undefined);

    const getClientes = async () => {
        const response = await fetch("http://localhost:3000/api/clientes");
        const data = await response.json();

        setClientes(data);
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div className="flex flex-col w-full gap-5">
            <h2 className="font-bold text-center text-black">Clientes paaaaa</h2>
            <div className="container">
                <ClientsTable clientes={clientes} />
            </div>
        </div>
    );
}
