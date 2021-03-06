import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from'./BurgerIngredient/BurgerIngredient';
const burger = props =>{
    let transIngredients = Object.keys(props.ingredients).map(igkey =>{
        
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredient key ={igkey+ i} type={igkey}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[])
    if (transIngredients.length === 0){
        transIngredients = <p>Please start adding Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type ="bread-top" />
            {transIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );
}
export default burger