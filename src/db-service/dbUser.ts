import { UpdatePasswordDto } from './../users/dto/update-password.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
export class DbUser {
  private table: Array<User> = [];

  create(data: CreateUserDto) {
    const newUser = new User({
      id: uuidv4(),
      login: data.login,
      password: data.password,
      version: 1,
      //createdAt: Date.now(),
      //updatedAt: Date.now(),
    });
    this.table.push(newUser);
    
    return newUser;
  }

  findAll() {
    return this.table.map((item) => new User({ ...item }));
  }

  findOne(id: string) {
    return new User(this.table.find((item) => item.id === id));
  }

  update(id: string, data: UpdatePasswordDto) {
    const userIndex = this.table.findIndex((user) => user.id === id);
    if (userIndex < 0) return { status: 404, message: 'Not found' };
    const user = this.table[userIndex];
    if (user.password === data.oldPassword) {
      const newUser = {
        ...user,
        version: ++user.version,
        //updatedAt: Date.now(),
        password: data.newPassword,
      };
      this.table[userIndex] = newUser;
      return { status: 200, user: new User(newUser) };
    } else {
      return { status: 403, message: 'Wrong credentials' };
    }
  }

  remove(id: string) {
    const userIndex = this.table.findIndex((user) => user.id === id);
    if (userIndex < 0) return { status: 404, message: 'Not found' };
    this.table = this.table.filter((item) => item.id !== id);
    return { status: 204 };
  }
}
