import { OrderService } from '../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  id;
  datePlaced;
  items;
  shipping;
  isDataLoaded = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.orderService.getOneOrder(this.id).snapshotChanges().subscribe(p => {
        this.shipping = p[2].payload.val();
        this.datePlaced = p[0].payload.val();
        this.items = p[1].payload.val();

        this.isDataLoaded = true;
      });
    }


  }

}
