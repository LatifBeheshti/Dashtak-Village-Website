'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(searchTogglers, "click", toggleSearchBar);

// Pedigree Data
const data = {
  name: "Langar Khan",
  children: [
    {
      name: "Fateh Mohammad Khan",
      children: [
        {
          name: "Abdul Raouf Khan",
          children: [
            { name: "Abdul Rahim Raoufi" },
            { name: "Abdul Rahman" },
            { name: "Mohammad Sarwar" }
          ]
        },
        { name: "Mohammad Akram Khan", children: [{ name: "Mohammad Qasim" }] }
      ]
    }
  ]
};

// Dimensions
const width = 800;
const height = 600;

// Create an SVG container
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#fff");

// Create a tree layout
const root = d3.hierarchy(data);
const treeLayout = d3.tree().size([height - 20, width - 40]);
treeLayout(root);

// Draw links
svg
  .selectAll("line")
  .data(root.links())
  .enter()
  .append("line")
  .attr("x1", d => d.source.y + 20)
  .attr("y1", d => d.source.x)
  .attr("x2", d => d.target.y + 20)
  .attr("y2", d => d.target.x)
  .attr("stroke", "#555")
  .attr("stroke-width", 1.5);

// Draw nodes
svg
  .selectAll("circle")
  .data(root.descendants())
  .enter()
  .append("circle")
  .attr("cx", d => d.y + 20)
  .attr("cy", d => d.x)
  .attr("r", 5)
  .attr("fill", "blue");

// Add labels
svg
  .selectAll("text")
  .data(root.descendants())
  .enter()
  .append("text")
  .attr("x", d => d.y + 25)
  .attr("y", d => d.x + 3)
  .text(d => d.data.name)
  .attr("font-size", "12px")
  .attr("fill", "#333");
