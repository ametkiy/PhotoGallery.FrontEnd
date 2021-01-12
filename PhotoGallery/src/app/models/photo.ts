import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Photo{
    id: string="";
    fileName: string ="";
    description:string = "";
    albumId:string="";
    photoData!:any;
    addDate!:Date;
    image:SafeResourceUrl | undefined;
    tags:string="";
}