declare module 'svelte-split-pane' {
    import {SvelteComponent} from 'svelte';

    export class HSplitPane extends SvelteComponent<{}, {}, {
        'left': {},
        'right': {},
    }> {}
}
