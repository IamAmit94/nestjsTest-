import { ValidationPipe } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import passport from 'passport';
import { GetUser } from 'src/decorators/get-user.decorator';
// import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthCrdentialsDto } from 'src/dto/user/auth-credentials.dto';
import { ListUserDto } from 'src/dto/user/list-user.dto';
import { UserProfileDto } from 'src/dto/user/user-profile.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  // Sign Up
  @Post('/signup')
  signUp(@Body() authCredDto: AuthCrdentialsDto): Promise<void> {
    // console.log(authCredDto)
    return this.authSerivce.signUp(authCredDto);
  }

  // Sign IN
  @Post('/signin')
  singIn(
    @Body() authCredDto: AuthCrdentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authSerivce.singIn(authCredDto);
  }

  // User Logout API
  // @Post('/logout') : Promise<void>{
  //   function(req, res) {
  //     req.logout();
  //     res.redirect('/signin')
  //   }

  // }

  // User Profile Api

  @Put('/updateprofile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @Body() userProfile: UserProfileDto,
    @Req() req,
  ): Promise<void> {
    // console.log('User =>',user);
    return this.authSerivce.updateProfile(userProfile, req.user);
  }


  // List All user
  @Get('/listuser')
  listUser(
    @Query(ValidationPipe)
    listUserDto: ListUserDto): Promise<User[]> {
    return this.authSerivce.listUser(listUserDto)
  }

  // for testing the JWT PASsport Streategies || To get the User info only
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
