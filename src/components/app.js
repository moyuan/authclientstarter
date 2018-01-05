import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import Welcome from './welcome';
import RequireAuth from './auth/require_auth';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Welcome} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/feature" component={RequireAuth(Feature)} />
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Header />
//         <Route exact path="/" render={() => <div>Page Landing</div>} />
//         <Route path="/sign-in" component={Signin} />
//         <Route path="/sign-up" render={() => <div>Page Sign-up</div>} />
//       </div>
//     );
//   }
// }
// export default App;
