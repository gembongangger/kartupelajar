import { browser } from '$app/environment';

let segmenter: any = null;
let loadPromise: Promise<void> | null = null;

const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite';

export function supportsMediaPipe(): boolean {
	return browser && typeof document !== 'undefined' && typeof HTMLCanvasElement !== 'undefined';
}

export function isLoading(): boolean {
	return loadPromise !== null && segmenter === null;
}

async function loadSegmenter(): Promise<void> {
	if (segmenter) return;
	if (loadPromise) return loadPromise;

	loadPromise = (async () => {
		const { ImageSegmenter, FilesetResolver } = await import('@mediapipe/tasks-vision');

		const wasmFileset = await FilesetResolver.forVisionTasks(WASM_URL);

		segmenter = await ImageSegmenter.createFromOptions(wasmFileset, {
			baseOptions: {
				modelAssetPath: MODEL_URL,
				delegate: 'GPU'
			},
			runningMode: 'IMAGE',
			outputCategoryMask: true,
			outputConfidenceMasks: false
		});
	})();

	await loadPromise;
}

export async function replaceBackground(
	file: File,
	bgColor: string = '#FF0000'
): Promise<Blob> {
	if (!browser) throw new Error('Cannot process image on server');

	await loadSegmenter();

	const img = await createImageBitmap(file);

	const maxSize = 500;
	let w = img.width;
	let h = img.height;
	if (w > maxSize || h > maxSize) {
		const ratio = maxSize / Math.max(w, h);
		w = Math.round(w * ratio);
		h = Math.round(h * ratio);
	}

	const inputCanvas = document.createElement('canvas');
	inputCanvas.width = w;
	inputCanvas.height = h;
	const inputCtx = inputCanvas.getContext('2d')!;
	inputCtx.drawImage(img, 0, 0, w, h);
	img.close();

	const result = segmenter.segment(inputCanvas);
	const mask = result.categoryMask!;
	const rawMask = mask.getAsUint8Array();

	const maskCanvas = document.createElement('canvas');
	maskCanvas.width = mask.width;
	maskCanvas.height = mask.height;
	const maskCtx = maskCanvas.getContext('2d')!;
	const maskImgData = maskCtx.createImageData(mask.width, mask.height);
	const maskPixels = maskImgData.data;
	for (let i = 0; i < rawMask.length; i++) {
		const v = rawMask[i] * 255;
		maskPixels[i * 4] = v;
		maskPixels[i * 4 + 1] = v;
		maskPixels[i * 4 + 2] = v;
		maskPixels[i * 4 + 3] = 255;
	}
	maskCtx.putImageData(maskImgData, 0, 0);

	const personCanvas = document.createElement('canvas');
	personCanvas.width = w;
	personCanvas.height = h;
	const personCtx = personCanvas.getContext('2d')!;
	personCtx.drawImage(inputCanvas, 0, 0);
	personCtx.globalCompositeOperation = 'destination-in';
	personCtx.imageSmoothingEnabled = true;
	personCtx.drawImage(maskCanvas, 0, 0, w, h);

	const outputCanvas = document.createElement('canvas');
	outputCanvas.width = w;
	outputCanvas.height = h;
	const outputCtx = outputCanvas.getContext('2d')!;
	outputCtx.fillStyle = bgColor;
	outputCtx.fillRect(0, 0, w, h);
	outputCtx.drawImage(personCanvas, 0, 0);

	return new Promise((resolve) => {
		outputCanvas.toBlob(
			(blob) => resolve(blob!),
			'image/jpeg',
			0.8
		);
	});
}
