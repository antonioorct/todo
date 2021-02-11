import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {UserRepository} from './repositories';
import {DbDataSource} from './datasources/db.datasource';
import path from 'path';
import {MySequence} from './sequence';
import {CustomUserService} from './services/user.service';

export {ApplicationConfig};

export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      process.env.JWT_SECRET ?? 'JWTSECRETKEY',
    );
  }
}
