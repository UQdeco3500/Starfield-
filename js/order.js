window.addEventListener("load", () => {
  // Get the image box to be dragged
  const imageItems = document.querySelectorAll(".image-item");
  // Get the box that needs to hold the image box
  const targetBox = document.querySelector(".target-box");
  // Getting the progress bar
  const progress = document.querySelector(".bar");
  // Get Emoji Image
  const emoji = document.querySelector("#pro_ico");
  // Get Price
  const proice = document.querySelector("#price");
  // Get progress bar number
  const bars = document.querySelector("#bars");
  // Total ML
  var zjml = 0;
  // Total amount
  var zjprice = 0;

  // Listening for mouse presses
  imageItems.forEach((item) => {
    item.addEventListener("mousedown", (event) => {
      event.preventDefault();

      const clonedItem = item.cloneNode(true);
      clonedItem.classList.add("dragging");

      const shiftX = event.clientX - item.getBoundingClientRect().left;
      const shiftY = event.clientY - item.getBoundingClientRect().top;
      clonedItem.style.left = `${event.clientX - shiftX}px`;
      clonedItem.style.top = `${event.clientY - shiftY}px`;

      document.body.appendChild(clonedItem);

      function onMouseMove(event) {
        clonedItem.style.left = `${event.clientX - shiftX}px`;
        clonedItem.style.top = `${event.clientY - shiftY}px`;
      }

      function onMouseUp(event) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        const rect = targetBox.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          const newItem = item.cloneNode(true);
          // Add operation
          // Acquisition amount
          const price = newItem.querySelector(".lab1");
          const Newprice = Number(price.innerText.substring(1));
          zjprice += Newprice;
          proice.innerText = `$${zjprice}`;

          // Processing ml
          const foodml = newItem.querySelector(".lab2");
          const Newfoodml = Number(foodml.innerText);
          zjml += Newfoodml;
          progress.style.width = zjml + "%";
          bars.innerText = zjml;
          barcolor(zjml);

          // Shutdown operation
          targetBox.appendChild(newItem);
          const applab = `<div class="lab">
              <img src="./image/x.png" alt="" />
            </div>`;
          newItem.insertAdjacentHTML("beforeend", applab);
          const close_btn = newItem.querySelectorAll(".lab");
          close_btn.forEach((item, index) => {
            item.addEventListener("click", function () {
              this.parentNode.remove();
              // Get the price of deletion
              const newla1 = this.parentNode
                .querySelector(".lab1")
                .innerText.substring(1);
              zjprice -= newla1;
              proice.innerText = `$${zjprice}`;
              // Get deleted ml
              const newla2 = parseFloat(
                this.parentNode.querySelector(".lab2").innerText
              ); // Converting strings to numbers
              zjml -= newla2;
              progress.style.width = zjml + "%";
              bars.innerText = zjml;
              barcolor(zjml);
            });
          });

          // Get the .lab1 and .lab2 elements in the newItem.
          const lab1 = newItem.querySelector(".lab1");
          const lab2 = newItem.querySelector(".lab2");
          if (lab1 && lab2) {
            lab1.style.display = "none";
            lab2.style.display = "none";
          }
        }

        clonedItem.parentNode.removeChild(clonedItem);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
  function barcolor(num) {
    // if (num <= 33) {
    //   progress.style.barcolor
    // }
    if (num > 60) {
      progress.style.backgroundColor = "red";
      bars.style.color = "red";
      emoji.src = "./image/ku.png";
    } else if (num > 33) {
      progress.style.backgroundColor = "yellow";
      emoji.src = "./image/pin.png";
      bars.style.color = "yellow";
    } else {
      progress.style.backgroundColor = "";
      emoji.src = "./image/2-3.png";
      bars.style.color = "";
    }
  }

  // Listen for events when the dragged element leaves the target-box.
  targetBox.addEventListener("mouseleave", (event) => {
    const draggingItem = targetBox.querySelector(".dragging");
    if (draggingItem) {
      targetBox.removeChild(draggingItem);
    }
  });
});
