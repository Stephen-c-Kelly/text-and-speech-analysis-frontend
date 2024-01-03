const listEl = document.querySelector('.speech-list')
const detailEl = document.querySelector('.speech-detail')
const editBtnEl = document.querySelector('.edit-save')

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

const toggleEdit = () => {
  if (window.location.pathname.includes('speech.html')) {
    // cached element references for speech.html page
    const speechTitleEl = document.querySelector(`h1`)
    const speechNameEl = document.querySelector('.name')
    const speechDateEl = document.querySelector('.date')
    const speechTextEl = document.querySelector('.text')
    

    // save/edit button toggle
    if (editBtnEl.innerHTML === 'Edit') {
      editBtnEl.innerHTML = 'Save'
      let title = speechTitleEl.innerText
      console.log(`title is `, title)
      let name = speechNameEl.innerText
      let date = speechDateEl.innerText
      let text = speechTextEl.innerText

      speechTitleEl.innerHTML = `<textarea id="editTitle">${title}</textarea>`

      speechNameEl.innerHTML= `<textarea id="speechNameEl">${name}</textarea>`
      speechDateEl.innerHTML= `<textarea id="speechDateEl">${date}</textarea>`
      speechTextEl.innerHTML= `<textarea id="speechTextEl">${text}</textarea>`
    
      
      

      // additional styling can go here

    } else {
      editBtnEl.innerHTML = 'Edit'
      //additional styling can go here
      
      // call PUT to save 

    }
  }
}


// Click Events
editBtnEl.addEventListener('click', toggleEdit)
