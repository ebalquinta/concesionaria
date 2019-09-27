import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculoController } from './vehiculo/vehiculo.controller';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController, VehiculoController],
  providers: [AppService, VehiculoService],

})
export class AppModule {}
