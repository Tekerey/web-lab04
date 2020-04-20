const table = document.getElementsByTagName('table').item(0);
const tablebody = document.getElementsByTagName('tbody').item(0);
const addButton = document.getElementById('addButton');
const addForm = document.getElementById('newRowForm');
const diagram = document.getElementById('diagramBlock');

createDiagram();

addForm.addEventListener('submit', addRow);

table.addEventListener('click', event => {
    console.log(event.target);
    switch (event.target) {
        case addButton:
            displayAddForm();
            break;
        default:
            if (event.target.nodeName == 'BUTTON') deleteRow(event.target);
            break;
    }
});

function displayAddForm() {
    addForm.style.display = 'block';
    addButton.setAttribute('disabled', 'disabled');
}

function hideAddForm() {
    addForm.style.display = 'none';
    addButton.removeAttribute('disabled');
}

function addRow(event) {
    event.preventDefault();
    const year = document.getElementById('yearInput').value.trim();
    const dtpNum = document.getElementById('dtpInput').value.trim();

    let newRow = document.createElement('tr');
    let button = document.createElement('button');
    button.textContent = 'Видалити';
    let cell1 = document.createElement('td');
    cell1.append(button);
    newRow.append(cell1);
    let cell2 = document.createElement('td');
    cell2.textContent = year + ' рік';
    cell2.setAttribute('contenteditable', 'true');
    newRow.append(cell2);
    let cell3 = document.createElement('td');
    cell3.textContent = dtpNum;
    cell3.setAttribute('contenteditable', 'true');
    newRow.append(cell3);

    tablebody.append(newRow);

    hideAddForm();
    clearDiagram();
    createDiagram();
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
    clearDiagram();
    createDiagram();
}

function clearDiagram() {
    Array.from(diagram.children).forEach(c => c.remove());
}

function createDiagram() {
    const colors = ['red','blue','black','yellow'];
    const max_height = Number.parseFloat(getComputedStyle(diagram).height) - 10;
    const width = Number.parseFloat(getComputedStyle(diagram).width);
    console.log(max_height);

    const rows = Array.from(tablebody.children);

    if (rows.length == 0) return;

    const sortedRows = Array.from(rows).sort((r1,r2) => {
        return r2.children.item(2).textContent - r1.children.item(2).textContent;
    });
    console.log(rows);
    console.log(sortedRows);
    let maxValue = Number.parseInt(sortedRows[0].children.item(2).textContent);
    console.log(maxValue);

    let elementIndex = 0;
    rows.forEach(r => {
        let div = document.createElement('div');
        let value = Number.parseInt(r.children.item(2).textContent);
        div.dataset.value = Number.isNaN(value) ? 0 : value;
        div.style.height = ((value * max_height) / maxValue) + 'px';
        let basis = (100 * (width/rows.length)) / width;
        basis -= 1 * rows.length;
        div.style.flexBasis = basis + '%';
        //console.log(rows.length);
        console.log(div.style.flexBasis);
        div.style.backgroundColor = colors[elementIndex];
        elementIndex == colors.length - 1 ? elementIndex = 0 : elementIndex++;
        diagram.append(div);
    });
}