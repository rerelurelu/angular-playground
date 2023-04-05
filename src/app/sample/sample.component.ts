import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocomplete-example.component.html',
  styleUrls: ['./autocomplete-example.component.scss'],
})
export class AutocompleteExampleComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  apiUrl = 'https://example.com/api';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // valueChangesでインプットボックスの変更を監視
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
      // 条件を満たした場合にのみAPIからデータを取得
      switchMap((value) => {
        if (value.length >= 3) {
          // インプットボックスへの入力が止まってから1秒後にAPIを呼び出します
          return timer(1000).pipe(
            switchMap(() => {
              return this.http.get(this.apiUrl);
            }),
            // レスポンスの監視
            map((res: any) => res.data)
          );
        } else {
          return [];
        }
      })
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
