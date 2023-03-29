import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <Provider store={store}>
        <HashRouter basename={process.env.PUBLIC_URL}>
            <App />
        </HashRouter>
    </Provider>
);
