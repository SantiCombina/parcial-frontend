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
    localidad: Localidad;
}

export function DeleteLocationModal({refetch, localidad}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = async () => {
        try {
            await fetch(`http://localhost:3000/api/cliente/${localidad.id}`, {
                method: "DELETE",
            });
            refetch();
            setModalOpen(false);
            toast.success("Localidad eliminada correctamente");
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
                    <DialogTitle>Eliminar localidad</DialogTitle>
                    <DialogDescription>
                        Desea eliminar la localidad <strong>{localidad.nombre}</strong>?
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>Cancelar</DialogClose>
                <Button onClick={onSubmit}>Eliminar</Button>
            </DialogContent>
        </Dialog>
    );
}
