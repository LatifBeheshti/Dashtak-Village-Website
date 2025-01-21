// Get the search bar input field and magnifier icon elements
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const searchResults = document.getElementById('search-results');

// Define the search data
const searchData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Smith' },
  { id: 4, name: 'Alice Johnson' },
  { id: 5, name: 'Mike Brown' },
];

// Add event listener to the search icon
searchIcon.addEventListener('click', () => {
  // Get the search query from the input field
  const searchQuery = searchInput.value.trim();

  // Filter the search data based on the search query
  const filteredData = searchData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Render the search results
  renderSearchResults(filteredData);
});

// Function to render the search results
function renderSearchResults(data) {
  // Clear the search results container
  searchResults.innerHTML = '';

  // Loop through the filtered data and render each item
  data.forEach((item) => {
    const searchResultItem = document.createElement('div');
    searchResultItem.classList.add('search-results-item');
    searchResultItem.textContent = item.name;
    searchResults.appendChild(searchResultItem);
  });

  // Show the search results container
  searchResults.style.display = 'block';
}

// Add event listener to the search input field
searchInput.addEventListener('input', () => {
  // Get the search query from the input field
  const searchQuery = searchInput.value.trim();

  // Filter the search data based on the search query
  const filteredData = searchData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Render the search results
  renderSearchResults(filteredData);
});
const data = {
  name: "گلزار خان",
  children: [
    {
      name: "لنگر خان",
      children: [
        {
          name: "فتح محمد خان",
          children: [
            {
              name: "عبدالروف خان",
              children: [
                { name: "عبدالرحیم روفی" },
                { name: "عبدالرحمن" },
                { name: "محمدسرور" },
                { name: "عبدالله روفی" },
                { name: "عبدالواحد روفی" },
                { name: "عبدالقدیر روفی" },
                { name: "عبدالاحد بهشتی" },
                { name: "سراج‌الحق لنگریان" },
              ],
            },
            {
              name: "محمد اکرم خان",
              children: [{ name: "محمد قاسم" }, { name: "محمد شریف اکرم‌ی" }],
            },
          ],
        },
      ],
    },
  ],
};

const width = 1000;
const height = 800;

const svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50,50)");

const tree = d3.tree().size([height - 100, width - 200]);
const root = d3.hierarchy(data);

const links = tree(root).links();
const nodes = root.descendants();

svg
  .selectAll(".link")
  .data(links)
  .enter()
  .append("path")
  .attr("class", "link")
  .attr(
    "d",
    d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x)
  );

const node = svg
  .selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", (d) => `translate(${d.y},${d.x})`);

node
  .append("rect")
  .attr("width", (d) => Math.max(80, d.data.name.length * 10))
  .attr("height", 40)
  .attr("rx", 8)
  .attr("ry", 8);

node
  .append("text")
  .attr("dy", 20)
  .attr("x", (d) => Math.max(80, d.data.name.length * 10) / 2)
  .style("text-anchor", "middle")
  .text((d) => d.data.name);
