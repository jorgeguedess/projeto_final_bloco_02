import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  preco: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  foto: string;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
