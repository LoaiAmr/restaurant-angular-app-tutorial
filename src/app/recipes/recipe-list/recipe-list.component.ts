import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('First recipe', 'Taste it before any thing', 
    'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg'),
    new Recipe('First recipe', 'Taste it before any thing', 
    'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
