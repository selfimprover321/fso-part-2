const peopleUrl = 'http://localhost:3001/persons';

const fetchData = async () => {
  try {
    const response = await fetch(peopleUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch data failed:', error);
    throw error;
  }
};

const addPerson = async (personObject) => {
  try {
    const response = await fetch(peopleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personObject),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Add person failed:', error);
    throw error;
  }
};
 
const deleteName = async (id) => {
  try {
    const response = await fetch(`${peopleUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Delete person failed:', error);
    throw error;
  }
};
const editPhoneNumber = async (id, newObject) => {
    try {
      const response = await fetch(`${peopleUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      });
      if (!response.ok) {
        throw new Error('Network error: ' + response.statusText);
      }
      const updatedPerson = await response.json();
      return updatedPerson;
    } catch (error) {
      console.error('Edit person failed:', error);
      throw error;
    }
  };
  

export default {
  fetchData,
  addPerson,
  deleteName,
  editPhoneNumber
};
