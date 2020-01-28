import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(map(products => products.map(product => ({
        key: product.key,
        title: product.payload.val()['title'],
        category: product.payload.val()['category'],
        imageUrl: product.payload.val()['imageUrl'],
        price: product.payload.val()['price']
      } as Product))
      ));
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);

  }
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
