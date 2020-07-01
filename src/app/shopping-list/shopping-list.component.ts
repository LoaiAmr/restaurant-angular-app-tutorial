import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangedSubscirption: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientChangedSubscirption = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
       this.ingredients = ingredients;
       
      }
    );
  }

  onEditIngredientItem(index: number){
    this.shoppingListService.startEditing.next(index);
    console.log(index);
    console.log(this.shoppingListService.getIngredientByIndex(index));
  }

  ngOnDestroy(){
    this.ingredientChangedSubscirption.unsubscribe();
  }
}
