// import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { logout } from '../store/actions/user.actions.js'
// import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()

    return (

        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Car App!!!</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}
                    <NavLink to="/dashboard" >Dashboard</NavLink>

                </nav>
            </section>
           
            {/* <UserMsg /> */}
        </header>

    )
}
