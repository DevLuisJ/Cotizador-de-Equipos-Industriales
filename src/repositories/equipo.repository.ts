import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Equipo, EquipoRelations, Cotizacion} from '../models';
import {CotizacionRepository} from './cotizacion.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly cotizacion: BelongsToAccessor<Cotizacion, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CotizacionRepository') protected cotizacionRepositoryGetter: Getter<CotizacionRepository>,
  ) {
    super(Equipo, dataSource);
    this.cotizacion = this.createBelongsToAccessorFor('cotizacion', cotizacionRepositoryGetter,);
    this.registerInclusionResolver('cotizacion', this.cotizacion.inclusionResolver);
  }
}
