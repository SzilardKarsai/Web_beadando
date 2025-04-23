    // Web Storage példa
    function saveToStorage() {
        const input = document.getElementById("storageInput").value;
        localStorage.setItem("myText", input);
        document.getElementById("storageOutput").textContent = input;
    }
    
    window.addEventListener("load", () => {
        const saved = localStorage.getItem("myText");
        if (saved) document.getElementById("storageOutput").textContent = saved;
    
        // Canvas rajzolás
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(10, 10, 100, 50);
    });
  
    // Geolocation
    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;
            document.getElementById("locationOutput").textContent = coords;
        }, () => {
            document.getElementById("locationOutput").textContent = "Nem engedélyezett.";
        });
        } else {
        document.getElementById("locationOutput").textContent = "Nem támogatott.";
        }
    }
  
    // Drag & Drop
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
  
    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        ev.target.innerHTML = "";
        ev.target.appendChild(document.getElementById(data));
    }

  //Web Workers
  let worker;

    function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
        worker = new Worker("js/worker.js");
        worker.onmessage = function(event) {
            document.getElementById("workerOutput").textContent = "Eredmény: " + event.data;
        };
        }
        worker.postMessage("start");
    } else {
        document.getElementById("workerOutput").textContent = "A böngésződ nem támogatja a Web Worker-eket.";
    }
    }

    function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
        document.getElementById("workerOutput").textContent = "Számolás leállítva.";
    }
    }

    // Server-Sent Events (szimuláció setInterval-lal)
    function startFakeSSE() {
        const output = document.getElementById("sseOutput");
        let count = 0;
        setInterval(() => {
        count++;
        const msg = document.createElement("p");
        msg.textContent = `Új üzenet: ${new Date().toLocaleTimeString()} (${count})`;
        output.appendChild(msg);
        }, 2000);
    }