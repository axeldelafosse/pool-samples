import { Injectable } from '@nestjs/common';

import { UserDAO } from 'src/entities/dao/user.dao';
import { User } from 'src/entities/user.entity';

function getOneRandomColorFromPalette() {
  const colors = [
    '#00FEFE',
    '#63DFDA',
    '#985EDE',
    '#FF7FEC',
    '#94DDFF',
    '#1EDFB0',
    '#FEE36B',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

@Injectable()
export class UserService {
  constructor(private readonly userDAO: UserDAO) {}

  // FindOneOptions<User>
  public async findOne(options?: any): Promise<User> {
    return await this.userDAO.findOne(options);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.userDAO
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  public async create({
    email,
    password,
    firstName,
    lastName,
    locale,
  }): Promise<User> {
    let user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.locale = locale;
    user.color = getOneRandomColorFromPalette();

    return await this.userDAO.save(user);
  }

  public async setPicture(userId: string, pictureUrl: string) {
    await this.userDAO.update(userId, { picture: pictureUrl });
  }

  public async setPassword(userId: string, password: string) {
    await this.userDAO.update(userId, { password: password });
  }
}
