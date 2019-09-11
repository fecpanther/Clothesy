const React = require("react");
const { Provider } = require("react-redux");
const store = require("../../store");
//const OmniContainer = require("./containers/OmniContainer.jsx");
const OmniContainer = require("./components/Omni.jsx");
let App = () => {
  return (
    <Provider store={store}>
      <OmniContainer></OmniContainer>
    </Provider>
  );
};

module.exports = App;
