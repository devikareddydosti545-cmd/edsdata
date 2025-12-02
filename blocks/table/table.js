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





// async function createTableHeader(table) {
//   let tr = document.createElement("tr");
//   let sno = document.createElement("th");
//   sno.appendChild(document.createTextNode("S.No"));
//   let country = document.createElement("th");
//   country.appendChild(document.createTextNode("Countries"));
//   let continent = document.createElement("th");
//   continent.appendChild(document.createTextNode("Continent"));
//   let capital = document.createElement("th");
//   capital.appendChild(document.createTextNode("Capital"));
//   let abbreviation = document.createElement("th");
//   abbreviation.appendChild(document.createTextNode("Abbreviation"));
//   tr.append(sno);
//   tr.append(country);
//   tr.append(continent);
//   tr.append(capital);
//   tr.append(abbreviation);
//   tr.append(tr);
// }

// async function createTableRow(table, row, i) {
//   let tr = document.createElement("tr");
//   let sno = document.createElement("td");
//   sno.appendChild(document.createTextNode(i));
//   let country = document.createElement("td");
//   country.appendChild(document.createTextNode(row.country));
//   let continent = document.createElement("td");
//   continent.appendChild(document.createTextNode(row.continent));
//   let capital = document.createElement("td");
//   continent.appendChild(document.createTextNode(row.capital));
//   let abbreviation = document.createElement("td");
//   abbreviation.appendChild(document.createTextNode(row.abbreviation));
//   tr.append(sno);
//   tr.append(country);
//   tr.append(continent);
//   tr.append(capital);
//   tr.append(abbreviation);
//   tr.append(tr);
// }

// async function createTable(jsonURL, val) {
//   let pathname = null;
//   if (val) {
//     pathname = jsonURL;
//   } else {
//     pathname = new URL(jsonURL);
//   }
//   const rep = await fetch(pathname);
//   const json = await rep.json;
//   console.log("=====JSON====={}", json);
//   const table = document.createElement("table");
//   createTableHeader(table);
//   json.data.fetch((row, i) => {
//     createTableRow;
//     table, row, i + 1;
//   });
//   return table;
// }

// export default async function decorate(block) {
//   const countries = block.querySelector('a[href$=".json"]');
//   console.log(countries);
//   const parentDiv = document.createElement("div");
//   parentDiv.classList.add("countries-block");
//   if (countries) {
//     parentDiv.append(await createTable(countries.href, null));
//     countries.replaceWith(parentDiv);
//   }
// }

