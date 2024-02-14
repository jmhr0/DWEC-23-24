document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const doc = { nombre, apellido };
  
    const response = await fetch('/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
  
    const result = await response.json();
    console.log('Inserted document:', result);
    getDocuments();
  });
  
  async function getDocuments() {
    const response = await fetch('/documents');
    const docs = await response.json();
    displayDocuments(docs);
  }
  
  function displayDocuments(docs) {
    const docList = document.getElementById('docList');
    docList.innerHTML = '';
    docs.forEach((doc) => {
      const li = document.createElement('li');
      li.textContent = `${doc.nombre} ${doc.apellido}`;
      docList.appendChild(li);
    });
  }
  
  getDocuments();
  