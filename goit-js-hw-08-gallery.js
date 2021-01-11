import defaultExport, * as gallery from "./gallery-items.js";



const galleryItems = gallery.default;
const mainNodeGallery = document.querySelector(".gallery");
const modalWindow = document.querySelector(".lightbox");
const btnModalWindow = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imgModalWindow = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const arrayLightboxImg = [];
let index;


function addItem(array, parent) {
  const createItem = array.map((objectGallery) => {
    arrayLightboxImg.push(objectGallery.original);
    return shapeNode(objectGallery);
  });
  parent.append(...createItem);
}

function shapeNode(objectGallery) {
  let addTagLi = document.createElement("li");
  addTagLi.classList.add("gallery__item");

  let addTagLink = document.createElement("a");
  addTagLink.classList.add("gallery__link");
  addTagLink.setAttribute("href", objectGallery.original);
  addTagLi.append(addTagLink);

  let addTagImg = document.createElement("img");
  addTagImg.classList.add("gallery__image");
  addTagImg.setAttribute("src", objectGallery.preview);
  addTagImg.setAttribute("data-source", objectGallery.original);
  addTagImg.setAttribute("alt", objectGallery.description);
  addTagLink.append(addTagImg);
  return addTagLi;
}
function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  imgModalWindow.setAttribute("src", event.target.dataset.source);
  modalWindow.classList.add("is-open");
  

  window.addEventListener("keydown", closeModalPressEsc);
  window.addEventListener("keydown", leafToRight);
  window.addEventListener("keydown", leafToLeft);
}
function closeModal(event) {
  modalWindow.classList.remove("is-open");
  imgModalWindow.setAttribute("src", "");
  window.removeEventListener("keydown", closeModalPressEsc);
  window.removeEventListener("keydown", leafToRight);
  window.removeEventListener("keydown", leafToLeft);
}
function closeModalPressEsc(event) {
  if (event.key === "Escape") {
    closeModal(event);
  }
}
function leafToRight(event) {
  if (event.key === "ArrowRight") {
    getIndex(arrayLightboxImg);
    let res =
      index !== arrayLightboxImg.length - 1
        ? imgModalWindow.setAttribute("src", arrayLightboxImg[index + 1])
        : imgModalWindow.setAttribute("src", arrayLightboxImg[0]);
    return res;
  }
}
function leafToLeft(event) {
  if (event.key === "ArrowLeft") {
    getIndex(arrayLightboxImg);
    let res =
      index !== 0
        ? imgModalWindow.setAttribute("src", arrayLightboxImg[index - 1])
        : imgModalWindow.setAttribute(
            "src",
            arrayLightboxImg[arrayLightboxImg.length - 1]
          );
    return res;
  }
}
function getIndex(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === imgModalWindow.getAttribute("src")) {
      index = i;
    }
  }
  return index;
}


mainNodeGallery.addEventListener("click", openModal);
btnModalWindow.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

addItem(galleryItems, mainNodeGallery);