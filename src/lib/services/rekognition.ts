import {
	CompareFacesCommand,
	RekognitionClient,
	type CompareFacesCommandInput,
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
