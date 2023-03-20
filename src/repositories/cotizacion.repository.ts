import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cotizacion, CotizacionRelations, Equipo, Usuario} from '../models';
import {EquipoRepository} from './equipo.repository';
import {UsuarioRepository} from './usuario.repository';

export class CotizacionRepository extends DefaultCrudRepository<
  Cotizacion,
  typeof Cotizacion.prototype.id,
  CotizacionRelations
> {

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Cotizacion.prototype.id>;

  public readonly equipo: HasOneRepositoryFactory<Equipo, typeof Cotizacion.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Cotizacion.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Cotizacion, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.equipo = this.createHasOneRepositoryFactoryFor('equipo', equipoRepositoryGetter);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
