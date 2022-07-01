import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const intValue = parseInt(value, 10);
    if(isNaN(intValue)) {
      throw new BadRequestException(`The value "${value}" should be a number`)
    }

    return intValue
  }
}
