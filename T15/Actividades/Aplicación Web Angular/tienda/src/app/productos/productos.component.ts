import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  
  products:any;
  price:number=0;
  name:string='';
  auth:AuthService;
  constructor(authService: AuthService ) {
    this.auth=authService;
     this.auth.dataRead().subscribe((res: any) =>(this.products= res));
  }

  write(){
    this.auth.writeData({price:this.price,name:this.name});
  }

  ngOnInit(): void {
  }


}
