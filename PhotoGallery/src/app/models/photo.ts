import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Tag } from './tag';

export class Photo{
    id: string="";
    fileName: string ="";
    description:string = "";
    albumId:string="";
    photoData:any;
    imageToShow:any;
    addDate!:Date;
    image:SafeResourceUrl | undefined;
    tags:Tag[]=[];
    private:boolean=false;
    userId:string="";
    firstName:string="";
    lastName:string="";
}