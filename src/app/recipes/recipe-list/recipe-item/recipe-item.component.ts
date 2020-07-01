import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  @Input() index: number;
    //  recipe: Recipe
  // @Output('recipeSelected') recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
   
  }

  /** this is the old way for routing */
  // onSelectRecipe(){
  //   // this.recipeSelected.emit();   
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
