document.addEventListener("DOMContentLoaded", function () {
        let model = document.querySelector("#drone");
        let sceneEl = document.querySelector("a-scene");

        let hammertime = new Hammer(sceneEl);
        //La fonction pour rétécir l'objet avec les deux doigts
        hammertime.get("pinch").set({ enable: true });

        hammertime.on("pinchin", function (ev) {
          let scale = model.getAttribute("scale");
          scale.x -= 0.01;
          scale.y -= 0.01;
          scale.z -= 0.01;
          if (scale.x < 0.1) scale.x = 0.1;
          if (scale.y < 0.1) scale.y = 0.1;
          if (scale.z < 0.1) scale.z = 0.1;
          model.setAttribute("scale", scale);
        });
        
        //fonction pour agrandir l'objet avec le mouvement de deux doigts
        hammertime.on("pinchout", function (ev) {
          let scale = model.getAttribute("scale");
          scale.x += 0.01;
          scale.y += 0.01;
          scale.z += 0.01;
          model.setAttribute("scale", scale);
        });

        /* sceneEl.addEventListener("tick", function () {
          let rotation = model.getAttribute("rotation");
          rotation.y += 0.5;
          model.setAttribute("rotation", rotation);
        }) */

        //fonctions de la video
        let marker = document.querySelector("#robot-marker");
        let video = document.querySelector("#video");
        let videoPlane = document.querySelector("#videoPlane");

        let showVideoButton = document.querySelector("#showVideoButton");

        marker.addEventListener("markerFound", function () {
          videoPlane.setAttribute("visible", "false");
          // Ne pas lire la vidéo automatiquement
          video.play();
        });

        showVideoButton.addEventListener("click", function () {
          videoPlane.setAttribute("visible", "true");
          video.play();
          let videoControls = document.createElement("div");
          videoControls.setAttribute("id", "video-controls");
          videoControls.innerHTML = `
    <button class="btn btn-dark btn-sm" id="playButton" type="button">Play</button>
    <button class="btn btn-dark btn-sm" id="pauseButton" type="button">Pause</button>
    <button class="btn btn-dark btn-sm" id="rewindButton" type="button">Reculer</button>
    <button class="btn btn-dark btn-sm" id="fastForwardButton" type="button">Avancer</button> 
    <button class="btn btn-dark btn-sm" id="hideVideoButton" type="button">Masquer la vidéo</button>
    <button class="btn btn-dark btn-sm" id="toggleMuteButton" type="button">Activer/Désactiver le son</button>`;
          
          document.body.appendChild(videoControls);

          let playButton = document.querySelector("#playButton");
          let pauseButton = document.querySelector("#pauseButton");
          let rewindButton = document.querySelector("#rewindButton");
          let fastForwardButton = document.querySelector("#fastForwardButton");
          
          let hideVideoButton = document.querySelector("#hideVideoButton");
          let toggleMuteButton = document.querySelector("#toggleMuteButton");

            toggleMuteButton.addEventListener("click", function () {
              video.muted = !video.muted;
            });

          playButton.addEventListener("click", function () {
            video.play();
          });

          pauseButton.addEventListener("click", function () {
            video.pause();
          });

          rewindButton.addEventListener("click", function () {
            video.currentTime -= 10;
          });

          fastForwardButton.addEventListener("click", function () {
            video.currentTime += 10;
          });
           hideVideoButton.addEventListener("click", function () {
            videoPlane.setAttribute("visible", "false");
          });
        });
  
         
          video.addEventListener("ended", function () {
          videoPlane.setAttribute("visible", "false");
        });
        
           function createObject(event) {
        // Get the marker element that triggered the event
        const marker = event.target;

        // Clone the object entity
        const object = marker.querySelector("a-entity").cloneNode(true);

        // Set the position and rotation of the new object based on the marker
        object.setAttribute("position", marker.object3D.position);
        object.setAttribute("rotation", marker.object3D.rotation);

        // Add the new object to the scene
        const scene = marker.closest("a-scene");
        scene.appendChild(object);
      }
      });