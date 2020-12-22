import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Photo{
    id!: number;
    fileName!: string;
    description!:string;
    albumId!:number;
    photoData!:any;
    addDate!:Date;
    image:SafeResourceUrl | undefined;
}