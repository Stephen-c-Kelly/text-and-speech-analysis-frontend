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

// axios functions

async function getSpeech() {
  try {
  const response = await axios.get('http://localhost:3000/api/speech')
  return response.data
} catch (error) {
  console.error('getSpeech failed to load:', error)
  }
}

const getSpeechById = async (id) => {
  try {
  const response = await axios.get(`http://localhost:3000/api/speech/${id}`)
  // console.log(`response from get by id is here:`, response)
  return response
} catch (error) {
  console.error('getSpeechById failed, error:', error)
  }
}

const putSpeech = async () => {
  const savedSpeechEl = document.querySelector(`.savedMsg`)
  try {
    let payload = {}
    const speechId = new URLSearchParams(window.location.search).get('speechId');

    payload.title = document.querySelector('#editTitle').value
    payload.firstName = document.querySelector('#speechNameEl').value.split(" ")[0];
    payload.lastName = document.querySelector('#speechNameEl').value.split(" ")[1];
    console.log(payload.firstName)
    payload.date = document.querySelector('#speechDateEl').value;
    payload.text = document.querySelector('#speechTextEl').value;
    const response = await axios.put(`http://localhost:3000/api/speech/${speechId}`, payload)
    showSpeech()
    
   
  } catch (error) {
    console.log(`we had an error`, error);
  }
}

const newSpeech = async () => {
  console.log(`start of new speech`)
  try {
    let payload = {}
    payload.title = document.querySelector('#editTitle').value
    payload.speakerFirstName = document.querySelector('#speechNameEl').value.split(" ")[0];
    payload.speakerLastName = document.querySelector('#speechNameEl').value.split(" ")[1];
    console.log(`first last name:`, payload.firstName, payload.lastName)
    payload.date = document.querySelector('#speechDateEl').value;
    payload.text = document.querySelector('#speechTextEl').value;
    console.log(`new speech payload:`, payload)
    const response = await axios.post(`http://localhost:3000/api/speech`, payload)
    
    addSavedMessage()
    console.log(`speech added successfully `, response)
    
   
  } catch (error) {
    console.log(`we had an error`, error);
  }

  }

  const deleteSpeech = async () => {
    const confirmDeletion = confirm('Are you sure you want to delete this item? You will be redirected to the homepage.');
    if (confirmDeletion) {
      const speechId = new URLSearchParams(window.location.search).get('speechId');
      console.log(`id to delete is:`, speechId)
      const response = await axios.delete(`http://localhost:3000/api/speech/${speechId}`)
      console.log('Item deleted');
      window.location.href = '/html'
      // addDeleteMessage()
    } else {
      console.log('Deletion cancelled');
    }
  };



// displaying content 
const showSpeechList = async () => {
if (window.location.pathname.endsWith('/html/')) { 
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
    const data = await getSpeechById(speechId)
    // console.log(`content from id in url:`,data)
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
    
    // split name into first and last
    const fullName = speechNameEl.innerText
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
