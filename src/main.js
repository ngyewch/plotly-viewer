import App from "./App.svelte";

import 'svelte-material-ui/bare.css';
import 'jsoneditor/dist/jsoneditor.css';

let app = new App({
    target: document.body,
});

export default app;
