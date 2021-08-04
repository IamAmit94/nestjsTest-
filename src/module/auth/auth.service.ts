import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrdentialsDto } from 'src/dto/user/auth-credentials.dto';
import { ListUserDto } from 'src/dto/user/list-user.dto';
import { UserProfileDto } from 'src/dto/user/user-profile.dto';
import { JwtPayload } from 'src/jwt/jwt-payload-interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  // User Signup
  async signUp(authCredsDto: AuthCrdentialsDto): Promise<void> {
    return this.userRepo.signUp(authCredsDto);
  }

  // User Sign In
  async singIn(
    authCredsDto: AuthCrdentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepo.validUserPassword(authCredsDto);
    // console.log('SignIN => ', result)

    if (!username) {
      throw new UnauthorizedException('Invalid Creds');
    }

    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  // User Logout

  // logout()

  // Adding the user profile
  async updateProfile(
    userProfile: UserProfileDto,
    user: User,
    // @UseGuards(AuthGuard())
  ): Promise<void> {
      return this.userRepo.updateProfile(userProfile, user);
  }


  // Listing all User
  async listUser(listUserDto: ListUserDto): Promise<User[]> {

    return this.userRepo.listUser(listUserDto)
  }
}
