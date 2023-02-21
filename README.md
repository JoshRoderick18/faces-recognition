# SvelteKit with Vite and Amazon Rekognition

This repository is an example of how to use SvelteKit with Vite and Amazon Rekognition to verify the similarity of two faces.

## Requirements

Before you get started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or higher
- An [AWS](https://aws.amazon.com/) account with access to Amazon Rekognition
- A `.env` file with the following environment variables:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_aws_region
```

## Installation

1. Clone this repository to your machine:

```
git clone https://github.com/JoshRoderick18/faces-recognition.git
```

2. Install the dependencies:

```
cd faces-recognition
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser to http://localhost:{port} to see the application in action.


## Usage

On the main page of the application, you'll find a form with two fields for uploading images. Once you've selected two different face images, click the "Compare Faces" button. The application will use Amazon Rekognition to verify the similarity of the two faces and show you the result on the screen.

## Contributions

If you find a bug or want to improve this application in some way, feel free to contribute! Simply fork the repository, make your changes, and create a pull request. I'll be happy to review it and merge it if appropriate.

## License

This repository is licensed under the [MIT License](LICENSE).
