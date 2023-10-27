let input_name = document.querySelector('#name')
let input_age = document.querySelector('#age')
let md_name = document.querySelector('#md_name')
let md_age = document.querySelector('#md_age')
let form = document.querySelector('form')
let first_p = document.querySelector('.item_f')
let second_p = document.querySelector('.item_s')
let therd_p = document.querySelector('.item_th')
const bas_url = "http://localhost:9999"
let id
let modal_dialog = document.querySelector('.modal-dialog')
let modal_form = document.querySelector('.modal-dialog form')
let modal_close = document.querySelector('.modal-dialog form img')
let delte = document.querySelector('#del')
let wrap = document.querySelector('.wrap')




fetch(bas_url + "/toodos")
    .then((res) => res.json())
    .then((res) => reload(res, first_p))


form.onsubmit = (e) => {
    e.preventDefault()

    let person = {
        id: Math.random(),
        name: input_name.value,
        age: input_age.value
    }


    fetch(bas_url + "/toodos/", {
        method: "post",
        body: JSON.stringify(person),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 200 || res.status === 201) {

            fetch(bas_url + "/toodos")
                .then((res) => res.json())
                .then((res) => reload(res, first_p))
        }
    })

}



modal_form.onsubmit = (e) => {
    e.preventDefault()



    let person = {
        name: md_name.value,
        age: md_age.value
    }

    fetch(bas_url + "/toodos/" + id, {
        method: "PATCH",
        body: JSON.stringify(person),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 200 || res.status === 201) {
            fetch(bas_url + "/toodos/")
                .then((res) => res.json())
                .then((res) => reload(res, first_p))

            md_name.value = ""
            md_age.value = ""

            wrap.classList.remove('opocite_wrap')
            modal_dialog.classList.remove('show')
        }
    })
}



function reload(arr, place) {
    first_p.innerHTML = "";
    second_p.innerHTML = "";
    therd_p.innerHTML = "";

    for (let item of arr) {
        let div_f = document.createElement('div')
        let h2 = document.createElement('h2')
        let div_s = document.createElement('div')
        let p_f = document.createElement('p')
        let p_s = document.createElement('p')

        div_f.classList.add('divi')
        h2.innerHTML = item.name
        div_s.classList.add('a_d')
        p_f.innerHTML = "age"
        p_s.innerHTML = item.age


        if (item.age <= 25) {
            first_p.append(div_f)
            div_f.append(h2, div_s)
            div_s.append(p_f, p_s)
        } else if (item.age <= 50) {
            second_p.append(div_f)
            div_f.append(h2, div_s)
            div_s.append(p_f, p_s)
        } else if (item.age >= 50) {
            therd_p.append(div_f)
            div_f.append(h2, div_s)
            div_s.append(p_f, p_s)
        }


        div_f.ondblclick = () => {
            id = item.id
            modal_dialog.classList.add('show')
            console.log(id);
            md_name.value = item.name
            md_age.value = item.age
            wrap.classList.add('opocite_wrap')
        }

        delte.onclick = () => {
            fetch(bas_url + "/toodos/" + item.id, {
                method: "delete"
            }).then(res => {
                if (res.status === 200 || res.status === 201) {
                    div_f.remove()
                    modal_dialog.classList.remove("show")
                    wrap.classList.remove('opocite_wrap')

                }
            })
        }

    }
}

modal_close.onclick = () => {
    modal_dialog.classList.remove('show')
    wrap.classList.remove('opocite_wrap')

}
