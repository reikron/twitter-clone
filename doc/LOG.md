ng new twitter-clone --minimal --style=scss && cd twitter-clone

.browserslistrc
defaults
not > 0.5%
not last 2 versions
not Firefox ESR
not dead
not IE 9-11 # For IE 9-11 support, remove 'not'.

tsconfig.json
"sourceMap": false,

tsconfig.app.json
"optimization": false,
"outputHashing": "none",
"sourceMap": false,
"extractCss": true,
"namedChunks": false,
"showCircularDependencies": false,
"aot": false,
"extractLicenses": false,
"statsJson": false,
"progress": false,
"vendorChunk": true,
"buildOptimizer": false,

angular.json
"inlineTemplate": false,
"inlineStyle": true,
"aot": false,

npm i --save body-parser bootstrap connect-session-knex cookie-parser express express-session forever glob jquery knex pg validator && npm i --save-dev concurrently nodemon sqlite3

@import '~bootstrap/dist/css/bootstrap.min.css';

mkdir doc
mkdir test

app.component.ts
template: `<router-outlet></router-outlet>`,
styles: []

app.module.ts
imports: [
    AppRoutingModule
],

app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

proxy.conf.json
{
  "/api": {
    "target": "http://localhost:3000/api",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

mkdir server

app.component.ts
import { HttpClientModule } from '@angular/common/http';

imports: [
  HttpClientModule
]

package.json
  "watch": "concurrently --kill-others \"nodemon --watch server/**/*.js -e js --exec node index.js\" \"ng serve --proxy-config proxy.conf.json\""
