import {useEffect, useState} from "react";

import {PageTitle} from "@/components/ui/page-title";
import {AddLocationModal} from "@/components/locations/modals/add-location-modal";
import {LocationsTable} from "@/components/locations/locations-table";

export function Locations() {
    const [localidades, setLocalidades] = useState<Localidad[] | undefined>(undefined);

    const getLocalidades = async () => {
        const response = await fetch("http://localhost:3000/api/localidades");
        const data = await response.json();

        setLocalidades(data);
    };

    useEffect(() => {
        getLocalidades();
    }, []);

    return (
        <div className="flex flex-col w-full gap-5">
            <PageTitle title="Localidades" />
            <AddLocationModal refetch={getLocalidades} />
            <LocationsTable localidades={localidades} refetch={getLocalidades} />
        </div>
    );
}
