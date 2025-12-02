async function createTableHeader(table) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  ["S.No", "Country", "Capital", "Continent", "Abbreviation"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);
}

function createTableRow(table, row, index) {
  const tr = document.createElement("tr");

  const cells = [
    index,
    row.Country || row.country,
    row.Capital || row.capital,
    row.Continent || row.continent,
    row.Abbreviation || row.abbreviation,
  ];

  cells.forEach((val) => {
    const td = document.createElement("td");
    td.textContent = val || "";
    tr.appendChild(td);
  });

  table.appendChild(tr);
}

async function createTable(jsonURL) {
  try {
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("Failed to fetch JSON");

    const json = await response.json();
    console.log("Fetched JSON:", json);

    const dataArray = Array.isArray(json) ? json : json.data;
    if (!Array.isArray(dataArray)) throw new Error("Invalid JSON structure");

    const table = document.createElement("table");
    table.classList.add("countries-table");

    createTableHeader(table);

    dataArray.forEach((row, i) => {
      createTableRow(table, row, i + 1);
    });

    return table;
  } catch (err) {
    console.error("Error creating table:", err);
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Failed to load table data";
    return errorMsg;
  }
}

export default async function decorate(block) {
  const countriesLink = block.querySelector('a[href$=".json"]');
  if (!countriesLink) {
    console.warn("No JSON link found in block");
    return;
  }

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("countries-block");

  const table = await createTable(countriesLink.href);
  parentDiv.appendChild(table);

  countriesLink.replaceWith(parentDiv);
}


// async function createTableHeader(table) {
//   const thead = document.createElement("thead");
//   const tr = document.createElement("tr");

//   ["S.No", "Countries", "Continent", "Capital", "Abbreviation"].forEach(
//     (text) => {
//       const th = document.createElement("th");
//       th.textContent = text;
//       tr.appendChild(th);
//     }
//   );

//   thead.appendChild(tr);
//   table.appendChild(thead);
// }

// function createTableRow(table, row, i) {
//   const tr = document.createElement("tr");

//   const cells = [i, row.country, row.continent, row.capital, row.abbreviation];

//   cells.forEach((val) => {
//     const td = document.createElement("td");
//     td.textContent = val || ""; // handle undefined values
//     tr.appendChild(td);
//   });

//   table.appendChild(tr);
// }

// async function createTable(jsonURL) {
//   try {
//     const response = await fetch(jsonURL);
//     if (!response.ok) throw new Error("Failed to fetch JSON");
//     const json = await response.json();
//     console.log("=====JSON=====", json);

//     const table = document.createElement("table");
//     table.classList.add("countries-table");

//     await createTableHeader(table);

//     const dataArray = Array.isArray(json.data) ? json.data : json;
//     dataArray.forEach((row, i) => {
//       createTableRow(table, row, i + 1);
//     });

//     return table;
//   } catch (err) {
//     console.error("Error creating table:", err);
//     const errorMsg = document.createElement("div");
//     errorMsg.textContent = "Failed to load table data";
//     return errorMsg;
//   }
// }

// export default async function decorate(block) {
//   const countriesLink = block.querySelector('a[href$=".json"]');
//   if (!countriesLink) return;

//   const parentDiv = document.createElement("div");
//   parentDiv.classList.add("countries-block");

//   parentDiv.append(await createTable(countriesLink.href));

//   countriesLink.replaceWith(parentDiv);
// }

