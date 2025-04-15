const code = "V86G4Lass228";

document.getElementById("ajaxForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();
  
    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
      alert("Minden mező kitöltése kötelező, max 30 karakterrel!");
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("code", code);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);
  
    if (id !== "") {
      formData.append("op", "update");
      formData.append("id", id);
      sendRequest(formData, "Frissítés sikeres.");
    } else {
      formData.append("op", "create");
      sendRequest(formData, "Hozzáadás sikeres.");
    }
  
    document.getElementById("ajaxForm").reset();
    document.getElementById("id").value = "";
  });
  
  function sendRequest(formData, successMsg) {
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert(successMsg);
        getData();
      });
  }
  
  function getData() {
    const formData = new URLSearchParams();
    formData.append("op", "read");
    formData.append("code", code);
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        const output = document.getElementById("output");
        let heights = [];
        output.innerHTML = `
            <h3>Adatok:</h3>
            <table id="ajaxTable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Magasság</th>
                    <th>Tömeg</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
            `;

            const tbody = output.querySelector("tbody");

            data.list.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.height}</td>
                <td>${item.weight}</td>
            `;
            tbody.appendChild(tr);
            heights.push(parseInt(item.height))
            });
  
        if (heights.length > 0) {
          const sum = heights.reduce((a, b) => a + b, 0);
          const avg = (sum / heights.length).toFixed(2);
          const max = Math.max(...heights);
  
          document.getElementById("summary").innerHTML = `
            <p>Összmagasság: ${sum} cm</p>
            <p>Átlagmagasság: ${avg} cm</p>
            <p>Legnagyobb: ${max} cm</p>
          `;
        } else {
          document.getElementById("summary").innerHTML = "<p>Nincs adat.</p>";
        }
      });
  }
  
  function deleteData() {
    const id = document.getElementById("deleteId").value.trim();
    if (!id) {
      alert("Add meg a törlendő ID-t!");
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("op", "delete");
    formData.append("id", id);
    formData.append("code", code);
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert("Törlés sikeres.");
        document.getElementById("deleteId").value = "";
        getData();
      });
  }
  
  function getDataForId() {
    const id = document.getElementById("getIdInput").value.trim();
    if (!id) {
      alert("Add meg az ID-t!");
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("op", "read");
    formData.append("code", code);
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        const numericId = parseInt(id);
        const found = data.list.find(item => parseInt(item.id) === numericId);
        if (found) {
          document.getElementById("id").value = found.id;
          document.getElementById("name").value = found.name;
          document.getElementById("height").value = found.height;
          document.getElementById("weight").value = found.weight;
          alert("Adatok betöltve szerkesztéshez.");
        } else {
          alert("Nem található ilyen ID.");
        }
        document.getElementById("getIdInput").value = "";
      });
  }