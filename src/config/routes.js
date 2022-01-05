import LayoutLogin from '../components/Layouts/LayoutLogin';
import LayoutHome from '../components/Layouts/LayoutHome';
const routes = [
	{
		path: 'home',
		component: <LayoutHome/>,
		exact: true
	},
    {

		path: '/',
		component: LayoutHome,
		exact: true
	},
    {

		path: 'login',
		component: <LayoutLogin/>,
		exact: true
	}
	
];

export default routes;