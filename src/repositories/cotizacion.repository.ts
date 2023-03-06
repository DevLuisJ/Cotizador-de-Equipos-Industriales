import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cotizacion, CotizacionRelations, Equipo} from '../models';
import {EquipoRepository} from './equipo.repository';

export class CotizacionRepository extends DefaultCrudRepository<
  Cotizacion,
  typeof Cotizacion.prototype.id,
  CotizacionRelations
> {

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Cotizacion.prototype.id>;

  public readonly equipo: HasOneRepositoryFactory<Equipo, typeof Cotizacion.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Cotizacion, dataSource);
    this.equipo = this.createHasOneRepositoryFactoryFor('equipo', equipoRepositoryGetter);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
