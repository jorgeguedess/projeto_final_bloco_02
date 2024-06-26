import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        email: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const email = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!email)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return email;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.email);

    if (!buscaUsuario) {
      if (!usuario.foto) usuario.foto = 'https://i.imgur.com/Sk5SjWE.jpg';
      usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
      return await this.usuarioRepository.save(usuario);
    }

    throw new HttpException('O Usuario ja existe!', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    const updateUsuario: Usuario = await this.findById(usuario.id);
    const buscaUsuario = await this.findByUsuario(usuario.email);

    if (!updateUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já Cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    if (!usuario.foto) usuario.foto = 'https://i.imgur.com/Sk5SjWE.jpg';

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }
}
