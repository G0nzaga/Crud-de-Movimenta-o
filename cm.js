const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTm = document.querySelector('#m-tm')
const sDi = document.querySelector('#m-di')
const sDf = document.querySelector('#m-df')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sTm.value = itens[index].tm
    sDi.value = itens[index].di
    sDf.value = itens[index].df
    id = index
  } else {
    sTm.value = ''
    sDi.value = ''
    sDf.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.tm}</td>
    <td>  ${item.di}</td>
    <td>${item.df}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>

  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sTm.value == '' || sDi.value == '' || sDf.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].tm = sTm.value
    itens[id].di = sDi.value
    itens[id].df = sDf.value
  } else {
    itens.push({'tm': sTm.value,
                'di': sDi.value,
                'df': sDf.value,
            })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


