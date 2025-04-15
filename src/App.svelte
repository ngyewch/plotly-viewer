<script lang="ts">
    import {Pane, Splitpanes} from 'svelte-splitpanes';
    import Button, {Label} from '@smui/button';
    import toast, {Toaster} from 'svelte-5-french-toast';
    import Plotly from 'plotly.js';
    import {JSONEditor} from 'svelte-jsoneditor';

    let content: any = {
        json: {},
    };

    function plot() {
        if ('json' in content) {
            doPlot(content.json);
        } else if ('text' in content) {
            try {
                doPlot(JSON.parse(content.text));
            } catch (e) {
                // do nothing
            }
        } else {
            doPlot({});
        }
    }

    function doPlot(json: any) {
        return Plotly.newPlot('plotly-container', json)
            .then(() => [])
            .catch(e => {
                toast.error(`Invalid plot: ${e}`);
            });
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
</style>

<Toaster />

<div class="main-container">
    <div class="toolbar">
        <Button variant="raised" onclick={() => plot()}>
            <Label>Plot</Label>
        </Button>
    </div>
    <div class="content">
        <Splitpanes horizontal={false}>
            <Pane minSize={25}>
                <JSONEditor bind:content={content} />
            </Pane>
            <Pane>
                <div id="plotly-container" class="plotly-container"></div>
            </Pane>
        </Splitpanes>
    </div>
</div>
