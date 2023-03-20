import {Entity, model, property, hasMany, hasOne, belongsTo} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Usuario} from './usuario.model';

@model()
export class Cotizacion extends Entity {
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
  IdSiigo: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  Cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  IdUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  idEquipo: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  TasaCambio: number;

  @property({
    type: 'number',
    required: true,
  })
  FleteOrigenDestino: number;

  @property({
    type: 'number',
    required: true,
  })
  Imprevistos: number;

  @property({
    type: 'number',
    required: true,
  })
  OtrosGastosFit: number;

  @property({
    type: 'number',
    required: true,
  })
  CargoCombustible: number;

  @property({
    type: 'number',
    required: true,
  })
  AlistamientoProveedor: number;

  @property({
    type: 'number',
    required: true,
  })
  FleteLocal: number;

  @property({
    type: 'number',
    required: true,
  })
  AccesoriosLocales: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  FormaPago: string[];

  @property({
    type: 'string',
  })
  Observaciones?: string;

  @property({
    type: 'number',
  })
  TotalPrecioVenta?: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  Moneda: string[];

  @property({
    type: 'number',
    required: true,
  })
  PrecioCompra: number;

  @property({
    type: 'number',
    required: true,
  })
  Seguro: number;

  @hasOne(() => Equipo)
  equipo: Equipo;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Cotizacion>) {
    super(data);
  }
}

export interface CotizacionRelations {
  // describe navigational properties here
}

export type CotizacionWithRelations = Cotizacion & CotizacionRelations;
