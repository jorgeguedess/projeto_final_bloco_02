import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  // Tipo ['Analgésicos, 'Vitaminas e suplementos', 'Antialérgicos']
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  tipo: string;

  // Slug ['analgesicos, 'vitaminas-e-suplementos', 'antialergicos']
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  slug: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
