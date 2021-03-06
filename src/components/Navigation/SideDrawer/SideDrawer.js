import Logo from '../../Logo/Logo'
import NavigationItms from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'
const sideDrawer = (props) =>{
    // ...
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses =  [classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
            <Backdrop show ={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                
                <nav >
                    <NavigationItms></NavigationItms>
                </nav>
                
            </div>
        </Aux>
    );
}
export default sideDrawer;