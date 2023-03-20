import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Cotizacion} from '../models';
import {CotizacionRepository} from './cotizacion.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly cotizacions: HasManyRepositoryFactory<Cotizacion, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CotizacionRepository') protected cotizacionRepositoryGetter: Getter<CotizacionRepository>,
  ) {
    super(Usuario, dataSource);
    this.cotizacions = this.createHasManyRepositoryFactoryFor('cotizacions', cotizacionRepositoryGetter,);
    this.registerInclusionResolver('cotizacions', this.cotizacions.inclusionResolver);
  }
}
