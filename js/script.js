const listEl = document.querySelector('.speech-list')
const detailEl = document.querySelector('.speech-detail')

async function getSpeech() {
  try {
  const response = await axios.get('http://localhost:3000/api/speech')
  console.log(`data from axios ${response.data}`)
  return response.data
} catch (error) {
  console.error('getSpeech failed to load:', error)
  }
}
// should return an array of objects with _id, id, title, body

const showSpeechList = async () => {
  const data = await getSpeech()
  data.forEach(speech =>{
    const listItem = document.createElement('li')
    listItem.innerHTML = `
      <a href="html/speech?speechId=${speech._id}"> <h3 class = "speech-detail">${speech.title}</h3> </a>
      <p>Speaker: ${speech.speakerFirstName} ${speech.speakerLastName}</p>
      <p>Date: ${speech.date}</p>
    `;  
    listEl.appendChild(listItem)
  })
    
}
const render = ( ) => {
    showSpeechList()
  }

render()

const showSpeech = async() =>{
}

function getQueryParam(param) {
  urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

const speechId = getQueryParam('speechId')

console.log(speechId)


load the page 


// Click Events
// detailEl.addEventListener('click', loadPage

// (event) =>{
//   const clickedElement = event.target
//   const href = clickedElement.getAttribute('href')
//   showSpeech(href)
// })


console.log(getSpeech())
