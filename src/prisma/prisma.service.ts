import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

// injectable decorator to make this service injectable
@Injectable()
// extends PrismaClient to make PrismaClient available in this service
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // super() calls the constructor of the class you extend from
    super({
      // pass the url of the database to the PrismaClient constructor
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
