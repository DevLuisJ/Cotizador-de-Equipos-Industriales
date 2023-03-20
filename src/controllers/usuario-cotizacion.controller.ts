import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Cotizacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCotizacionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/cotizacions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Cotizacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cotizacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cotizacion>,
  ): Promise<Cotizacion[]> {
    return this.usuarioRepository.cotizacions(id).find(filter);
  }

  @post('/usuarios/{id}/cotizacions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cotizacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {
            title: 'NewCotizacionInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) cotizacion: Omit<Cotizacion, 'id'>,
  ): Promise<Cotizacion> {
    return this.usuarioRepository.cotizacions(id).create(cotizacion);
  }

  @patch('/usuarios/{id}/cotizacions', {
    responses: {
      '200': {
        description: 'Usuario.Cotizacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cotizacion, {partial: true}),
        },
      },
    })
    cotizacion: Partial<Cotizacion>,
    @param.query.object('where', getWhereSchemaFor(Cotizacion)) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.usuarioRepository.cotizacions(id).patch(cotizacion, where);
  }

  @del('/usuarios/{id}/cotizacions', {
    responses: {
      '200': {
        description: 'Usuario.Cotizacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cotizacion)) where?: Where<Cotizacion>,
  ): Promise<Count> {
    return this.usuarioRepository.cotizacions(id).delete(where);
  }
}
