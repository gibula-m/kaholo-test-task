import { IsNotEmpty, IsString } from "class-validator";

export class ExecuteShellDTO {
  @IsString()
  @IsNotEmpty()
  shellCommand!: string;
}
