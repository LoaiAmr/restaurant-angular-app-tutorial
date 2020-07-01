import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput') ingredientNameInput: ElementRef;
  // @ViewChild('amountInput') ingredientAmountInput: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('ingredientForm') slForm: NgForm;
  subscription: Subscription;
  editIedtemIngredientIndex: number;
  editMode = false;
  editedIngredientItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
        (index: number) => {
          this.editIedtemIngredientIndex = index;
          this.editMode = true;
          this.editedIngredientItem = this.shoppingListService.getIngredientByIndex(index);
          this.slForm.setValue({
            name: this.editedIngredientItem.name,
            amount: this.editedIngredientItem.amount
          })
        }
      );
  }

  onSubmit(ingredientForm: NgForm){
    // const ingName = this.ingredientNameInput.nativeElement.value;
    // const ingAmount = this.ingredientAmountInput.nativeElement.value;
    // this.ingredientAdded.emit(newIngredient);
    const value = ingredientForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode === true){
      this.shoppingListService.updateIngredient(this.editIedtemIngredientIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    ingredientForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editIedtemIngredientIndex);
    this.onClear();
  }
  
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
