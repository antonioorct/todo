import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {User} from '../models';
import {UserRepository} from '../repositories';

export type Credentials = {
  username: string;
  password: string;
};

export class CustomUserService {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid username or password.';

    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id,
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}
