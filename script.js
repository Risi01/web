document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("addForm");
  const modifySection = document.getElementById("modifySection");
  const dataView = document.getElementById("dataView");

  const getData = () => JSON.parse(localStorage.getItem("data") || "[]");

  const saveData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  if (addForm) {
    addForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const value = document.getElementById("value").value;
      const data = getData();
      data.push({ name, value });
      saveData(data);
      alert("Data added!");
      addForm.reset();
    };
  }

  if (dataView) {
    const data = getData();
    dataView.innerHTML = data.map(d => `<p>${d.name}: ${d.value}</p>`).join('');
  }

  if (modifySection) {
    const data = getData();
    modifySection.innerHTML = data.map((d, i) => `
      <input type="text" value="${d.name}" id="name${i}">
      <input type="number" value="${d.value}" id="value${i}">
      <button onclick="save(${i})">Save</button><br>
    `).join('');
  }
});

function save(index) {
  const data = JSON.parse(localStorage.getItem("data") || "[]");
  data[index].name = document.getElementById("name" + index).value;
  data[index].value = document.getElementById("value" + index).value;
  localStorage.setItem("data", JSON.stringify(data));
  alert("Data updated!");
}
