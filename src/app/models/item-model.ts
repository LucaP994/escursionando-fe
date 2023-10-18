import { Coordinates } from "./coordinates-model";

export class Item{
    itemId: string = "";
    title:string = "";
    location:string = "";
    desc:string = "";
    imgUrl:string = "";
    diff: number = 0;
    coords: Coordinates = new Coordinates();
}