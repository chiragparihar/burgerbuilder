import React ,{Component} from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7

}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchaseable:false,
        purchasing:false
    }
    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients).map((key) => ingredients[key]).reduce((summ,el) =>{
            return summ +el;
        },0);
        this.setState({purchaseable: sum > 0})
    }
    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }
    addIngredients = (type) =>{
        
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount+1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        updateIngredients[type] = updateCount;
        this.setState( {
            ingredients:updateIngredients,
            totalPrice:newPrice,

        })
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredients = (type) =>{
     
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        updateIngredients[type] = updateCount;
        this.setState( {
            ingredients:updateIngredients,
            totalPrice:newPrice,
    
        })
        this.updatePurchaseState(updateIngredients);
    }
    purchaseCancel = () =>{
        this.setState({purchasing:false})
    }
    purchaseContinue = () =>{
        alert('You continue!');
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancel}>
                    <OrderSummary ingredients = {this.state.ingredients}
                        purchaseCanceled = {this.purchaseCancel}
                        purchaseContinued = {this.purchaseContinue}
                        price ={this.state.totalPrice.toFixed(2)} 
                    />
                </Modal>
                <div>
                    <Burger ingredients = {this.state.ingredients}/>
                </div>
                <div><BuildControls 
                purchasing={this.purchaseHandler}
                price ={this.state.totalPrice.toFixed(2)} 
                disabledInfo = {disabledInfo}
                purchase = {this.state.purchaseable} 
                ingredientRemoved = {this.removeIngredients} ingredientAdded = {this.addIngredients}/></div>
            </Aux>
        )
    }

}
export default BurgerBuilder