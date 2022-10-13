

import { Route, Switch } from 'react-router-dom';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';



//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';


//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
function App() {
	return (
		<>
			{/* Switch는 같은 경로의 라우터 연결시 구체적인 라우터 하나만 적용한다. */}
			<Switch>
				{/* exact가 있으면 메인페이지로 */}
				<Route exact path='/'>
					{/* 메인에만 적용하는 header exact라는 구문 때문에 딱 '/'만 존재하면 메인페이지로 인식을 해서 이곳의 header를 읽어준다. */}
					<Header type={'main'} />
					{/* 프롭으로 type={'main'} 으로 메인 프롭이 있는 스타일을 적용시켜 메인헤더를 스타일링하게 한다. */}
					<Visual />
					<Content />
				</Route>
				<Route path='/'>
					{/* 서브페이지 모두에 적용하는 header로 '/' 이후에 어떤 주소가 있으면 서브페이지의 헤더로 인식하여 이곳의 헤더를 읽어준다. */}
					<Header type={'sub'} />
					{/* prop으로 type={'sub'} 으로 'sub' 프롭이 있는 스타일을 적용시켜 메인헤더를 스타일링하게 한다. */}
				</Route>
			</Switch>


			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/location' component={Location} />
			<Route path='/member' component={Member} />
			<Route path='/youtube' component={Youtube} />


			<Footer />

		</>

	);
}

export default App;
