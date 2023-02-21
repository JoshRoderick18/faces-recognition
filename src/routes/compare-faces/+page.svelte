<script lang="ts">
    import { checkUser } from "$lib/services/rekognition";
    import { jpegtobits } from "$lib/utils/jpegtobits";
	import { bind } from "svelte/internal";

    let sourceFile: File;
    let targetFile: File;

    let sourceUint8: Uint8Array;
    let targetUint8: Uint8Array;

    let data: any;
    let result: any = {};
    let similarity: number;

    async function setSourceFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files as FileList;

        const file = files[0];
        if (!file) return;

        sourceUint8 = await jpegtobits(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            sourceFile = file;
        };
    }

    async function setTargetFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files as FileList;

        const file = files[0];
        if (!file) return;

        targetUint8 = await jpegtobits(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            targetFile = file;
        };
    }

</script>

<div>
    <h1>Compare Faces</h1>
    <p>Upload two images to compare the faces in them.</p>
    <div>
        <label for="image1">Image 1</label>
        <input type="file" 
        on:change={ async (e) => {
            await setSourceFile(e);
        }}/>
    </div>
    <div>
        <label for="image2">Image 2</label>
        <input type="file" 
        on:change={ async (e) => {
            await setTargetFile(e);
        }}/>
    </div>
    <button
    on:click={
        async () => {
            if (!sourceFile || !targetFile) return;
            data = await checkUser(sourceUint8, targetUint8);
        }
    }>Compare</button>

<div>

    {#await data}
        <p>Waiting for results...</p>
        {#if data.FaceMatches && data.FaceMatches.length > 0}
            <div>
                <p>Similarity: {JSON.stringify(data.FaceMatches[0])}</p>
            </div>
        {:else}
            <p>No matches found.</p>
        {/if}
    {/await}

</div>

</div>


<style>
    div {
        margin: 20px;
    }
</style>