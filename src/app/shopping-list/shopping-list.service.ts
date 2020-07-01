import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

    // ingredientAdded = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Potatoes', 23)
    ];

    getIngredientByIndex(index: number){
        return this.ingredients[index]; 
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
        // this.ingredientAdded.emit(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredientsFromRecipeService(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        /*
        * or you can type it like bellow
        *
        * for(let ingredient of ingredients){
        *     this.ingredients.push(ingredient);
        * }
        */
        // this.ingredientAdded.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
    }

}