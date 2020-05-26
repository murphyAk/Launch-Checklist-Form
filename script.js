// Write your JavaScript code here!

window.addEventListener("load", function () {
  let form = document.querySelector("form");
  let userInput = [];
  let pilot = document.querySelector("input[name=pilotName]");
  let copilot = document.querySelector("input[name=copilotName]");
  let fuelLevel = document.querySelector("input[name=fuelLevel]");
  let cargoMass = document.querySelector("input[name=cargoMass]");
  let statusInfo = document.getElementById("faultyItems");
  let statusLaunch = this.document.getElementById("launchStatus");
  let statusPilot = this.document.getElementById("pilotStatus");
  let statusCopilot = this.document.getElementById("copilotStatus");
  let statusFuel = this.document.getElementById("fuelStatus");
  let statusCargo = this.document.getElementById("cargoStatus");
  let isFormComplete = false;

  let container = this.document.getElementById("missionTarget");
  let url = "https://handlers.education.launchcode.org/static/planets.json";

  fetch(url).then(function (response) {
    response.json().then(function (json) {
      let randomPlanet = json[Math.floor(Math.random() * json.length)];
      container.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
           <li>Name: ${randomPlanet.name}</li>
           <li>Diameter: ${randomPlanet.diameter}</li>
           <li>Star: ${randomPlanet.star}</li>
           <li>Distance from Earth: ${randomPlanet.distance}</li>
           <li>Number of Moons: ${randomPlanet.moons}</li>
        </ol>
        <img src="${randomPlanet.image}">
     `;
    });
  });
  form.addEventListener("submit", function (event) {
    userInput.push(pilot);
    userInput.push(copilot);
    userInput.push(fuelLevel);
    userInput.push(cargoMass);

    // validate entry
    for (let i = 0; i < userInput.length; i++) {
      if (!userInput[i].value) {
        alert("All fields are required!");
        statusLaunch.innerHTML = "Awaiting Information Before Launch";
        statusLaunch.style.color = "black";
        statusInfo.style.visibility = "hidden";
        isFormComplete = false;
        break;
      } else {
        isFormComplete = true;
      }
    }

    // validate data-type of entry
    if (
      isFormComplete &&
      (!stringValidator(pilot.value) ||
        !stringValidator(copilot.value) ||
        !numberValidator(fuelLevel.value) ||
        !numberValidator(cargoMass.value))
    ) {
      isFormComplete = false;
      alert("Make sure to enter valid information for each field");
    }

    // validate proper quantity
    if (isFormComplete && !isOver10K(fuelLevel.value)) {
      statusFuel.innerHTML = "Fuel level too low for launch";
    } else {
      statusFuel.innerHTML = "Fuel level high enough for launch";
    }

    if (isFormComplete && isOver10K(cargoMass.value)) {
      statusCargo.innerHTML = "Cargo mass too heavy for launch";
    } else {
      statusCargo.innerHTML = "Cargo mass low enough for launch";
    }

    // output design
    if (
      isFormComplete &&
      isOver10K(fuelLevel.value) &&
      !isOver10K(cargoMass.value)
    ) {
      statusInfo.style.visibility = "visible";
      statusLaunch.innerHTML = "Shuttle is Ready for Launch";
      statusPilot.innerHTML = `Pilot ${pilot.value} is ready for launch`;
      statusCopilot.innerHTML = `Co-pilot ${pilot.value} is ready for launch`;
      statusLaunch.style.color = "green";
    } else if (isFormComplete) {
      statusInfo.style.visibility = "visible";
      statusLaunch.innerHTML = "Shuttle Not Ready for Launch";
      statusPilot.innerHTML = `Pilot Standingby`;
      statusCopilot.innerHTML = `Co-pilot Standingby`;
      statusLaunch.style.color = "red";
    }

    // prevent reload
    event.preventDefault();
  });
});

function stringValidator(name) {
  if (isNaN(Number(name) && typeof name === "string")) {
    return true;
  } else {
    return false;
  }
}

function numberValidator(name) {
  if (!isNaN(Number(name))) {
    return true;
  } else {
    return false;
  }
}

function isOver10K(number) {
  if (number > 10000) {
    return true;
  } else {
    return false;
  }
}
