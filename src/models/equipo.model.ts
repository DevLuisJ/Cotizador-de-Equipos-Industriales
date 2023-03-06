import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cotizacion} from './cotizacion.model';

@model()
export class Equipo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  PaisEquipo: string[];

  @property({
    type: 'number',
    required: true,
  })
  Altura: number;

  @property({
    type: 'number',
    required: true,
  })
  Anchura: number;

  @property({
    type: 'number',
    required: true,
  })
  Profundidad: number;

  @property({
    type: 'number',
    required: true,
  })
  PesoVolumetrico: number;

  @property({
    type: 'number',
    required: true,
  })
  PesoReal: number;

  @property({
    type: 'number',
    required: true,
  })
  PesoFacturado: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  PosArancelaria: string[];

  @property({
    type: 'string',
    required: true,
  })
  Proveedor: string;

  @property({
    type: 'string',
    required: false,
  })
  Imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  GastosSIA: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  PaisProveedor: string[];

  @belongsTo(() => Cotizacion)
  cotizacionId: string;

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
