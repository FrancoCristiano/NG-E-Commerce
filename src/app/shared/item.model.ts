export class Item {
  title: string = '';
  price: number = 0;
  category: string = '';
  img: string = '';
  amount: number = 0;
  recensioni: string[] = [];
  id: string = '';

  constructor(
    title: string,
    price: number,
    category: string,
    img: string,
    amount: number
  ) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.img = img;
    this.amount = amount;
    this.recensioni = [];
    this.id;
  }
}
