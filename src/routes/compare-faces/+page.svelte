<script lang="ts">
    import { checkUser } from "$lib/services/rekognition";
    import { imageToBits } from "$lib/utils/imageToBits";

    let sourceFile: File;
    let targetFile: File;

    let sourceUint8: Uint8Array;
    let targetUint8: Uint8Array;

    let data: any;
    let similarity: number;

    let sourceImage: HTMLImageElement;
    let targetImage: HTMLImageElement;

    async function setSourceFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files as FileList;

        const file = files[0];
        if (!file) return;

        sourceUint8 = await imageToBits(file);

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

        targetUint8 = await imageToBits(file);

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
        <img src={sourceFile && URL.createObjectURL(sourceFile)} alt=""/>
    <div>
        <label for="image2">Image 2</label>
        <input type="file" 
        on:change={ async (e) => {
            await setTargetFile(e);
        }}/>
    </div>
        <img src={targetFile && URL.createObjectURL(targetFile)} alt="" />
    <div>
    <button
    on:click={
        async () => {
            if (!sourceFile || !targetFile) return;
            data = await checkUser(sourceUint8, targetUint8);
            similarity = data[0].Similarity;}}>Compare</button>
        <p>Similarity: {similarity}</p>
    </div>
</div>

<style>
    div {
        margin: 20px;
    }
    img {
        max-width: 150px;
        max-height: 150px;
    }
</style>