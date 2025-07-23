import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(dto: CreatePostDto) {
    const post = this.repo.create(dto);
    return this.repo.save(post);
  }

  findAll(limit: number, offset: number) {
    return this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException();
    return post;
  }

  async update(id: number, dto: CreatePostDto) {
    await this.repo.update(id, dto);
    return { message: 'Updated successfully' };
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
