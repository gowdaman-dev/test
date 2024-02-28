import { NextRequest, NextResponse } from "next/server";
import { getAudioBuffer } from "simple-tts-mp3";
import PdfParse from "pdf-parse/lib/pdf-parse";
export async function POST(req, res) {
    const textdata = await fetch('https://firebasestorage.googleapis.com/v0/b/react-auth-7f1fa.appspot.com/o/edulearn%2FFree_Test_Data_10.5MB_PDF.pdf?alt=media&token=bb8957a7-6740-49c7-8c99-a5c531fe56df')
    const pdf = await textdata.arrayBuffer();
    const text = (await PdfParse(pdf)).text
    try {
        if (text.length > 1500) {
            let textres =''
            let tempinit = 0
            let tempfinal = 1500
            let buffer = []
            let len = text.length
            while(tempfinal <= len){
                console.log(tempfinal, " ",text.charAt(tempfinal) ,'lenth',len )
                const final = text.charAt(tempfinal);
                if(final != ' '){
                    tempfinal++;
                    continue
                }
                if(final == undefined){
                    tempfinal--
                }
                const textbuffer = text.slice(tempinit , tempfinal)
                textres += textbuffer
                const bufferdata = await getAudioBuffer(textbuffer)
                console.log(bufferdata);
                buffer.push(bufferdata)
                console.log(buffer);
                tempinit = tempfinal + 1
                if(tempfinal+1500 >len){
                    tempfinal = len
                    continue
                }
                tempfinal += 1500
            }
            console.log(textres.length);
            console.log(len);
            console.log("final");
            const blob = new Blob(buffer, { type: 'audio/mp3' })
            console.log(blob.size);
            const headers = new Headers();
            headers.set("Content-Type", "audio/mp3");
            console.log(blob.size)
            return new NextResponse(blob, { status: 200, statusText: "OK", headers });
        } else {
            const buffer = await getAudioBuffer(text);
            const blob = new Blob([buffer], { type: 'audio/mp3' })
            const headers = new Headers();
            headers.set("Content-Type", "audio/mp3");
            console.log(blob.size)
            return new NextResponse(blob, { status: 200, statusText: "OK", headers });
        }
        /*const blob = new Blob([buffer], { type: 'audio/mp3' })
        const headers = new Headers();
        headers.set("Content-Type", "audio/mp3");
        console.log(blob.size);*/
        return new NextResponse(89, { status: 200, statusText: "OK", headers });
    } catch (error) {
        console.log(error);
        return new NextResponse({}, { status: 200 })
    }
};