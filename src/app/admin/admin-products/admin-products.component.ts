import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'title', 'price', 'action'];
  pageSize: number = 10;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.dataSource.data = this.products = products);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    this.dataSource.data = this.filteredProducts;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
