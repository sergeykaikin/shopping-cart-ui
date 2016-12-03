import App from './App';
import FirstPage from '../first-page/FirstPage';

const routes = {
	path: '/',
	component: App,
	indexRoute: {
		component: FirstPage
	},
	childRoutes: [{
		path: '*',
		onEnter: (state, replace) => {
			replace('/');
		}
	}]
};

export default routes;