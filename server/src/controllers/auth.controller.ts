import {repository} from '@loopback/repository';
import {post, getModelSchemaRef, requestBody, response} from '@loopback/rest';
import {inject, service} from '@loopback/core';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {TokenService} from '@loopback/authentication';
import {CustomUserService} from '../services/user.service';

export class AuthController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @service(CustomUserService)
    public userService: CustomUserService,

    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/auth')
  @response(200, {
    description: 'User auth',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async auth(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {exclude: ['id', 'email']}),
        },
      },
    })
    credentials: User,
  ): Promise<{jwt: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const jwt = await this.jwtService.generateToken(userProfile);

    return {jwt};
  }
}
