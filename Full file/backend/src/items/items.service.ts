import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemes/item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(createItemDto: any): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async update(id: string, updateItemDto: any): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
