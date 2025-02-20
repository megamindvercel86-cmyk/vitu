// import fs from 'fs/promises';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { IncomingForm } from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser to handle multipart/form-data
//   },
// };

// export async function POST(req: Request) {
//   if (req.method !== 'POST') {
//     return new Response(
//       JSON.stringify({ message: 'Method Not Allowed' }),
//       { status: 405 }
//     );
//   }

//   try {
//     // Parse the incoming form data using IncomingForm from formidable
//     const form = new IncomingForm();
//     const formData = await new Promise<any>((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) return reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const resumeFile = formData.files.resume;

//     if (!resumeFile) {
//       return new Response(
//         JSON.stringify({ message: 'No file uploaded.' }),
//         { status: 400 }
//       );
//     }

//     // Generate a unique file name
//     const uniqueFileName = `${uuidv4()}-${resumeFile[0].originalFilename}`;
//     const filePath = path.join(process.cwd(), 'public', 'resume', uniqueFileName);

//     // Move the file to the public/resume directory
//     await fs.rename(resumeFile[0].filepath, filePath);

//     // Generate the public URL for the file
//     const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Fallback for local development
//     const resumeUrl = `${BASE_URL}/resume/${uniqueFileName}`;

//     // Return the resume URL
//     return new Response(JSON.stringify({ url: resumeUrl }), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading resume:', error);
//     return new Response(
//       JSON.stringify({ message: 'Internal Server Error' }),
//       { status: 500 }
//     );
//   }
// }
