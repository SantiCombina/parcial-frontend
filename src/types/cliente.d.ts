interface Cliente {
    id?: number;
    nombre: string;
    domicilio: string;
    idLocalidad: number;
    idPromotor: number;
    saldo: number;
    localidad?: string;
    promotor?: string;
}
