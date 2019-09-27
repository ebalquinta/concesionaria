import { Injectable } from '@nestjs/common';
import Vehiculo from './Vehiculo';
import * as fs from 'fs';
import Auto from './Auto';
import Camioneta from './Camioneta';


@Injectable()
export class VehiculoService {
    private vehiculos: Vehiculo[] = [];

    constructor() {
        this.load();
    }

    public getAll(): Vehiculo[] {
        return this.vehiculos;
    }

    public getByType(tipo: any): Vehiculo[] {
        let vehiculosPorTipo: Vehiculo[] = [];
        this.vehiculos.forEach(veh => {
            if (tipo == "Auto" && veh instanceof Auto)
                vehiculosPorTipo.push(veh);
            if (tipo == "Camioneta" && veh instanceof Camioneta)
                vehiculosPorTipo.push(veh);
        })
        return vehiculosPorTipo;
    }

    public getOne(patente: any): Vehiculo {
        let unVehiculo: Vehiculo = null;
        // this.vehiculos.forEach(veh => {
        //     if (patente == veh.getPatente())
        //         return unVehiculo = veh;
        // })
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (patente == this.vehiculos[i].getPatente()) {
                unVehiculo = this.vehiculos[i];
                return unVehiculo;
            }
        }
        console.log("vehículo no encontrado");
        return unVehiculo;
    }

    public create(vehiculo: any): void {
        try {
            //faltaría validar que no se esté por crear un vehículo duplicado
            let unVehiculo;
            if (vehiculo['tipo'] == "Auto")
                unVehiculo = new Auto(vehiculo['patente'], vehiculo['marca'], vehiculo['modelo'], parseInt(vehiculo['anio']), parseInt(vehiculo['precio']), parseInt(vehiculo['capacidad']));
            if (vehiculo['tipo'] == "Camioneta")
                unVehiculo = new Camioneta(vehiculo['patente'], vehiculo['marca'], vehiculo['modelo'], parseInt(vehiculo['anio']), parseInt(vehiculo['precio']), parseInt(vehiculo['capacidad']));
            this.vehiculos.push(unVehiculo);
            // console.log(this.vehiculos);
            this.save();
        } catch (error) {
            throw new Error("Error al agregar al nuevo vehículo");
        }
    }

    public update(vehiculo: any): void {
        let posicion = -1;
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (vehiculo['patente'] == this.vehiculos[i].getPatente())
                posicion = i;
        }
        if (posicion != -1) {
            let unVehiculo;
            if (vehiculo['tipo'] == "Auto")
                unVehiculo = new Auto(vehiculo['patente'], vehiculo['marca'], vehiculo['modelo'], parseInt(vehiculo['anio']), parseInt(vehiculo['precio']), parseInt(vehiculo['capacidad']));
            if (vehiculo['tipo'] == "Camioneta")
                unVehiculo = new Camioneta(vehiculo['patente'], vehiculo['marca'], vehiculo['modelo'], parseInt(vehiculo['anio']), parseInt(vehiculo['precio']), parseInt(vehiculo['capacidad']));
            this.vehiculos[posicion] = unVehiculo;
            this.save();
            console.log("vehículo modificado");
        }
    }

    public delete(patente: any): string {
        let posicion = -1;
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (patente == this.vehiculos[i].getPatente())
                posicion = i;
        }
        if (posicion != -1) {
            this.vehiculos.splice(posicion,1);
            console.log("vehículo eliminado");
            this.save();
            return 'ok';
        }
        console.log("patente no encontrada para eliminar");
        return 'no delete';
    }

    private load() {
        let archivo: string = fs.readFileSync("./src/vehiculo/vehiculos.csv", 'utf8');
        //let lineas = archivo.split('\n');
        let elementos = [];
        if (archivo != "") {
            elementos = archivo.split('\n');
        }
        elementos.forEach(element => {
            let linea = element.split(',');
            let nuevoVehiculo;
            if (linea[0] == "Auto")
                nuevoVehiculo = new Auto(linea[1], linea[2], linea[3], parseInt(linea[4]), parseInt(linea[5]), parseInt(linea[6]));
            else
                nuevoVehiculo = new Camioneta(linea[1], linea[2], linea[3], parseInt(linea[4]), parseInt(linea[5]), parseInt(linea[6]));
            this.vehiculos.push(nuevoVehiculo);
        });
    }

    private save(): void {
        fs.writeFileSync("./src/vehiculo/vehiculos.csv", "", "utf8");
        let tipo;
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (this.vehiculos[i] instanceof Auto)
                tipo = "Auto";
            else
                tipo = "Camioneta";
            let veh = this.vehiculos[i];
            let renglon = `${tipo},${veh.getPatente()},${veh.getMarca()},${veh.getModelo()},${veh.getAnio()},${veh.getPrecio()},${veh.getCapacidad()}`;
            if (i == 0)
                fs.appendFileSync("./src/vehiculo/vehiculos.csv", renglon, "utf8");
            else
                fs.appendFileSync("./src/vehiculo/vehiculos.csv", '\n' + renglon, "utf8");
        }
    }
}
