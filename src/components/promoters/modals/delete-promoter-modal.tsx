import {Trash2} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
    refetch: () => void;
    promotor: Promotor;
}

export function DeletePromoterModal({refetch, promotor}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = async () => {
        try {
            await fetch(`http://localhost:3000/api/promotor/${promotor.id}`, {
                method: "DELETE",
            });
            refetch();
            setModalOpen(false);
            toast.success("Promotor eliminado correctamente");
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 width={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar promotor</DialogTitle>
                    <DialogDescription>
                        Desea eliminar el promotor <strong>{promotor.nombre}</strong>?
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>Cancelar</DialogClose>
                <Button onClick={onSubmit}>Eliminar</Button>
            </DialogContent>
        </Dialog>
    );
}
