export default abstract class Vehiculo {
    public patente: string;
    public marca: string;
    public modelo: string;
    public anio: number;
    public precio: number;

    public constructor(patente: string, marca: string, modelo: string, anio: number, precio: number) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
    }

    public abstract getCapacidad(): number;

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