import {useEffect, useState} from "react";

import {AddPromoterModal} from "@/components/promoters/modals/add-promoter-modal";
import {PromotersTable} from "@/components/promoters/promoters-table";

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
            <h2 className="font-bold text-center text-black">Promotores paaaaa</h2>
            <AddPromoterModal refetch={getPromotores} />
            <div className="container">
                <PromotersTable promotores={promotores} refetch={getPromotores} />
            </div>
        </div>
    );
}
