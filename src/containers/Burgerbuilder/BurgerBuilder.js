import React ,{Component} from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/Aux/withErrorHandler/withErrorHandler'
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
        ingredients:null,
        totalPrice: 4,
        purchaseable:false,
        purchasing:false,
        loading: false,
        error:false
    }
    componentDidMount(){
        axios.get('https://react-my-burger-caffc-default-rtdb.firebaseio.com/ingredients.json')
        .then(res=>{
            this.setState({ingredients:res.data})
        }).catch(error =>{
            this.setState({error:true})
        })
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
        //alert('You continue!');
        this.setState({loading:true})
        const order ={
            ingredients: this.state.ingredients,
            price:this.state.totalPrice.toFixed(2),
            customer: {
                name:'chirag',
                address: {
                    street: 'test street',
                    zipcode:'xxxx',
                    country: 'canada'
                },
                email:'test@gmail.com'
            }
        }
        axios.post('/orders.json',order).then(res => this.setState({loading:false, purchasing:false})).catch(err => this.setState({loading:false, purchasing:false}));

    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        
       
        let burger = this.state.error ? <p> Ingredients cant be loaded</p>: <Spinner/>
        if(this.state.ingredients){
            burger = 
            <div>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    purchasing={this.purchaseHandler}
                    price ={this.state.totalPrice.toFixed(2)} 
                    disabledInfo = {disabledInfo}
                    purchase = {this.state.purchaseable} 
                    ingredientRemoved = {this.removeIngredients} ingredientAdded = {this.addIngredients}/>
            </div>
            orderSummary = <OrderSummary ingredients = {this.state.ingredients}
            purchaseCanceled = {this.purchaseCancel}
            purchaseContinued = {this.purchaseContinue}
            price ={this.state.totalPrice.toFixed(2)} 
            />
            if(this.state.loading){
                orderSummary = <Spinner/>
            }
        }
        
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                <div>
                    {burger}
                </div>
                
            </Aux>
        )
    }

}
export default withErrorHandler(BurgerBuilder,axios)