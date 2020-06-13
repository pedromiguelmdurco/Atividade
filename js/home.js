// 
async function load(){
    //valida se está logado
    const session = localStorage.getItem('session');
    if(session === null){
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você tem que fazer o login para acessar essa página',
            showConfirmButton: false,
            timer: 2000
        });
        location.href = '../index.html';
    }
    // carrega categorias
    let categorias = JSON.parse(localStorage.getItem('categorias'));
    if(categorias == null){
        localStorage.setItem('categorias', JSON.stringify([]));
    }
    categorias = JSON.parse(localStorage.getItem('categorias'));
    categorias.forEach(categoria=>{
        document.getElementById('listaCategorias').innerHTML += `<li> <p> ${categoria.nome} <button onclick="handleApagaCategoria(${categoria.id})" class="btn red"><i class="fas fa-times"></i></button></p></li>`
    });
    //carrega dados no grafico
    const contas = JSON.parse(localStorage.getItem('contas'));
    let saldo = 0, entradas = 0, saidas = 0;
    contas.forEach(conta=>{
        saldo += conta.valor;
        if(conta.tipo == 'Entrada'){
            entradas++
        }else{
            saidas++
        }
    });
    console.log(saldo)
    document.querySelector('#saldo').innerHTML = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if(saldo >= 0 ){
        document.querySelector('#situacao').innerHTML = "Positiva";
    }else{
        document.querySelector('#situacao').innerHTML = "Negativa";
    }
    document.querySelector('#entradas').innerHTML = entradas;
    document.querySelector('#saidas').innerHTML = saidas;
}
async function handleCadastraCategorias(){
    try{
        //carrega as categorias
        let categorias = JSON.parse(localStorage.getItem('categorias'));
        if(categorias == null){
            localStorage.setItem('categorias', JSON.stringify([]));
        }
        categorias = JSON.parse(localStorage.getItem('categorias'));
        //--------
        //referencia o campo e valida
        const categoria = document.querySelector("#addCat").value;
        if(categoria == ""){
            throw new Error("preencha o campo categoria");
        }
        const data ={
            id: Date.now(),
            nome: categoria
        }
        categorias.push(data);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        await Swal.fire({
            icon: 'success',
            title: 'Salvo!',
            text: 'Categoria cadastrada com sucesso',
            showConfirmButton: false,
            timer: 2000
        });
        document.getElementById('listaCategorias').innerHTML = "";
        load();
        
    }catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Algo deu errado :(',
            text: `Erro: ${error.message}`
        });
    }
}
function handleApagaCategoria(id){
    const categorias = JSON.parse(localStorage.getItem('categorias'));
    let index = categorias.findIndex( categoria => categoria.id === id);
    categorias.splice(index, 1);
    Swal.fire({
        icon: 'success',
        title: 'Adeus!',
        text: 'Categoria apagada ;-;',
        showConfirmButton: false,
        timer: 1000
    });
    localStorage.setItem('categorias', JSON.stringify(categorias));
    document.getElementById('listaCategorias').innerHTML = "";
    load();
}