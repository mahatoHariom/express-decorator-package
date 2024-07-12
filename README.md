# express-decorators-di Package

express-decorators-di Package is a lightweight, annotation-based framework for building RESTful APIs using Express and TypeScript. It leverages decorators to simplify the definition and organization of controllers, routes, middlewares, and dependency injection.

## Features
- **Annotation-based Controllers and Routes**: Use decorators to define controllers and routes.
- **Middleware Support**: Easily apply middlewares to routes.
- **Dependency Injection**: Built-in dependency injection for managing services.
- **Modular Architecture**: Organize your application into modules for better structure and maintainability.
- **Async Handler**: Simplify async route handling.



## Installation

npm install express-decorators-di


# Using the controller
Use the @Controller decorator to define a controller and the @Get, @Post, @Put, and @Delete decorators to define routes.

import { Controller, Get, Post, Body, Req, Res, Next } from 'my-npm-package';
import { Request, Response, NextFunction } from 'express';

@Controller('/users')
export class UserController {
  @Get('/')
  getAllUsers(req: Request, res: Response) {
    // Your logic here
    res.send('Get all users');
  }

  @Post('/')
  createUser(@Body() body: any, @Res() res: Response) {
    // Your logic here
    res.send(`Create user with data: ${JSON.stringify(body)}`);
  }
}

# Using the Middlewares
import { Controller, Get, UseMiddlewares } from 'my-npm-package';
import { Request, Response, NextFunction } from 'express';

function logMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Request URL:', req.url);
  next();
}

@Controller('/logs')
export class LogController {
  @Get('/')
  @UseMiddlewares(logMiddleware)
  getLogs(req: Request, res: Response) {
    res.send('Check console for logs');
  }
}


# Using Injectable Decorator
import { Injectable } from 'my-npm-package';

@Injectable()
export class UserService {
  getUsers() {
    return ['User1', 'User2'];
  }
}

import { Controller, Get } from 'my-npm-package';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllUsers(req: Request, res: Response) {
    const users = this.userService.getUsers();
    res.send(users);
  }
}


# Creating a Module
import { Module } from 'my-npm-package';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

# Bootstrapping the Application

import { createApp } from 'my-npm-package';
import { UserModule } from './user.module';

const app = createApp(UserModule);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



