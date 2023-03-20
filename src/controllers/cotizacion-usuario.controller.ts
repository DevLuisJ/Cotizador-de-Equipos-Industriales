import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cotizacion,
  Usuario,
} from '../models';
import {CotizacionRepository} from '../repositories';

export class CotizacionUsuarioController {
  constructor(
    @repository(CotizacionRepository)
    public cotizacionRepository: CotizacionRepository,
  ) { }

  @get('/cotizacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Cotizacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Cotizacion.prototype.id,
  ): Promise<Usuario> {
    return this.cotizacionRepository.usuario(id);
  }
}
