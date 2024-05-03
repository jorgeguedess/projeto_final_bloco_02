import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByName(name: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${name}%`),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findByDescription(description: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${description}%`),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findByLowestPrice(price: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        preco: LessThan(price),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findByHigherPrice(price: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        preco: MoreThan(price),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );

      if (!categoria)
        throw new HttpException(
          'Produto não foi encontrado!',
          HttpStatus.NOT_FOUND,
        );
    }

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    const buscaProduto = await this.findById(produto.id);

    if (!buscaProduto || !produto.id)
      throw new HttpException(
        'Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    if (produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );

      if (!categoria)
        throw new HttpException('Categoria encontrada!', HttpStatus.NOT_FOUND);

      return await this.produtoRepository.save(produto);
    }

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaProduto = await this.findById(id);

    if (!buscaProduto)
      throw new HttpException(
        'Produto não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.produtoRepository.delete(id);
  }
}
