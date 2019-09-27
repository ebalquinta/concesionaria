import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';


@Controller('vehiculo')
export class VehiculoController {
    public constructor(private readonly vehiculoService: VehiculoService) {}

    @Get()
    public getAll(){
        return this.vehiculoService.getAll();
    }

    @Get(':tipo')
    public getByType(@Param('tipo') tipo) {
        return this.vehiculoService.getByType(tipo);
    }

    @Get('p/:patente')
    public getOne(@Param('patente') patente) {
        return this.vehiculoService.getOne(patente);
    }

    @Post()
    public create(@Body() vehiculo: any): string {
        this.vehiculoService.create(vehiculo);
        return 'ok';
    }

    @Put()
    public update(@Body() vehiculo: any): string {
        this.vehiculoService.update(vehiculo);
        return 'ok';
    }
    
    @Delete(':patente')
    public delete(@Param('patente') patente): string {
        return this.vehiculoService.delete(patente);
    }
}
