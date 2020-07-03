const inputFiles = document.getElementById("inputFiles");
const addFiles = document.getElementById("addFiles");
const filesItemWrapper = document.getElementById("filesItemWrapper");

// Массив files заполнен моковыми данными для примера, чтобы показать верстку
// В рабочем варианте массив files будет пустым
let files = [
  {
    file: {
      name: "Договор ЗН 1234-4567.pdf",
      size: 1244875,
    },
    fileItemId: Math.random().toString(),
  },

  {
    file: {
      name: "Фотографии счета на оплату чего-то.pdf",
      size: 204235,
    },
    fileItemId: Math.random().toString(),
  },
  {
    file: {
      name: "Документы за декабрь.zip",
      size: 201458,
    },
    fileItemId: Math.random().toString(),
  },
];

const returnFileSize = (number) => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number > 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "КБ";
  } else if (number > 1048576) {
    return (number / 1048576).toFixed(1) + "МБ";
  }
};

const renderFileItem = ({ file, fileItemId }) => {
  const { name } = file;
  const index = name.lastIndexOf(".");
  let ext = "";
  if (index > -1) {
    ext = name.slice(index + 1).toUpperCase();
  }
  const fileItem = document.createElement("div");
  fileItem.className = "file__item";
  fileItem.dataset.fileItemId = fileItemId;
  if (ext === "PDF") {
    fileItem.innerHTML = `<svg
      width="25"
      height="28"
      viewBox="0 0 25 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="file__icon"
    >
      <rect
        x="0.5"
        y="0.5"
        width="24"
        height="27"
        rx="1.5"
        fill="white"
        stroke="#58A742"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line x1="5" y1="19.8636" x2="15" y2="19.8636" stroke="#58A742" />
      <line x1="5" y1="9.68182" x2="20" y2="9.68182" stroke="#58A742" />
      <line x1="5" y1="14.7727" x2="20" y2="14.7727" stroke="#58A742" />
      <line
        y1="-0.5"
        x2="10.7035"
        y2="-0.5"
        transform="matrix(0.700708 -0.713448 0.700708 0.713448 17.5 28)"
        stroke="#58A742"
      />
    </svg>
    <button type="button" class="file__delete">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="9.89948"
          y1="4.24264"
          x2="4.24262"
          y2="9.8995"
          stroke="#E55740"
          stroke-width="2"
          stroke-linecap="round"
        />
        <line
          x1="9.89945"
          y1="9.89948"
          x2="4.24259"
          y2="4.24262"
          stroke="#E55740"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  `;
  } else {
    fileItem.innerHTML = `<svg
        width="25"
        height="28"
        viewBox="0 0 25 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="file__icon"
      >
        <rect
          x="0.5"
          y="0.5"
          width="24"
          height="27"
          rx="1.5"
          fill="white"
          stroke="#98C88C"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <button type="button" class="file__delete">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="9.89948"
            y1="4.24264"
            x2="4.24262"
            y2="9.8995"
            stroke="#E55740"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="9.89945"
            y1="9.89948"
            x2="4.24259"
            y2="4.24262"
            stroke="#E55740"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    `;
  }

  const fileText = document.createElement("div");
  fileText.className = "file__text";

  const fileName = document.createElement("p");
  fileName.className = "file__name";
  fileName.textContent = `${file.name}`;
  fileText.append(fileName);

  const fileDescription = document.createElement("p");
  fileDescription.className = "file__description";
  fileDescription.textContent = `Файл ${ext}, ${returnFileSize(file.size)}`;
  fileText.append(fileDescription);

  fileItem.firstElementChild.after(fileText);
  return fileItem;
};

const renderFiles = (files) => {
  const items = [];
  for (let i = 0; i < files.length; i++) {
    items.push(renderFileItem(files[i]));
  }
  filesItemWrapper.innerHTML = "";
  filesItemWrapper.append(...items);
};

addFiles.addEventListener("click", (event) => {
  inputFiles.click();
});

inputFiles.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    files.push({ file, fileItemId: Math.random().toString() });
    renderFiles(files);
  }
});

filesItemWrapper.addEventListener("click", (event) => {
  if (event.target.closest(".file__delete")) {
    const fileItem = event.target.closest(".file__item");
    const fileItemId = fileItem.dataset.fileItemId;
    fileItem.remove();
    files = files.filter((file) => file.fileItemId !== fileItemId);
    renderFiles(files);
  }
});

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", (e) => {
  document.querySelector(".card").style.display = "block";
});

document
  .querySelector(".card__buttton_cancel")
  .addEventListener("click", (e) => {
    document.querySelector(".card").style.display = "";
  });

// Данное событие добавлено, чтобы показать верстку списка файлов
// В рабочем варинте этого события не будет
document.addEventListener("DOMContentLoaded", () => {
  renderFiles(files);
});
