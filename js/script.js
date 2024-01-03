const listEl = document.querySelector('.speech-list')
const detailEl = document.querySelector('.speech-detail')
const speechTitleEl = document.querySelector(`h1`)
const speechNameEl = document.querySelector('.name')
const speechDateEl = document.querySelector('.date')
const speechTextEl = document.querySelector('.speech-text')

// axios functions

async function getSpeech() {
  try {
  const response = await axios.get('http://localhost:3000/api/speech')
  // console.log(`data from axios ${response.data}`)
  return response.data
} catch (error) {
  console.error('getSpeech failed to load:', error)
  }
}

const getSpeechById = async (id) => {
  try {
  const response = await axios.get(`http://localhost:3000/api/speech/${id}`)
  console.log(`response from get by id is here:`, response)
  return response
} catch (error) {
  console.error('getSpeechById failed, error:', error)
  }
}
// should return an array of objects with _id, id, title, body

// displaying content 
const showSpeechList = async () => {
  const data = await getSpeech()
  data.forEach(speech =>{
    const listItem = document.createElement('li')
    listItem.innerHTML = `
      <a href="speech.html?speechId=${speech._id}"> <h3 class = "speech-detail">${speech.title}</h3> </a>
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

const showSpeech = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const speechId = urlParams.get('speechId')
  if (speechId) {
    try {
    const data = await getSpeechById(speechId)
    console.log(`content from id in url:`,data)
    speechTitleEl.innerHTML = data.data.title
    speechNameEl.innerHTML = `${data.data.speakerFirstName} ${data.data.speakerLastName}`
    speechDateEl.innerHTML = data.data.date
    speechTextEl.innerHTML = data.data.text
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  else {
    console.log(`speech id not found`)
  }
    
  }
showSpeech()


