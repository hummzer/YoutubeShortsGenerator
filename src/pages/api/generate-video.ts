import { spawn } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: 'Video URL is required' });
  }

  const pythonScriptPath = path.join(process.cwd(), 'src/python_scripts', 'wales.py');

  const pythonProcess = spawn('python3', [pythonScriptPath, '-u', videoUrl]);

  let scriptOutput = '';
  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ message: 'Python script failed', details: scriptOutput });
    }
    res.status(200).json({ message: 'Video generation started', output: scriptOutput });
  });
}