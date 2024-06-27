import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {FormInput} from "@/components/ui/form-input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AddClientFormValues, addClientSchema} from "@/schemas/add-client-schema";
import {Label} from "@/components/ui/label";

interface Props {
    refetch: () => void;
}

export function AddClientModal({refetch}: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [promotores, setPromotores] = useState<Promotor[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        clearErrors,
    } = useForm<AddClientFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: "",
            domicilio: "",
            idLocalidad: 0,
            idPromotor: 0,
            saldo: 0,
        },
    });

    const getLocalidades = async () => {
        const localidadResponse = await fetch("http://localhost:3000/api/localidades");
        const localidadData = await localidadResponse.json();

        setLocalidades(localidadData);
    };

    const getPromotores = async () => {
        const promotorResponse = await fetch("http://localhost:3000/api/promotores");
        const promotorData = await promotorResponse.json();

        setPromotores(promotorData);
    };

    const onSubmit = async (values: AddClientFormValues) => {
        const response = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            refetch();
            reset();
            setModalOpen(false);
        }
    };

    useEffect(() => {
        getLocalidades();
        getPromotores();
    }, []);

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button className="text-white bg-blue-400 w-36 hover:bg-blue-300 hover:text-white" variant="outline">
                    Añadir cliente
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear cliente</DialogTitle>
                    <DialogDescription>Complete el formulario para crear un nuevo cliente.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        autoFocus
                        error={errors.nombre?.message}
                        label="Nombre"
                        name="nombre"
                        placeholder="Ingrese nombre"
                        register={register}
                        type="text"
                    />
                    <FormInput
                        error={errors.domicilio?.message}
                        label="Domicilio"
                        name="domicilio"
                        placeholder="Ingrese domicilio"
                        register={register}
                        type="text"
                    />
                    <div className="flex flex-col gap-1">
                        <Label className="text-start">Localidad</Label>
                        <Select
                            onValueChange={(value) => {
                                clearErrors("idLocalidad");
                                setValue("idLocalidad", Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione localidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {localidades.map((localidad) => (
                                    <SelectItem key={localidad.id} value={String(localidad.id)}>
                                        {localidad.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.idLocalidad && <h3 className="text-sm text-red-500">{errors.idLocalidad.message}</h3>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="text-start">Promotor</Label>
                        <Select
                            onValueChange={(value) => {
                                clearErrors("idPromotor");
                                setValue("idPromotor", Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione promotor" />
                            </SelectTrigger>
                            <SelectContent>
                                {promotores.map((promotor) => (
                                    <SelectItem key={promotor.id} value={String(promotor.id)}>
                                        {promotor.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.idPromotor && <h3 className="text-sm text-red-500">{errors.idPromotor.message}</h3>}
                    </div>
                    <FormInput
                        error={errors.saldo?.message}
                        label="Saldo"
                        name="saldo"
                        register={register}
                        type="number"
                    />
                    <DialogFooter>
                        <Button type="submit">Crear</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
