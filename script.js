window.addEventListener("load", function () {
  let slideCount = document.querySelectorAll("#slider-wrapper ul li").length;

  //How wide is each slide?
  let slideWith = document.querySelector("#slider-wrapper").offsetWidth - 4; // I had to add (-4px) because a add border to the slider-wrapper container. Then the pictures got wrong position on the screen.
  //Total width of the slider
  let totalWidth = slideCount * slideWith + "px";
  //Slider DOM element
  let slider = document.querySelector("#slider-wrapper ul");
  //Next button
  let next = document.getElementById("next");
  //Previous button
  let previous = document.getElementById("prev");
  //Upper left corner of slider
  let leftPosition = 0;
  //To keep track of each slide
  let counter = 0;
  //Sets the width of the slidetr (which is also in the CSS)
  slider.style.width = totalWidth;
  //Control Buttons checked
  const checked = document.querySelectorAll("#picsCheck span");

  let doneResizing = undefined;
  //First call to auto skip:
  autoSkip();
  //First call to title moving down:
  tiltleMOvingDown(0);

  this.window.addEventListener("resize", function () {
    this.clearTimeout(doneResizing);
    doneResizing = this.setTimeout(function () {
      slideWith = document.querySelector("#slider-wrapper").offsetWidth - 4; // I had to add (-4px) because a add border to the slider-wrapper container. Then the pictures got wrong position on the screen.
      totalWidth = slideCount * slideWith + "px";
      slider = document.querySelector("#slider-wrapper ul");
      leftPosition = 0;
      counter = 0;
      slider.style.width = totalWidth;
    }, 001);
  });

  function resizing() {}
  //Slide title animation Down
  function tiltleMOvingDown(titleNum) {
    let allTitles = document.querySelectorAll("#slider-wrapper ul li div");
    allTitles.forEach((title) => {
      title.removeAttribute("class");
    });

    let title = document.getElementById(titleNum);
    title.classList.add("content");
  }

  //Stop slide when mouse is over
  slider.addEventListener("mouseover", function () {
    clearInterval(timer);
  });

  //Start slide when mouse is out
  slider.addEventListener("mouseout", function () {
    autoSkip();
  });

  //Run the slide automaticly
  function autoSkip() {
    timer = setInterval(() => {
      changeSlide();
    }, 3500);
  }

  //Remove class checked from all spans
  function removeClass() {
    checked.forEach((box) => {
      box.removeAttribute("class");
    });
  }

  //This change the slides when callled by set interval and when called by the span buttons
  //that's why I had to split the function into two parts.
  function changeSlide(buttonNumber) {
    removeClass();
    if (buttonNumber != undefined) {
      //buttonNumber will get a value only when the check buttons that are responsible to change the pictures be clicked.
      tiltleMOvingDown(buttonNumber);
      counter = buttonNumber;
      buttonNumber = undefined;
      checked[counter].classList.add("checked");
      changeSlidePartTwo();
    } else {
      counter++;
      changeSlidePartTwo();
    }

    function changeSlidePartTwo() {
      if (counter == slideCount) {
        counter = 0;
        leftPosition = 0;
        slider.style.left = leftPosition;
        tiltleMOvingDown(counter);
        checked[counter].classList.add("checked");
      } else {
        leftPosition = `-${counter * slideWith}px`;
        tiltleMOvingDown(counter);
        slider.style.left = leftPosition;
        checked[counter].classList.add("checked");
      }
    }
  }

  //Next Slide Click Handler

  next.addEventListener("click", function (event) {
    event.preventDefault();
    counter++;
    removeClass();

    if (counter == slideCount) {
      counter = 0;
      leftPosition = 0;
      slider.style.left = leftPosition;
      tiltleMOvingDown(counter);
      checked[counter].classList.add("checked");
    } else {
      leftPosition = `-${counter * slideWith}px`;
      slider.style.left = leftPosition;
      tiltleMOvingDown(counter);
      checked[counter].classList.add("checked");
    }
  });

  //The next button will stop set interval from changing the slides manually.
  next.addEventListener("mouseover", function () {
    clearInterval(timer);
    this.style.color = "orange";
  });
  //The next button will call autoSkip when mouse is out.
  next.addEventListener("mouseout", function () {
    autoSkip();
    this.style.color = "white";
  });

  //Previous Slide Click Handler
  previous.addEventListener("click", function (event) {
    event.preventDefault();
    removeClass();
    counter--;
    if (counter < 0) {
      counter = slideCount - 1;
      slider.style.left = `-${counter * slideWith}px`;
      tiltleMOvingDown(counter);
      checked[counter].classList.add("checked");
    } else {
      leftPosition = `-${counter * slideWith}px`;
      slider.style.left = leftPosition;
      tiltleMOvingDown(counter);
      checked[counter].classList.add("checked");
    }
  });

  //The previous button will stop set interval from changing the slides manually
  previous.addEventListener("mouseover", function () {
    clearInterval(timer);
    this.style.color = "orange";
  });
  //The previous button will call autoSkip when mouse is out
  previous.addEventListener("mouseout", function () {
    autoSkip();
    this.style.color = "white";
  });

  function forEveryButton(position) {
    clearInterval(timer); //Stop changing the pictures automaticly.
    changeSlide(position); //send the number of the button clicked to position the right picture on the screem.
    autoSkip(); //Restart the pictures changing automaticly after 3 and 1/2 seconds.
  }

  checked.forEach((box) => {
    box.addEventListener("click", function () {
      switch (box.getAttribute("value")) {
        case "0":
          slider.style.left = 0;
          forEveryButton(0);
          break;
        case "1":
          forEveryButton(1);
          break;
        case "2":
          forEveryButton(2);
          break;
        case "3":
          forEveryButton(3);
          break;
        case "4":
          forEveryButton(4);
          break;

        default:
          "Something went wrong with this box";
      }
    });
  });
});
