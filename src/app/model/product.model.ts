import { Variance } from "./variance.model";

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public variance: Variance[];

  constructor(id: number, name: string, desc: string, imageUrl: string, variance: Variance[]) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imageUrl;

    //sort variance based on price first
    variance.sort((a, b) => b.price - a.price);
    this.variance = variance;
  }
}
