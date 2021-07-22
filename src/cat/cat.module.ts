import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { Cat, CatSchema } from './cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatService, CatResolver],
})
export class CatModule {}
