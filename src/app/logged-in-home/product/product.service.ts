import { Injectable } from '@angular/core';
import { Variance } from 'src/app/model/variance.model';
import { Product } from '../../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productList: Product[] = [
    new Product(
      0,
      'Ducati Panigale V4',
      "No sports bike top ten would be complete without a beautiful Ducati, in this case the new for 2018 V4 powered Panigale V4 S. It sets the bar high on looks, power, weight and features all the tech you would expect. There's Ohlins electrically adjustable suspension, cornering ABS, slide control, a lean angle aware quickshifter, gorgeous TFT dash and of course the stunning single sided swingarm with no massive exhaust to ruin the lines.",
      'https://media.gq-magazine.co.uk/photos/5d24fc7217647800088b648d/master/w_720%2cc_limit/panigale-v4-studio-side.jpeg',
      [new Variance('full spec', 180000), new Variance('low spec', 172900)]
    ),

    new Product(
      1,
      'Kawasaki Ninja H2',
      "It's the tamed road-focused version of the crazy 306 bhp H2R and worth looking at if you want to win at Top Trumps. The engine is supercharged plus between 2017 and 2019 it gained all the modern tech you could want, such as the up / down quickshifter, cornering ABS, Ohlins TTX36 shock, Brembo Stylema brakes, self healing paint and a fancy TFT dash. Of course 200 bhp isn't enough so they added another 40 bhp (with ram-air) while they were at it!",
      'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQpX4h6R3LT4/v1/-1x-1.jpg',
      [new Variance('full spec', 260000), new Variance('low spec', 153000)]
    ),

    new Product(
      2,
      'Suzuki GSX-R1000R',
      "Competing directly with the Fireblade is Suzuki's new for 2017 GSX-R1000R. A major re-design focused on more power from a Variable Valve Timing (VVT) engine, aerodynamics and being more compact however the exhaust grew into a bit of a monster. \n\n It builds on the £2,850 cheaper base GSX-R1000 with more advanced Showa suspension, a bi-directional quickshifter, launch control and a lighter battery.",
      'https://media.zigcdn.com/media/content/2019/Jan/suzuki-gsx-r1000-engine-vvt-update_720x540.jpg',
      [
        new Variance('full spec', 110000),
        new Variance('low spec', 91425),
        new Variance('Mid spec', 96543),
      ]
    ),

    new Product(
      3,
      'Honda EX5 Dream FI',
      'The Honda EX5 Dream FI is powered by an air-cooled, four-stroke 110 cc engine which puts out a total of 8.4 hp at 7,500 rpm and 8.4 Nm of torque at 6,000 rpm. Transmission is that of the four-speed constant mesh variety with a wet-type automatic centrifugal clutch. As for the (adjustable) suspension setup, 81 mm telescopic forks are featured up front with 68 mm twin forks at the rear.',
      'https://www.bikesrepublic.com/wp-content/uploads/2017/06/2017_Honda_EX5_Dream_fi_30_Years_8.jpg',
      [new Variance('full spec', 4449), new Variance('low spec', 4299)]
    ),
  ];

  getProductList() {
    return this.productList.slice();
  }

  getProduct(id: number) {
    //Filter will return an array of product that has the same id
    //const chosenProduct: Product[] = this.productList.filter(x => x.id === id);

    //Find method only search for the first element with the desired id
    const chosenProduct: Product = this.productList.find((x) => x.id === id);
    return chosenProduct;
  }
}
