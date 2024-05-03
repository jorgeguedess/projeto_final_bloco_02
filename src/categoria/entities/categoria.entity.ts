import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
