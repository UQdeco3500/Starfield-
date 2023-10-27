window.addEventListener("load", () => {
  let sum_text = document.querySelector("#sum_text");
  let num1 = 0;
  let list_box = document.querySelectorAll(".r .img");
  list_box.forEach((item) => {
    let num = 0;
    item.querySelector("#sum_btn").addEventListener("click", () => {
      num++;
      item.querySelector("#num_box").innerText = num;
      num1++;
      sum_text.innerText = num1;
    });
    item.querySelector("#j_btn").addEventListener("click", () => {
      if (num == 0) {
        item.querySelector("#num_box").innerText = 0;
      } else {
        num--;
        item.querySelector("#num_box").innerText = num;
        num1--;
        sum_text.innerText = num1;
      }
    });
  });
});
