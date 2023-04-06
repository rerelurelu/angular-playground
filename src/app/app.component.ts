import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  selectedValue: string = '';

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => (this.options = [])),
        filter((value) => value !== this.selectedValue),
        debounceTime(1000)
      )
      .subscribe((res) => {
        console.log(res);
        this.options = ['One', 'Two', 'Three'];
        this.selectedValue = '';
      });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.options = [];
    this.selectedValue = event.option.value;
  }
}
