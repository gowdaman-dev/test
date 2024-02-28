export async function Tts(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Matthijs/mms-tts-eng",
        {
            headers: { Authorization: "Bearer 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"},
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}