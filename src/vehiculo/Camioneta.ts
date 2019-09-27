import Vehiculo from "./Vehiculo";

export default class Camioneta extends Vehiculo{
    public capacidadCarga: number; 

    public constructor(patente: string, marca: string, modelo: string, anio: number, precio: number, capacidadCarga: number) {
        super(patente,marca,modelo,anio,precio);
        this.capacidadCarga = capacidadCarga;
    }

    public getCapacidad(): number {
        return this.capacidadCarga;
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