import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: 2 }) // 1- Admin, 2-Customer
  role_id!: number;

  @Column({ nullable: true,unique:true })
  email!: string;

  @Column({ nullable: true,unique:true })
  phone!: string;

  @Column({ nullable: true })
  dial_code!: number;

  @Column({type: 'varchar', nullable: true })
  password!: string | null;

  @Column({ nullable: true })
  first_name!: string;

  @Column({ nullable: true })
  last_name!: string;

  @Column({ type: 'text', nullable: true })
  image!: string;

  @Column({ type: "text", nullable: true })
  reset_password_token!: string | null;

  @Column({ nullable: true, default:true})
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

} 
