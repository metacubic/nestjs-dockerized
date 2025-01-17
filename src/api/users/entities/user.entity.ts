import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from '../../blogs/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user', { schema: 'meu' })
class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column({ unique: true })
  @ApiProperty()
  public email: string;

  @Column()
  @ApiProperty()
  public username: string;

  @Column()
  @Exclude()
  @ApiProperty()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  streamKey: string;
}

export default User;
