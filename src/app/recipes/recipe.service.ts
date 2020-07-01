import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('Firecracker Checkin',
  //     'This recipe is chunks of crispy chicken tossed ',
  //     'https://www.dinneratthezoo.com/wp-content/uploads/2017/10/firecracker-chicken-1.jpg',
  //     [
  //       new Ingredient('Meat', 10),
  //       new Ingredient('onions', 8)
  //     ]),
  //   new Recipe('lentil soup',
  //     'This lentil soup is one of my pantry recipes',
  //     'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
  //     [
  //       new Ingredient('vigitables', 8),
  //       new Ingredient('salad', 5)
  //     ]),
  //   new Recipe('Lamp recipe',
  //     'Lamb is one of those Christmas favorites',
  //     'https://insimoneskitchen.com/wp-content/uploads/2017/12/20160430-Lamsbout-met-rozemarijn.jpg',
  //     [
  //       new Ingredient('bunch rosemary', 4),
  //       new Ingredient('bunch thyme', 5)
  //     ]),
  //   new Recipe('Burger recipe',
  //     '8 chefs share their favorite burger recipe',
  //     'https://media1.s-nbcnews.com/i/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.jpg',
  //     [
  //       new Ingredient('Checken', 8),
  //       new Ingredient('salad', 5),
  //       new Ingredient('tomatoes', 2)
  //     ])
  // ];

  private recipes: Recipe[] = []; 

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipesInDataStorageService(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  recipeSelected = new EventEmitter<Recipe>();

  onAddIngredientsToShoppingListService(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsFromRecipeService(ingredients);
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index]; /**slic() is used to take a copy from the array it is better */
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newdRecipe: Recipe) {
    this.recipes[index] = newdRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

}