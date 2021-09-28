import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'
import { HomeComponent } from './home/home.component'
import { HeaderComponent } from './shared/components/header/header.component'
import { EffectsModule } from '@ngrx/effects'
import { appReducer } from './store/app.state'
import { SharedEffects } from './store/shared/shared.effects'
import { AuthEffects } from './auth/state/auth.effects'
import { AuthTokenInterceptor } from './services/auth-token.interceptor'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { CustomSerializer } from './store/router/custom-serializer';
import { NotFoundComponent } from './shared/components/not-found/not-found.component'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        EffectsModule.forRoot([SharedEffects, AuthEffects]),
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
            autoPause: false
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomSerializer
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        },
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: 'https://api.spacex.land/graphql'
                    })
                }
            },
            deps: [HttpLink]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
