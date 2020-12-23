import { Photo } from './photo';

export class PageOfFoto{
    count:number = 0;
    pageSize:number = 10;
    page:number =1;
    photos:Photo[] = [];
}