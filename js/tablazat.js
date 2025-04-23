const defaultData = [
    { name: "Kiss Anna", age: 22, city: "Budapest", email: "anna.kiss@gmail.com" },
    { name: "Nagy Péter", age: 34, city: "Debrecen", email: "peter.nagy@gmail.com" },
    { name: "Szabó Petra", age: 29, city: "Szeged", email: "petra.szabo@gmail.com" },
    { name: "Tóth Bence", age: 41, city: "Pécs", email: "bence.toth@gmail.com" }
  ];
  
  let data = [...defaultData];
  let sortDirection = 1;
  
  const form = document.getElementById("dataForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const searchInput = document.getElementById("searchInput");
  
  form.addEventListener("submit", function (e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const age = parseInt(document.getElementById("age").value);
      const city = document.getElementById("city").value.trim();
      const email = document.getElementById("email").value.trim();
      const editIndex = document.getElementById("editIndex").value;
  
      if (!name || !city || !email || isNaN(age)) return;
  
      const newData = {name, age, city, email};
  
      if (editIndex == "") {
          data.push(newData);
      } else {
          data[editIndex] = newData;
          document.getElementById("editIndex").value = "";
      }
      form.reset();
      renderTable();
  });
  
  function renderTable() {
      tableBody.innerHTML = "";
      const filter = searchInput.value.toLowerCase();
  
      data
      .filter(row =>
          Object.values(row).some(val=>
              val.toString().toLowerCase().includes(filter)
          )
      )
      .forEach((row, index)=> {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.city}</td>
          <td>${row.email}</td>
          <td class="buttonhold">
              <button class="editbutton" onclick="editRow(${index})">Szerkesztés</button>
              <button class="deletebutton" onclick="deleteRow(${index})">Törlés</button>
          </td>
          `;
          tableBody.appendChild(tr);
      });
  }
  
  function editRow(index) {
      const row = data[index];
      document.getElementById("name").value = row.name;
      document.getElementById("age").value = row.age;
      document.getElementById("city").value = row.city;
      document.getElementById("email").value = row.email;
      document.getElementById("editIndex").value = index;
  }
  
  function deleteRow(index) {
      if (confirm("Biztosan törlöd ezt az adatot?")) {
          data.splice(index, 1);
          renderTable();
      }
  }
  
  searchInput.addEventListener("input", renderTable);
  
  document.querySelectorAll("th[data-column]").forEach((th) => {
      th.addEventListener("click", () => {
          const column = th.dataset.column;
          data.sort((a, b) => {
              if (a[column] < b[column]) return -1 * sortDirection;
              if (a[column] > b[column]) return 1 * sortDirection;
              return 0;
          });
          sortDirection *= -1;
          renderTable();
      });
  });
  
  window.addEventListener("DOMContentLoaded", renderTable);