import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Equipo,
  Cotizacion,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoCotizacionController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/cotizacion', {
    responses: {
      '200': {
        description: 'Cotizacion belonging to Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cotizacion)},
          },
        },
      },
    },
  })
  async getCotizacion(
    @param.path.string('id') id: typeof Equipo.prototype.id,
  ): Promise<Cotizacion> {
    return this.equipoRepository.cotizacion(id);
  }
}
