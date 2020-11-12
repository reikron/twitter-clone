import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Twitter Clone';
  message = "";

  constructor(
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string>("/api/", { responseType: 'text' as 'json' }).subscribe(message => console.log((this.message = message)));
  }
}
