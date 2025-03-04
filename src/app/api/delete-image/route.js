import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { publicId } = await req.json(); // Extract publicId from request body

    if (!publicId) {
      return Response.json({ error: "Public ID is required" }, { status: 400 });
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return Response.json({ error: "Image deletion failed" }, { status: 500 });
    }

    return Response.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
