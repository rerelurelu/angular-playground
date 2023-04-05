import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-component',
  template: `...`, // テンプレートは省略
})
export class MyComponent {
  myControl = new FormControl();
  options: string[] = [];

  constructor() {
    this.myControl.valueChanges
      .pipe(
        filter(value => value.length >= 3), // 3文字以上の入力値のみを処理する
        debounceTime(1000), // 1秒間の待機
        distinctUntilChanged(),
        switchMap((value: string) => this.apiService.getOptions(value))
      )
      .subscribe((options: string[]) => {
        this.options = options;
      });

    onOptionSelected(event: any) {
      // オプションが選択されたときの処理
    }
  }
}
