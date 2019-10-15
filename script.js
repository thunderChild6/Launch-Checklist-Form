window.addEventListener("load", function () {
   let launchForm = document.getElementById("launchForm");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");

   launchForm.addEventListener("submit", function (event) {
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required");
         event.preventDefault();
         } else if (pilotName.value.match(/[0-9]/) !== null) {
            alert("Enter valid Pilot name");
            event.preventDefault();
         } else if (copilotName.value.match(/[0-9]/) !== null) {
            alert("Enter valid Co-pilot name");
            event.preventDefault();
      } else if (isNaN(fuelLevel.value) === true) {
         alert("Enter valid number for Fuel Level");
         event.preventDefault();
      } else if (isNaN(cargoMass.value) === true) {
         alert("Enter valid number for Cargo Mass");
         event.preventDefault();
      } else {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready.`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} is ready.`;
         if (fuelLevel.value < 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch.";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = "Not enough fuel.";
            event.preventDefault();
         } else if (cargoMass.value > 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch.";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo is too heavy.";
            event.preventDefault();
         } else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch.";
            document.getElementById("launchStatus").style.color = "green";
            event.preventDefault();
         }
      }

   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let planetID = json[Math.floor(Math.random() * 6)];
         document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
      <ol>
         <li>Name: ${planetID.name}</li>
         <li>Diameter: ${planetID.diameter}</li>
         <li>Star: ${planetID.star}</li>
         <li>Distance from Earth: ${planetID.distance}</li>
         <li>Number of Moons: ${planetID.moons}</li>
      </ol>
      <img src="${planetID.image}"></img>
         `
      })
   });

});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
