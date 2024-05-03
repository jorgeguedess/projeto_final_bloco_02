import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller('/produtos')
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') name: string): Promise<Produto[]> {
    return this.produtoService.findByName(name);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByDescription(
    @Param('descricao') description: string,
  ): Promise<Produto[]> {
    return this.produtoService.findByDescription(description);
  }

  @Get('/preco_menor/:preco')
  @HttpCode(HttpStatus.OK)
  findByLowestPrice(@Param('preco') preco: number): Promise<Produto[]> {
    return this.produtoService.findByLowestPrice(preco);
  }

  @Get('/preco_maior/:preco')
  @HttpCode(HttpStatus.OK)
  findByHigherPrice(@Param('preco') preco: number): Promise<Produto[]> {
    return this.produtoService.findByHigherPrice(preco);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
