import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  version: number;

  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
