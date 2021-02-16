import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  title = 'Twitterclone';
  message = "";
  
  constructor(
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string>("/api/", { responseType: 'text' as 'json' }).subscribe(message => console.log("Server ping: %s", (this.message = message)));
  }
}
