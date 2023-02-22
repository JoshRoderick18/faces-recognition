<script>
	import { showCollectionDetails, showListedCollections } from "$lib/services/rekognition";

</script>
<a href="/compare-faces">Compare faces</a>
<a href="/detect-faces">Detect faces</a>

<button on:click={ async () => {
    showListedCollections();
}}>Show collections</button>

<button on:click={ async () => {
    showCollectionDetails();
}}>Show collection details</button>

<style>
    a {
        display: grid;
        margin: 20px;
    }
</style>