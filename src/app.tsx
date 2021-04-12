// @ts-nocheck
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.css";
import { Page2 } from "./pages/page-2";
import { Page1 } from "./pages/page-1";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/page-2">
            <Page2 />
          </Route>
          <Route path="/">
            <Page1 />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
