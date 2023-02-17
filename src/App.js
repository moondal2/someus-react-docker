import { Route } from 'react-router-dom';
import GroupList from './share_diary/GroupList';
import GroupShareList from './share_diary/GroupShareList';
import ShareDiaryDetail from './share_diary/GroupShareDetail';
import MyDiaryWrite from './private_diary/MyDiaryWrite';
import AddGroup from './share_diary/AddGroup'
import MyDiaryList from './private_diary/MyDiaryList';
import Regist from './regist/Regist.js'
import Loginpage from './login/Loginpage';
import GroupDiaryWrite from './share_diary/GroupDiaryWrite'

function App() {

  let name = "김초원";

  return (
    <>
      <Route path='/someus/share/grouplist' component={ (props) => <GroupList {...props} name={ name } /> } exact={true} />
      <Route path='/someus/share/write' component={ (props) => <GroupDiaryWrite {...props} name={ name } /> } exact={true} />
      <Route path='/someus/share/:shareroomid/:createddt' component={ (props) => <ShareDiaryDetail {...props} name={ name } /> } exact={true} />
      <Route path='/someus/share/groupsharelist' component={ (props) => <GroupShareList {...props} name={ name } /> } exact={true} />
      <Route path='/someus/addgroup' component={ (props) => <AddGroup {...props} name={ name } /> } exact={true} />
      

      <Route parh='/someus/private' component={(props) => <MyDiaryList {...props} name={name} />} exact={true} />
      <Route path='/someus/private/write' component={ (props) => <MyDiaryWrite {...props} name={ name } /> } exact={true} />
      {/* <Route path='/someus/private/:diaryid' component={ (props) => <MyDiaryDetail {...props} name={ name } /> } exact={true} /> */}
      {/* <Route path='/someus/private' component={MyDiaryList} exact={true} /> */}

      <Route path="/someus/regist" component={Regist} exact={true} />
      <Route path="/someus/login" component={Loginpage} exact={true} />
      {/* 
    <Route path='/navi' 
          component={ 
            (props) => <NaviDiary {...props} name={ name }/>
            } exact={ true } /> */}
    
    </>
  );
}

export default App;
