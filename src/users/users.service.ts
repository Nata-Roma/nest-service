import { DbServiceService } from './../db-service/db-service.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private dbService: DbServiceService) {}

  create(createUserDto: CreateUserDto) {
    const user = this.dbService.user.create(createUserDto);
    return user;
  }

  findAll() {
    const users = this.dbService.user.findAll();
    return users;
  }

  findOne(id: string) {
    const user = this.dbService.user.findOne(id);

    if (!Object.keys(user).length) throw new NotFoundException();

    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const resp = this.dbService.user.update(id, updatePasswordDto);

    if (resp.status === 404) throw new NotFoundException();
    if (resp.status === 403)
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'Wrong credentials',
      });

    return resp.user;
  }

  remove(id: string) {
    const resp = this.dbService.user.remove(id);
    if (resp.status === 404) throw new NotFoundException();
    return;
  }
}
