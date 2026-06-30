import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('device_tokens')
export class DeviceTokens {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    user_id!: number;

    @Column({ nullable: true })
    email!: string;

    @Column({type:'text', nullable: true })
    device_token!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
