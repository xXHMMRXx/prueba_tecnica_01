import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input('userDetail') set userDetail(value: any) {
    this.cardConfig = {
      ...value,
      customAddress: value?.address ? this.getAddress(value?.address) : '',
    };
  }

  cardConfig: any;

  getAddress(address: any): string {
    return `Calle: ${address.street}, Apartamento: ${address.suite}, Ciudad: ${address.city}, C.P: ${address.zipcode}. \n Latitud: ${address.geo.lat}, Longitud: ${address.geo.lng}`;
  }
}
