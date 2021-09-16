import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { routes } from 'src/app/app-routing.module'
import { User } from 'src/app/model/user.model'
import { HomeComponent } from 'src/app/home/home.component'
import { NotFoundComponent } from '../not-found/not-found.component'
import { lastValueFrom } from 'rxjs'

import { HeaderComponent } from './header.component'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { appReducer } from 'src/app/store/app.state'
import { CustomSerializer } from 'src/app/store/router/custom-serializer'
import { DebugElement } from '@angular/core'
import { isAuthenticated } from 'src/app/auth/state/auth.selectors'
import { By } from '@angular/platform-browser'

describe('HeaderComponent', () => {
    let tComponent: HeaderComponent
    let mockStore: MockStore
    let fixture: ComponentFixture<HeaderComponent>
    let de: DebugElement
    const initialState = {
        auth: { user: null}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                StoreRouterConnectingModule.forRoot({
                    serializer: CustomSerializer
                }),
                StoreModule.forRoot(appReducer)
            ],
            declarations: [HeaderComponent, HomeComponent, NotFoundComponent],
            providers: [
                provideMockStore({
                    initialState
                })
            ]
        }).compileComponents() // compiles sass and html template

        mockStore = TestBed.inject(MockStore)
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent)
        tComponent = fixture.componentInstance
        de = fixture.debugElement

        mockStore.refreshState()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(tComponent).toBeTruthy()
    })

    it('should have authentication false', (done) => {
        // Arrange
        // Act

        // Assert
        tComponent.isAuthenticated$.subscribe(
            value => {
                expect(value).toBeFalsy()
                done()
            }
        )
        expect(de.queryAll(By.css('li')).length).toEqual(4)
    })
})
