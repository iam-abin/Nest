import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}
  async create(createCityDto: CreateCityDto) {
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  async findAll() {
    const city = await this.citiesRepository.find();
    if (!city) throw new NotFoundException('Cities are not available');
    return city;
  }

  async findOne(id: number) {
    const city = await this.citiesRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.citiesRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException('City not found');
    Object.assign(city, updateCityDto);
    return this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.citiesRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException('City not found');

    return await this.citiesRepository.remove(city);
  }
}
