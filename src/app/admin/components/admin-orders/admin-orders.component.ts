import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orders;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
