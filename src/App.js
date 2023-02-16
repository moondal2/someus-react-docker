import logo from './logo.svg';

import NavigationDiary from './navigation/NavigationDiary';
import NavigationLogin from './navigation/NavigationLogin';
import NavigationLogout from './navigation/NavigationLogout';
import GroupList from './share_diary/GroupList';
import Calendar from './Calendar';
import GroupShareList from './share_diary/GroupShareList';
import ShareDiaryDetail from './share_diary/GroupShareDetail';
import GroupDiaryWrite from './share_diary/GroupDiaryWrite';
import { Link, Route } from 'react-router-dom';
import AddGroup from './share_diary/AddGroup'
import MyDiaryList from './private_diary/MyDiaryList';

function App() {

  let name = "김초원";

  return (
    <>
    <ul>
      <li><Link to='/navi'>네비</Link></li>

    </ul> 
    
    
    {/* <Route path='/navi' 
          component={ 
            (props) => <NavigationLogin {...props} name={ name }/>
            } exact={ true } />

            <hr />
            <NavigationLogout />
            <hr />
            <NavigationDiary /> */}
    <Route parh='someus/private' component={ MyDiaryList } exact={true} />
    <Route path='/someus/share/grouplist' component={GroupList} exact={true}/>
    <Route path='/someus/share/:shareroomid/:createddt' component={ ShareDiaryDetail } exact={true}/>
    <Route path='/someus/share/write' component={ GroupDiaryWrite } exact={true}/>
    <Route path='/someus/share/groupsharelist' component={ GroupShareList } exact={true}/>
    <Route path='/someus/addgroup' component={ AddGroup } exact={true}/>
    </>
  );
}

export default App;
