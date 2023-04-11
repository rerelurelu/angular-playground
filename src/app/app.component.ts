import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Item {
  name: string;
  price: string;
  seller: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  items: Item[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.addFields();
  }

  ngOnInit() {}

  addFields() {
    const newItem: Item = {
      name: `name${this.items.length}`,
      price: `price${this.items.length}`,
      seller: `seller${this.items.length}`,
    };
    this.items.push(newItem);

    const group: any = {};
    group[newItem.name] = new FormControl('');
    group[newItem.price] = new FormControl('');
    group[newItem.seller] = new FormControl('');
    this.form.addControl(newItem.name, group[newItem.name]);
    this.form.addControl(newItem.price, group[newItem.price]);
    this.form.addControl(newItem.seller, group[newItem.seller]);
  }

  displayFields() {
    console.log(this.form.value);
  }
}
