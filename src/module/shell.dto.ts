import { IsString } from "class-validator";

export class ExecuteShellDTO {
  @IsString()
  shellCommand!: string;
}
