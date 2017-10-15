import { Component, OnInit } from '@angular/core'
import { OrderService } from '../services/order.service'

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {
  orders: any[]
  loading: boolean = true
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    let temp
    this.orderService.showOrders()
    .subscribe(
      data => temp = data,
      error => alert(error),
      () => {
        this.orders = temp
        this.loading = false
      }
    )
  }

}
