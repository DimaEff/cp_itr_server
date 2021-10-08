import {PaginationDto} from "../../helper/dto/pagination.dto";


export class FilterGetAllDto extends PaginationDto {
    readonly theme: string | undefined;
    // readonly limit: number | undefined;
    // readonly page: number | undefined;
}