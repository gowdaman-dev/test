import * as google from "@google-cloud/text-to-speech";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req, res) {
    const client = new google.TextToSpeechClient();
    const request = {
        input: {text: "utsdvjjy  r7iryjf  rhi76 kfj"},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
      const [response] = await client.synthesizeSpeech(request);
      console.log(response);
      return new NextResponse(90)
};
export const config = {
    api: {
        responseLimit: '20mb',
    },
}