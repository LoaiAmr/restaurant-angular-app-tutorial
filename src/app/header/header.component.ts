import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class headerComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    authenticationSubsription: Subscription;


    constructor(private dataStorageService: DataStorageService,
                private authService: AuthenticationService,
                private router: Router) { }



    ngOnInit() {
        this.authenticationSubsription = this.authService.user.subscribe( user => {
            
            /** If not user set (isAuthenticated = false) else set (isAuthenticated = true) it can be write it by (!!user) */
            this.isAuthenticated = !user ? false : true;
        });
    
    
    }


    /**The old way to make the routing */
    /** @Output('featureSelected') featureSelected = new EventEmitter<string>();
        onSelect(feature: string){
            this.featureSelected.emit(feature);
        } */



    onSaveRecipes() {
        this.dataStorageService.storeRecipes();
    }

    onGetRecipes() {
        this.dataStorageService.fetchRecipes().subscribe();
    }


    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authenticationSubsription.unsubscribe();
    }
}