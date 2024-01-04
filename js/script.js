import {
  getSpeech,
  getSpeechById,
  putSpeech,
  newSpeech,
  deleteSpeech
} from './axios.js'

const listEl = document.querySelector('.speech-list')
const detailEl = document.querySelector('.speech-detail')
const editBtnEl = document.querySelector('.edit-save')
const speechTitleEl = document.querySelector(`h1`)
const speechNameEl = document.querySelector('.name')
const speechDateEl = document.querySelector('.date')
const speechTextEl = document.querySelector('.text')
const uploadSpeechEl = document.querySelector('.upload')
const saveSpeechEl = document.querySelector('.save-speech-button')
const deleteSpeechEl = document.querySelector('.delete')



// displaying content 
const showSpeechList = async () => {
if (window.location.pathname.endsWith('.app') || window.location.pathname.endsWith(5500)) { 
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
    const result = await getSpeechById(speechId)
    // console.log(`content from id in url:`,data)
    speechTitleEl.innerHTML = result.data.title
    speechNameEl.innerHTML = `${result.data.speakerFirstName} ${result.data.speakerLastName}`
    speechDateEl.innerHTML = result.data.date
    speechTextEl.innerHTML = result.data.text
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
    
    // split name into first and last
    const fullName = speechNameEl.innerText
    // nameParse() needed here
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    let title = speechTitleEl.innerText
    console.log(`title is `, title)
    let date = speechDateEl.innerText
    let text = speechTextEl.innerText

    // save/edit button toggle
    if (editBtnEl.innerHTML === 'Edit') {
      editBtnEl.innerHTML = 'Save'
    
      speechTitleEl.innerHTML = `<textarea id="editTitle">${title}</textarea>`

      speechNameEl.innerHTML= `<textarea id="speechNameEl">${firstName} ${lastName}</textarea>`
      speechDateEl.innerHTML= `<textarea id="speechDateEl">${date}</textarea>`
      speechTextEl.innerHTML= `<textarea id="speechTextEl">${text}</textarea>`
      // additional styling can go here

    } else {
      putSpeech()
    }
  }
}

const createSpeech = () => {
  // need to change the url so it doesn't confuse people.
  speechTitleEl.innerHTML = `<textarea id="editTitle" placeholder="Speech Title"></textarea>`;
  speechNameEl.innerHTML = `<textarea id="speechNameEl" placeholder="First Last"></textarea>`;
  speechDateEl.innerHTML = `<textarea id="speechDateEl" placeholder="YYYY-MM-DD"></textarea>`;
  speechTextEl.innerHTML = `<textarea id="speechTextEl" placeholder="Speech Text Goes Here"></textarea>`;
  addSaveButton()
  ;
}

const addSaveButton = () => {
  console.log(`beginning of add save button`)
  const saveButton = document.createElement("button")
  saveButton.textContent="Save"
  saveButton.classList.add("save-speech-button");
  speechTextEl.parentNode.appendChild(saveButton);
  saveButton.addEventListener('click', newSpeech)
}

const addSavedMessage = () => {
  console.log(`beginning of new speech saved message`)
  const message = document.createElement("h2")
  message.textContent="Speech Saved!"
  speechTextEl.parentNode.appendChild(message)
}

const addDeleteMessage = () => {
  console.log(`beginning of deleted speech message`)
  const message = document.createElement("h2")
  message.textContent="Speech Deleted!"
  speechTextEl.parentNode.appendChild(message)
}

// Click Events - Home

// Click Events -- Speech
if (window.location.pathname.includes('speech.html')) {
editBtnEl.addEventListener('click', toggleEdit)
uploadSpeechEl.addEventListener('click', createSpeech)
deleteSpeechEl.addEventListener('click', deleteSpeech)
}
