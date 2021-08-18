<script>
    import {HSplitPane} from 'svelte-split-pane';
    import Button, {Label} from '@smui/button';
    import {FlatToast, ToastContainer} from "svelte-toasts";
    import {onMount} from 'svelte';
    import JSONEditor from 'jsoneditor';

    const tabs = ['Plotly', 'JSON'];

    let jsonEditorElement;
    let jsonEditor;

    onMount(() => {
        jsonEditor = new JSONEditor(jsonEditorElement, {
            mode: 'code',
            onValidate: function(json) {
                plot();
            },
        });
    });

    function formatJson() {
        if (!jsonEditor) {
            return;
        }
        jsonEditor.setText(JSON.stringify(jsonEditor.get(), null, 2));
    }

    function plot() {
        if (!jsonEditor) {
            return;
        }
        Plotly.newPlot('plotly-container', jsonEditor.get());
    }

</script>

<style>
    .main-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .toolbar {
        margin-bottom: 0.3em;
    }

    .content {
        border-top: solid 1px lightgray;
        flex-grow: 1;
    }

    .json-editor {
        width: 100%;
        height: 100%;
    }

    .plotly-container {
    }
</style>

<div class="main-container">
    <div class="toolbar">
        <Button variant="raised" on:click={() => formatJson()}>
            <Label>Format JSON</Label>
        </Button>
        <Button variant="raised" on:click={() => plot()}>
            <Label>Plot</Label>
        </Button>
    </div>
    <div class="content">
        <HSplitPane leftPaneSize="400px" minLeftPaneSize="250px">
            <left slot="left">
                <div bind:this={jsonEditorElement} id="json-editor" class="json-editor"></div>
            </left>
            <right slot="right">
                <div id="plotly-container" class="plotly-container">

                </div>
            </right>
        </HSplitPane>
    </div>

    <ToastContainer placement="bottom-center" theme="light" showProgress={true} let:data={data}>
        <FlatToast {data}/>
    </ToastContainer>
</div>
