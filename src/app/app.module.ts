import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from './reducers/todo.reducer';
import { environment } from '../environments/environment';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './service/todo.service';
import { TodoEffects } from './effects/todo.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ todos: todoReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([TodoEffects]),
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
