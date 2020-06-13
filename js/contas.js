async function load(){
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
    const categorias = JSON.parse(localStorage.getItem('categorias'));
    categorias.forEach(cat=>{
        const categoria = document.querySelector("#categoria");
        const elemento = document.createElement('option');
        const texto = document.createTextNode(cat.nome);
        elemento.value = cat.nome;
        elemento.appendChild(texto);
        categoria.appendChild(elemento);
        M.AutoInit();
    });
}
async function handleSalvar(){
    try{
        let contas = JSON.parse(localStorage.getItem('contas'));
        if (contas == null){
            localStorage.setItem('contas', JSON.stringify([]));
        }
        contas = JSON.parse(localStorage.getItem('contas'));
        const categorias = JSON.parse(localStorage.getItem('categorias'));
        if(categorias == null){
            throw new Error("Você deve cadastrar uma categora antes de criar a conta na aba categoria -> home");
        }
        const nome = document.querySelector("#nome");
        const valor = document.querySelector("#valor");
        const tipo = document.querySelector("#tipo");
        const categoria = document.querySelector("#categoria");
        const validar = [nome,valor,tipo,categoria];
        validar.forEach(campo=>{
            if(campo.value == ""){
                throw new Error(`o campo ${campo.id} precisa ser preenchido`);
            }
        });
        let data ={
            id: Date.now(),
            nome: nome.value,
            valor: (tipo.value == 'Entrada')?Number(valor.value):0 - Number(valor.value),
            tipo: tipo.value,
            categoria: categoria.value,
            status: "Ativo"
        }
        contas.push(data);
        localStorage.setItem('contas', JSON.stringify(contas));
        await Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: `Conta cadastrada com sucesso`,
            showConfirmButton: false,
            timer: 1000
        });
    }catch(error){
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `erro: ${error.message}`
        });
    }
}