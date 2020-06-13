function validar(){
    const campos = document.querySelectorAll('.validate');

    campos.forEach(
        
        campo => {
            if(campo.value === ""){
                
                throw new Error(`o campo ${campo.id} está vazio`);
            }
        }
    );
}
async function logar(){
    debugger
    try{
        
        //se não tiver usuários cadastrado no localstorage, ele cadastra
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if(usuarios == null){
            localStorage.setItem('usuarios', JSON.stringify([]))
            usuarios = JSON.parse(localStorage.getItem('usuarios'));
        }
        validar();
        const log = document.querySelector('#nome').value;
        const senha = document.querySelector('#pass').value;
        let index = usuarios.findIndex(user=> user.nome === log || user.email === log);
        if(index !== -1){
            const session = usuarios[index];
            if(session.senha === senha){
                if(session.status == 'ativo'){
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Seja bem vindo(a) ${session.nome}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.setItem('session', session.ID);
                    location.href = './adm-dasboard/index.html';
                }else{
                    throw new Error("Você não possui permissão para entrar");
                }
            }else{
                throw new Error("A senha está errada");
            }
        }else{
            throw new Error("O usuário ou email digitado não foi cadastrado");
        }
    }catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `erro: ${error.message}`
          });
    }
}