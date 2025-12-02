async function createTableHeader(table) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  ["S.No", "Countries", "Continent", "Capital", "Abbreviation"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);
}

async function createTableRow(table, row, i) {
  const tr = document.createElement("tr");

  const cells = [
    i,
    row.country,
    row.continent,
    row.capital,
    row.abbreviation
  ];

  cells.forEach(val => {
    const td = document.createElement("td");
    td.textContent = val;
    tr.appendChild(td);
  });

  table.appendChild(tr);
}

async function createTable(jsonURL) {
  const response = await fetch(jsonURL);
  const json = await response.json();
  console.log("=====JSON=====", json);

  const table = document.createElement("table");
  table.classList.add("countries-table");

  await createTableHeader(table);

  // Use json.data if your JSON is { "data": [ ... ] } or json directly if array
  const dataArray = json.data || json;
  dataArray.forEach((row, i) => {
    createTableRow(table, row, i + 1);
  });

  return table;
}

export default async function decorate(block) {
  const countriesLink = block.querySelector('a[href$=".json"]');
  if (!countriesLink) return;

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("countries-block");

  parentDiv.append(await createTable(countriesLink.href));

  countriesLink.replaceWith(parentDiv);
}
