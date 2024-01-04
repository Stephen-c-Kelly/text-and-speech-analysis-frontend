

  // axios functions

async function getSpeech() {
  try {
  const response = await axios.get('https://text-and-speech-analysis-0a793b931976.herokuapp.com/api/speech')
  return response.data
} catch (error) {
  console.error('getSpeech failed to load:', error)
  }
}

const getSpeechById = async (id) => {
  try {
  const response = await axios.get(`https://text-and-speech-analysis-0a793b931976.herokuapp.com/api/speech/${id}`)
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
    // nameParse() needed here
    payload.firstName = document.querySelector('#speechNameEl').value.split(" ")[0];
    payload.lastName = document.querySelector('#speechNameEl').value.split(" ")[1];
    
    payload.date = document.querySelector('#speechDateEl').value;
    payload.text = document.querySelector('#speechTextEl').value;
    const response = await axios.put(`https://text-and-speech-analysis-0a793b931976.herokuapp.com/api/speech/${speechId}`, payload)
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
    // nameParse() needed here
    payload.speakerFirstName = document.querySelector('#speechNameEl').value.split(" ")[0];
    payload.speakerLastName = document.querySelector('#speechNameEl').value.split(" ")[1];
    // console.log(`first last name:`, payload.firstName, payload.lastName)
    payload.date = document.querySelector('#speechDateEl').value;
    payload.text = document.querySelector('#speechTextEl').value;
    console.log(`new speech payload:`, payload)
    const response = await axios.post(`https://text-and-speech-analysis-0a793b931976.herokuapp.com/api/speech`, payload)
    
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
      const response = await axios.delete(`https://text-and-speech-analysis-0a793b931976.herokuapp.com/api/speech/${speechId}`)
      console.log('Item deleted');
      window.location.href = '/html'
      // addDeleteMessage()
    } else {
      console.log('Deletion cancelled');
    }
  };


  export {
    getSpeech,
    getSpeechById,
    putSpeech,
    newSpeech,
    deleteSpeech
  }

  