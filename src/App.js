import logo from './logo.svg';
import './App.css';
import NavigationDiary from './navigation/NavigationDiary';
import NavigationLogin from './navigation/NavigationLogin';
import NavigationLogout from './navigation/NavigationLogout';
import ShareGroupList from './share_diary/ShareGroupList';
import Calendar from './Calendar';
import ShareGroupDiaryList from './share_diary/ShareGroupDiaryList';
import ShareDiaryDetail from './share_diary/ShareDiaryDetail';
import { Link, Route } from 'react-router-dom';
import './navigation/navigation.css'


function App() {

  let name = "김초원";

  return (
    <>
    <ul>
      <li><Link to='/navi'>네비</Link></li>
      
    </ul> 
    
    
    <Route path='/navi' 
          component={ (props) => <NavigationLogin {...props} 
          name={ name }/>} exact={ true } />
    <Route path='/sharelist' component={ShareDiaryDetail} />
    </>
  );
}

export default App;
