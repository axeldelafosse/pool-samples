import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SuccessObjectDto {
  @Field((_type) => Boolean) public success: boolean;
  @Field((_type) => String, { nullable: true }) public message?: string;
}
