import {useEffect, useState} from "react";

import {LocationsTable} from "@/components/locations/locations-table";
import {PageTitle} from "@/components/ui/page-title";

export function Locations() {
    const [localidades, setLocalidades] = useState<Localidad[] | undefined>(undefined);

    const getLocalidades = async () => {
        const localidadesResponse = await fetch("http://localhost:3000/api/localidades");
        const localidadData = await localidadesResponse.json();

        const provinciasResponse = await fetch("http://localhost:3000/api/provincias");
        const provinciaData = await provinciasResponse.json();

        setLocalidades(
            localidadData.map((localidad: Localidad) => {
                const provincia = provinciaData.find((provincia: Provincia) => provincia.id === localidad.idProvincia);

                return {
                    ...localidad,
                    provincia: provincia?.nombre,
                };
            }),
        );
    };

    useEffect(() => {
        getLocalidades();
    }, []);

    return (
        <div className="flex flex-col w-full gap-5">
            <PageTitle title="Localidades" />
            <LocationsTable localidades={localidades} refetch={getLocalidades} />
        </div>
    );
}
