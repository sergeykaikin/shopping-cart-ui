import App from './App';
import FirstPage from '../first-page/FirstPage';
import ShoppingCart from '../shopping-cart/ShoppingCart';

const routes = {
	path: '/',
	component: App,
	indexRoute: {
		component: FirstPage
	},
	childRoutes: [{
		path: 'shopping-cart',
		component: ShoppingCart
	}, {
		path: '*',
		onEnter: (state, replace) => {
			replace('/');
		}
	}]
};

export default routes;