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
  Cotizacion,
  Equipo,
} from '../models';
import {CotizacionRepository} from '../repositories';

export class CotizacionEquipoController {
  constructor(
    @repository(CotizacionRepository) protected cotizacionRepository: CotizacionRepository,
  ) { }

  @get('/cotizacions/{id}/equipo', {
    responses: {
      '200': {
        description: 'Cotizacion has one Equipo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo> {
    return this.cotizacionRepository.equipo(id).get(filter);
  }

  @post('/cotizacions/{id}/equipo', {
    responses: {
      '200': {
        description: 'Cotizacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cotizacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInCotizacion',
            exclude: ['id'],
            optional: ['cotizacionId']
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.cotizacionRepository.equipo(id).create(equipo);
  }

  @patch('/cotizacions/{id}/equipo', {
    responses: {
      '200': {
        description: 'Cotizacion.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.cotizacionRepository.equipo(id).patch(equipo, where);
  }

  @del('/cotizacions/{id}/equipo', {
    responses: {
      '200': {
        description: 'Cotizacion.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.cotizacionRepository.equipo(id).delete(where);
  }
}
