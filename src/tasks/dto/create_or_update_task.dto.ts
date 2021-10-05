import {ApiProperty} from "@nestjs/swagger";

import {CreateSolutionDto} from "./create_solution.dto";
import {CreateTaskDto} from "./create_task.dto";
import {Task} from "../task.model";
import {Solution} from "../solution.model";


export class CreateOrUpdateDto {
    @ApiProperty({example: 5})
    readonly task_id: number | undefined;

    @ApiProperty({example: Task})
    readonly task: CreateTaskDto;

    @ApiProperty({example: [Solution]})
    readonly solutions: CreateSolutionDto[];
}