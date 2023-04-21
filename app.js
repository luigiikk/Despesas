class Despesas {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor
    }

    validarDados() {
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')  
        return parseInt(proximoId) + 1 
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id )
    }
    recuperarTodosRegistros(){
        let despesas = Array()

        let id = localStorage.getItem('id')


        for(let i = 1; i <= id; i++ ){
            let despesa = JSON.parse(localStorage.getItem(i))
            if (despesa === null){
                continue    
            }

            despesa.id = i

            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){
       
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)
        console.log(despesa)

        // aplicação dos filtros:
        if(despesa.ano != ''){
           despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano) 
        }

        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes) 
         }

         if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia) 
         }

         if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo) 
         }

         if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao) 
         }

         if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor) 
         }
        

         return despesasFiltradas
        

        
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){

   let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value 

   let despesas = new Despesas(ano, mes, dia, tipo, descricao, valor)

   if(despesas.validarDados()){
    bd.gravar(despesas)

    document.getElementById('modal_titulo').innerHTML = 'Cadastro realizado'
    document.getElementById('modal_titulo_div').className = 'modal-header text-success'
    document.getElementById('modal_conteudo').innerHTML = 'Despesas foram cadastradas com sucesso'
    document.getElementById('modal_sair').className = 'btn btn-success'


    $('#modalRegistraDespesa').modal('show')

   }else {
    document.getElementById('modal_titulo').innerHTML = 'Cadastro não realizado'
    document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Despesas não cadastradas'
    document.getElementById('modal_sair').className = 'btn btn-danger'


    $('#modalRegistraDespesa').modal('show')
   }
}
function limparDespesas(){
    ano = document.getElementById('ano').value = ''
    mes = document.getElementById('mes').value = ''
    dia = document.getElementById('dia').value = ''
    tipo = document.getElementById('tipo').value = ''
    descricao = document.getElementById('descricao').value = ''
    valor = document.getElementById('valor').value = ''

}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value 
   
   let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

   let despesas = bd.pesquisar(despesa)

   bd.pesquisar(despesa)

   let listaDespesas = document.getElementById('listaDespesas')
   listaDespesas.innerHTML = ''

    // PERCORRER O ARRAY DESPESA
    despesas.forEach(function(d){


        // CRIAÇÃO DE UMA LINHA TR
        let linha = listaDespesas.insertRow()

        // CRIAÇAO DAS COLUNAS TD
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
        // switch de tipo
        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

   

}

function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    // PEGANDO O ELEMENTO TBODY  
    let listaDespesas = document.getElementById('listaDespesas')

    // PERCORRER O ARRAY DESPESA
    despesas.forEach(function(d){


        // CRIAÇÃO DE UMA LINHA TR
        let linha = listaDespesas.insertRow()

        // CRIAÇAO DAS COLUNAS TD
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
        // switch de tipo
        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // exclusão

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class = "fas fa-times" </i>'
        btn.id = d.id
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)

        console.log(d)

    })

}


