import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCrdentialsDto } from 'src/dto/user/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';
import { UserProfileDto } from 'src/dto/user/user-profile.dto';
import { ListUserDto } from 'src/dto/user/list-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredsDto: AuthCrdentialsDto): Promise<void> {
    const { username, password, email } = authCredsDto; // destruct the DTO

    // const exist = this.findOne({ username });

    const user = new User(); // User is the Entity here
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    // user.password = await this.hashPassword(password);

    console.log('Password => ', password);

    try {
      await user.save();
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateProfile(userProfile: UserProfileDto, user: User): Promise<void> {
    const { profileImage, address, phoneNumber,isActive, fullname } = userProfile;
    // const userData =  new User();

    user.profileImage = profileImage;
    user.address = address;
    user.phoneNumber = phoneNumber;
    user.isActive = isActive;
    user.fullname = fullname;
    await user.save();
  }

  // Listing the user
  async listUser(listUserDto: ListUserDto): Promise<User[]> {
      // const { profileImage, fullname, email, username, phoneNumber, address } = listUserDto;
      const query = this.createQueryBuilder('user');

      const users = await query.getMany();
      return users;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  // private async hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password);
  // }


  //validating the user Password
  async validUserPassword(authCredsDto: AuthCrdentialsDto): Promise<string> {
    const { username, password } = authCredsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
