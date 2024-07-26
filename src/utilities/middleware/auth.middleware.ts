import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.user = null;
      next();
    } else {
      const token = authHeader.split(' ')[1];
      console.log(token);
      const { id } = <jwtToken>(
        verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
      );
      const user = await this.usersService.findOne(+id);
      req.user = user;
      console.log(id);
      next();
    }
  }
}

interface jwtToken {
  id: string;
}
