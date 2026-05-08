import fs from "fs";
import path from "path";
//#region src/lib/server/photo.ts
function fileToBlobValue(buffer) {
	return new Uint8Array(buffer);
}
function photoValueToBuffer(value) {
	if (!value) return null;
	if (Buffer.isBuffer(value)) return value;
	if (value instanceof Uint8Array) return Buffer.from(value);
	if (value instanceof ArrayBuffer) return Buffer.from(value);
	if (typeof value === "string") {
		const base64 = value.startsWith("data:") ? value.split(",")[1] : value;
		if (!base64) return null;
		try {
			return Buffer.from(base64, "base64");
		} catch {
			return null;
		}
	}
	return null;
}
function getDefaultPhotoBuffer() {
	const defaultPath = path.join("static", "foto", "default.jpg");
	if (!fs.existsSync(defaultPath)) return null;
	return fs.readFileSync(defaultPath);
}
function imageMimeFromFile(file) {
	if (file.type) return file.type;
	const lowerName = file.name.toLowerCase();
	if (lowerName.endsWith(".png")) return "image/png";
	if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) return "image/jpeg";
	return "application/octet-stream";
}
function imageFormatFromBuffer(buffer) {
	if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	]))) return "PNG";
	if (buffer.length >= 3 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return "JPEG";
	return null;
}
//#endregion
export { photoValueToBuffer as a, imageMimeFromFile as i, getDefaultPhotoBuffer as n, imageFormatFromBuffer as r, fileToBlobValue as t };
