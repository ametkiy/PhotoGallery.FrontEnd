import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Tag } from './tag';
import { UserLiked } from './userLiked';

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
    userIsliked:boolean = false;
    likesCount:number = -1;
    userLikedList:UserLiked[]=[];
}