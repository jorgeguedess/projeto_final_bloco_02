import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { CategoriaService } from 'src/categoria/services/categoria.service';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, CategoriaService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
