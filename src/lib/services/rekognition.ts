import {
	CompareFacesCommand,
	DescribeCollectionCommand,
	IndexFacesCommand,
	ListCollectionsCommand,
	RekognitionClient,
	type CompareFacesCommandInput,
	type IndexFacesCommandInput,
	type RekognitionClientConfig
} from '@aws-sdk/client-rekognition';

const config: RekognitionClientConfig = {
	region: import.meta.env.VITE_AWS_REGION,
	credentials: {
		accessKeyId: import.meta.env.VITE_REKOGNITION_ACCESS_KEY_ID,
		secretAccessKey: import.meta.env.VITE_REKOGNITION_SECRET_KEY
	}
};

const client = new RekognitionClient(config);

export async function checkUser(sourceImage: Uint8Array, targetImage: Uint8Array) {
	const params: CompareFacesCommandInput = {
		SourceImage: {
			Bytes: sourceImage
		},
		TargetImage: {
			Bytes: targetImage
		},
		SimilarityThreshold: 80
	};

	const compareFaces = new CompareFacesCommand(params);

	const data = await client.send(compareFaces);

	console.log(data);

	return data.FaceMatches;
}

let penguinCollectionName = '';

async function listCollection() {
	const max_results = 3;
	console.log("Mostrando colecciones:");
	let response = await client.send(
	  new ListCollectionsCommand({ MaxResults: max_results })
	);
	let collection_count = 0;
	let done = false;
	while (!done) {
	  const collections = response.CollectionIds;
	  collections!.forEach((collection) => {
		console.log(collection);
		penguinCollectionName = collection;
		collection_count += 1;
	  });
	  if (JSON.stringify(response).includes("NextToken")) {
		const nextToken = response.NextToken;
		response = await client.send(
		  new ListCollectionsCommand({ NextToken: nextToken, MaxResults: max_results })
		);
	  } else {
		done = true;
	  }
	}
	return collection_count;
  };
  
  export async function showListedCollections() {
	const collect_list = await listCollection();
	console.log(collect_list);
	return collect_list;
  }

  interface CollectionDescription {
	CollectionARN: string;
	FaceCount: number;
	FaceModelVersion: string;
	CreationTimestamp: Date;
  }
  
const describeCollection = async (collectionName: string): Promise<CollectionDescription | undefined> => {
	try {
		console.log(`Intentando describir la colección llamada - ${collectionName}`);
		const response = await client.send(new DescribeCollectionCommand({ CollectionId: collectionName }));
		console.log('Colección Arn:');
		console.log(response.CollectionARN);
		console.log('Conteo de caras:');
		console.log(response.FaceCount);
		console.log('Versión del modelo de caras:');
		console.log(response.FaceModelVersion);
		console.log('Timestamp:');
		console.log(response.CreationTimestamp);
		return {
		CollectionARN: response.CollectionARN!,
		FaceCount: response.FaceCount!,
		FaceModelVersion: response.FaceModelVersion!,
		CreationTimestamp: response.CreationTimestamp!,
		};
	} catch (err: any) {
		console.log('Error', err.stack);
		return undefined;
}
};

export const showCollectionDetails = async (collectionName: string = penguinCollectionName): Promise<void> => {
	const collection = await describeCollection(collectionName);
	if (collection) {
		console.log(`Detalles de la colección "${collectionName}":`);
		console.log(collection);
	} else {
		console.log(`No se encontró la colección "${collectionName}".`);
	}
};

export async function uploadPhotoToCollection(sourceImage: Uint8Array, userName: string) {
	try {
		const params: IndexFacesCommandInput = {
			CollectionId: "PenguTalksCollection",
			Image: {
				Bytes: sourceImage
			},
			ExternalImageId: userName,
			DetectionAttributes: ["DEFAULT"],
			MaxFaces: 1
		};

		const indexFaces = new IndexFacesCommand(params);

		const data = await client.send(indexFaces);

		console.log(data);
	} catch (error) {
		console.log('Error while saving the photo', error);
	}
}
  