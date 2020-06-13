function validar(){
    
    //pega todos campos pela classe
    const campos = document.querySelectorAll('.validate');
    const cep = document.querySelector('#CEP').value;
    //faz um for each
    campos.forEach(
        //se algum campo estiver vazio ou se o email inserido estiver em formato invãlido lança um erro
        campo => {
            if(campo.value === ""){
                
                throw new Error(`o campo ${campo.id} está vazio`);
            }
            if(campo.id === "email" && campo.classList[1] == "invalid"){
                
                throw new Error(`o email inserido é inválido`);
            }
        }
        
    );
    if(cep.length != 8){
        throw new Error("O cep deve ter exatamente 8 números");
    }
    return fetch(`https://viacep.com.br/ws/${cep}/json/`).then( 
        response =>{
            return response.json();

        }).then(data=>{
            if(data.erro){
                throw new Error("o cep informado não existe");
            }else{
                return data;
            }
        }).then().catch(erro =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `erro: ${erro.message}`
            })
        });
    
}
async function cadastrar(){
    try {
        //se não tiver usuários cadastrado no localstorage, ele cadastra
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if(usuarios == null){
            localStorage.setItem('usuarios', JSON.stringify([]))
            usuarios = JSON.parse(localStorage.getItem('usuarios'));
        }
        const api = validar();
        
        // pega os dados da página e do localstorage
        
        const nome = document.querySelector('#nome').value;
        const telefone = document.querySelector('#telefone').value;
        const email = document.querySelector('#email').value;
        const CEP = document.querySelector('#CEP').value;
        const senha = document.querySelector('#pass').value;
        // passa os dados para um objeto dados
        api.then(async resposta => {
            dados = 
            {
                ID: Date.now(),
                nome,
                telefone,
                email,
                CEP,
                endereco: `${resposta.bairro}, ${resposta.logradouro}`,
                senha,
                status : 'ativo'
            }
            //procura se tem algum usuário já cadastrado com esse email
            let index = usuarios.findIndex(user => user.email == dados.email);
            if(index === -1){
                //procura se tem algum usuario ja cadastrado com esse nome
                index = usuarios.findIndex(user => user.nome == dados.nome);
                if(index === -1){
                    //se não tiver passa os dados para o array usuarios
                    usuarios.push(dados);
                    //seta no local storage
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    await Swal.fire({
                        icon: 'success',
                        title: 'Você foi cadastrado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //chama o sweeta alert e redireciona
                    location.href="./index.html";
                }else{
                    //se já tiver com o nome cadastrado lança um erro
                    throw new Error("Esse nome já está cadastrado");
                }
            }else{
                // se já tiver com o email cadastrado lança uma erro
                throw new Error("Esse email já está cadastrado");
            }
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `erro: ${error.message}`
        })
    }
    
    
}
    