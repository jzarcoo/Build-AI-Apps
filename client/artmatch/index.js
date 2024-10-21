
const outputImg = document.getElementById('output-img')

document.getElementById("submit-btn").addEventListener("click", () => {
    const prompt = document.getElementById("instruction").value
    generateImage(prompt)
})

async function generateImage(prompt) {
    try {
        // mandar el prompt al servidor y devolver la imagen
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        })

        const result = await response.json()
        console.log(result)

        outputImg.innerHTML = `<img src="${result.image}">`
    } catch (err) {
        console.log('Error:'.err)
        outputImg.innerHTML = 'Unable to access AI. Please refresh and try again'
    }
}