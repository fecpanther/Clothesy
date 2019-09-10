const React = require("react");
const { Provider } = require("react-redux");
const store = require("../../store");
const OmniContainer = require("./containers/OmniContainer.jsx");
const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
// const Link = require("react-router-dom").Link;
const Router = require("react-router-dom").Router;

let App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Route
          path="/"
          // component={OmniContainer}
          // render={props => <About {...props} extra={someVariable} />}
          render={props => <OmniContainer {...props} id={4} />}
        ></Route> */}
        <Route
          path={"/:id"}
          // component={OmniContainer}
          // render={props => <About {...props} extra={someVariable} />}
          render={props => <OmniContainer {...props} />}
        ></Route>
      </BrowserRouter>
      {/* <OmniContainer productId={1} /> */}
      {/* </Router> */}
    </Provider>
  );
};

module.exports = App;
