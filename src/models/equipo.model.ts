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
    required: false,
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
    required: false,
  })
  PaisEquipo: string[];

  @property({
    type: 'number',
    required: false,
  })
  Altura: number;

  @property({
    type: 'number',
    required: false,
  })
  Anchura: number;

  @property({
    type: 'number',
    required: false,
  })
  Profundidad: number;

  @property({
    type: 'number',
    required: false,
  })
  PesoVolumetrico: number;

  @property({
    type: 'number',
    required: false,
  })
  PesoReal: number;

  @property({
    type: 'number',
    required: false,
  })
  PesoFacturado: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: false,
  })
  PosArancelaria: string[];

  @property({
    type: 'string',
    required: false,
  })
  Proveedor: string;

  @property({
    type: 'string',
    required: false,
  })
  Imagen: string;

  @property({
    type: 'number',
    required: false,
  })
  GastosSIA: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: false,
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
