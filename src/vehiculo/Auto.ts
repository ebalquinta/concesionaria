import Vehiculo from "./Vehiculo";

export default class Auto extends Vehiculo{
    public capacidadBaul: number; 

    public constructor(patente: string, marca: string, modelo: string, anio: number, precio: number, capacidadBaul: number) {
        super(patente,marca,modelo,anio,precio);
        this.capacidadBaul = capacidadBaul;
    }

    public getCapacidad(): number {
        return this.capacidadBaul;
    }

    public getPatente(): string {
        return this.patente;
    }

    public getMarca(): string {
        return this.marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public getAnio(): number {
        return this.anio;
    }

    public getPrecio(): number {
        return this.precio;
    }
}