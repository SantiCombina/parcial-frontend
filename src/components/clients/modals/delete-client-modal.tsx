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
    cliente: Cliente;
}

export function DeleteClientModal({refetch, cliente}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = async () => {
        try {
            await fetch(`http://localhost:3000/api/cliente/${cliente.id}`, {
                method: "DELETE",
            });
            refetch();
            setModalOpen(false);
            toast.success("Cliente eliminado correctamente");
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant="destructive">
                    <Trash2 width={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar cliente</DialogTitle>
                    <DialogDescription>
                        Desea eliminar el cliente <strong>{cliente.nombre}</strong>?
                    </DialogDescription>
                </DialogHeader>
                <DialogClose>Cancelar</DialogClose>
                <Button variant={"destructive"} onClick={onSubmit}>
                    Eliminar
                </Button>
            </DialogContent>
        </Dialog>
    );
}
