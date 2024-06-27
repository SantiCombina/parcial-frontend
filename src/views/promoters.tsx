import {useEffect, useState} from "react";

import {PromotersTable} from "@/components/promoters/promoters-table";
import {PageTitle} from "@/components/ui/page-title";

export function Promoters() {
    const [promotores, setPromotores] = useState<Promotor[] | undefined>(undefined);

    const getPromotores = async () => {
        const response = await fetch("http://localhost:3000/api/promotores");
        const data = await response.json();

        setPromotores(data);
    };

    useEffect(() => {
        getPromotores();
    }, []);

    return (
        <div className="flex flex-col w-full gap-5">
            <PageTitle title="Promotores" />
            <PromotersTable promotores={promotores} refetch={getPromotores} />
        </div>
    );
}
