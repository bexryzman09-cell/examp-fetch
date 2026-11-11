const form = document.querySelector(".form")
const name = document.querySelector(".name")
const year = document.querySelector(".year")
const price = document.querySelector(".price")
const cpu = document.querySelector(".cpu")
const disk = document.querySelector(".disk")
const list = document.querySelector(".list")
const titleBox = document.querySelector(".title-box")

const modal = document.querySelector(".modal")
const editForm = document.querySelector(".modal-form")
const editName = document.querySelector(".edit-name")
const editYear = document.querySelector(".edit-year")
const editPrice = document.querySelector(".edit-price")
const editCpu = document.querySelector(".edit-cpu")
const editDisk = document.querySelector(".edit-disk")
const cancelBtn = document.querySelector(".cancel-btn")

let editId = null



const API_KEY = "8da5deb2-2473-44cf-b6c7-cc25dbc0329f"
const URL_BASE = "https://api.restful-api.dev/"





form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (year.value.trim() && name.value.trim() && price.value.trim() && cpu.value.trim() && disk.value.trim()) {
        const newData = {
            name: name.value,
            data: {
                year: year.value,
                price: price.value,
                cpu: cpu.value,
                disk: disk.value,
            }

        }
        collectionAdd(newData)

    }
    else {
        alert("Заполните все поля")
    }
})
editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (editName.value.trim() && editYear.value.trim() && editPrice.value.trim() && editCpu.value.trim() && editDisk.value.trim()) {
        editBtnFunc(editId, {
            name: editName.value,
            data: {
                year: editYear.value,
                price: editPrice.value,
                cpu: editCpu.value,
                disk: editDisk.value,
            }
        })
        modal.classList.remove("open")
    }
    else {
        alert("Заполните все поля")
    }
})

cancelBtn.addEventListener("click", () => {
    modal.classList.remove("open")
})


async function collectionAdd(data) {
    try {
        const response = await fetch(URL_BASE + "collections/products/objects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        form.reset()
        collectionsGet()
        alert("Задача успешно создана!");
    }
    catch (error) {
        console.error("ОШИБКА:", error);
        alert(error.message);
    }
}



async function collectionsGet(data) {
    try {
        const response = await fetch(URL_BASE + "collections/products/objects", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "x-api-key": API_KEY,
            },

        });
        const result = await response.json();
        renderCollection(result)
    }
    catch (error) {
        console.error("ОШИБКА:", error);
        alert(error.message);
    }
}


function renderCollection(data) {
    list.innerHTML = ""
    data?.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("product-card")

        const p = document.createElement("p");
        p.classList.add("product-name")
        p.textContent = item.name;

        const price = document.createElement("p");
        price.classList.add("product-price")
        price.textContent = item.data?.price;

        const year = document.createElement("p");
        year.classList.add("product-year")
        year.textContent = item.data?.year;

        const cpu = document.createElement("p");
        cpu.classList.add("product-cpu")
        cpu.textContent = item.data.cpu || item.data["CPU model"];

        const disk = document.createElement("p");
        disk.classList.add("product-disk")
        disk.textContent = item.data.disk || item.data["Hard disk size"];

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-btn")
        deleteBtn.textContent = "delete"

        const editBtn = document.createElement("button")
        editBtn.classList.add("edit-btn")
        editBtn.textContent = "edit"

        li.append(p, price, year, cpu, disk, deleteBtn, editBtn);
        list.append(li);

        deleteBtn.addEventListener("click", () => {
            deleteBtnFunc(item.id)
        })

        editBtn.addEventListener("click", () => {
            editId = item.id
            editName.value = item.name
            editYear.value = item.data.year
            editPrice.value = item.data.price
            editCpu.value = item.data.cpu || item.data["CPU model"]
            editDisk.value = item.data.disk || item.data["Hard disk size"]
            modal.classList.add("open")
        })
    });
}

async function deleteBtnFunc(id) {
    try {
        const response = await fetch(URL_BASE + "collections/products/objects/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "x-api-key": API_KEY,
            },
        });
        const result = await response.json();
        collectionsGet()
        return result
    }
    catch (error) {
        alert("Ошибка: " + error.message)
        console.error(error);
    }
}

async function editBtnFunc(id, data) {
    try {
        const response = await fetch(URL_BASE + "collections/products/objects/" + id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)

        });
        const result = await response.json();
        collectionsGet()
        return result
    }
    catch (error) {
        alert("Ошибка: " + error.message)
        console.error(error);
    }
}



collectionsGet()



